import puppeteer from 'puppeteer'
import { spawn } from 'child_process'

let viteProcess

// Function to start Vite server ** from: https://stackoverflow.com/questions/28070796/node-js-killing-sub-processes-of-childprocessspawn
function startViteServer() {
	viteProcess = spawn('npm', ['run', 'dev'], { stdio: ['ignore', 'pipe', 'pipe'], detached: true })
	viteProcess.stdout.pipe(process.stdout)
	viteProcess.stderr.pipe(process.stderr)
	viteProcess.stdout.on('data', data => {
		const output = data.toString()
		const vitedev = output.match(/Local:\s+http:\/\/localhost:(\d+)(\/.*)?/)
		vitedev && runPuppeteerScript(vitedev[1], vitedev[2] || '/')
	})
	viteProcess.on('exit', () => process.exit(0))
}

async function runPuppeteerScript(port, pathToHome) {
	const colorScheme = !process.argv.length < 3 && process.argv[2] === 'light' ? 'light' : 'dark'
	const outputPath = !process.argv.length < 4 ? process.argv[3] : ''
	const browser = await puppeteer.launch({ headless: 'new' })
	const page = await browser.newPage()

	await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: colorScheme }])
	await page.goto(`http://localhost:${port}${pathToHome}`)
	await page.setViewport({ width: 1920, height: 1080 })
	await page.screenshot({ path: `.${pathToHome}${outputPath}screenshot1.png` })
	await page.setViewport({ width: 1080, height: 1920 })
	await page.screenshot({ path: `.${pathToHome}${outputPath}screenshot2.png` })
	await browser.close()

	console.log('\n-- Screenshots Ready --\n')
	viteProcess && process.kill(-viteProcess.pid)
}

startViteServer()
