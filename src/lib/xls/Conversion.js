import { read, utils } from 'xlsx'

export async function readXlsHeaders(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			const importData = reader.result
			const importSheet = read(importData)
			const importedSheet = importSheet.Sheets[importSheet.SheetNames[0]]
			const importedColumnNames = utils.sheet_to_json(importedSheet, {
				header: 1
			})[0]
			const importedDataExample = utils.sheet_to_json(importedSheet, {
				header: 1
			})[1]
			resolve({ importedColumnNames, importedDataExample })
		}
		reader.onerror = error => {
			reject(error)
		}
		reader.readAsArrayBuffer(file)
	})
}

export async function handleSpreadsheetFile(userFile, format) {
	const file = userFile[0]
	const data = JSON.parse(format)
	const reader = new FileReader()

	reader.readAsArrayBuffer(file)

	//When file is ready
	reader.onload = () => {
		const workbook = read(reader.result)
		const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

		//Map the properties to export list
		const exportedJson = json.map(item => {
			let newItem = {}
			Object.keys(data).forEach((key, index) => {
				const exportProp = data[key]
				if (item[key] !== undefined) {
					newItem[exportProp] = item[key]
				}
			})
			return newItem
		})
		//Get keys of the format
		const headers = Object.keys(exportedJson[0])
		//Create the CSV Structure
		const exportedCSV = [
			headers.join(';'), // Use ';' as the separator for the headers
			...exportedJson.map(obj => headers.map(header => obj[header]).join(';'))
		].join('\n')
		const blob = new Blob([exportedCSV], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)

		//Set a link, autoclik it and then remove it.
		const a = document.createElement('a')
		a.href = url
		a.download = `gdt-${file.name}.csv` // Set the file name
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}
}
