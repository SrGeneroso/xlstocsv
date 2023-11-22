import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless:"new"});
  const page = await browser.newPage();

  await page.emulateMediaFeatures([{
    name: 'prefers-color-scheme', value: 'dark' }]);

  await page.goto('http://localhost:5173');

  await page.setViewport({ width: 1920, height: 1080 });
  await page.screenshot({ path: 'public/screenshot1.png' });

  await page.setViewport({ width: 1080, height: 1920 });
  await page.screenshot({ path: 'public/screenshot2.png' });
  
  await browser.close();
})();