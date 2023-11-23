<script>
  import { read, utils, writeFileXLSX } from 'xlsx'

  let importedSheet = null
  let exportedCSV = null
  let importedColumnNames = null
  let json = null
  let exportedJson = []
  let data = {
    importFileName: '',
    importInput: '',
    importList: [
      'Referencia',
      'Descripción',
      'Cantidad',
      'Precio',
      '% Dto.1',
      '% Iva'
    ],
    exportInput: '',
    exportList: [
      'Referencia',
      'Descripcion',
      'Cantidad',
      'Precio',
      'Descuento',
      'IVA'
    ]
  }

  async function handleSpreadsheetFile(event) {
    let file = await event.target.files[0]
    let importData = null
    let importSheet = null
    data.importFileName = ''
    importedColumnNames = null

    if (
      file.type !== 'application/vnd.ms-excel' &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      alert('Select a spreadsheet file')
      console.log(file.type)
      importedSheet = null
      event.target.value = ''
      return
    }
    data.importFileName = file.name
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    //When file is ready
    reader.onload = () => {
      importData = reader.result
      importSheet = read(importData)
      importedSheet = importSheet.Sheets[importSheet.SheetNames[0]]

      //Get column names so I can select them TODO
      importedColumnNames = utils.sheet_to_json(importedSheet, {
        header: 1
      })[0]

      //Make a json to manipulate the data.
      json = utils.sheet_to_json(importedSheet)
      console.log({ json })

      //Map the properties to export list
      exportedJson = json.map((item) => {
        const newItem = {}
        data.importList.forEach((importProp, index) => {
          const exportProp = data.exportList[index]
          if (item[importProp] !== undefined) {
            newItem[exportProp] = item[importProp]
          }
        })
        return newItem
      })
      console.log({ exportedJson })
    }
  }

  function spreadsheetConversion() {
    if (!importedSheet) {
      alert('There is no file or the file is empty')
      return
    }
    if (data['importList'].length !== data['exportList'].length) {
      alert('import and export columns are not the same length')
      return
    }

    const headers = Object.keys(exportedJson[0])
    exportedCSV = [
      headers.join(';'), // Use ';' as the separator for the headers
      ...exportedJson.map((obj) =>
        headers.map((header) => obj[header]).join(';')
      )
    ].join('\n')
    const blob = new Blob([exportedCSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${data.importFileName}.csv` // Set the file name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function addToList(list, input) {
    data[list] = [...data[list], data[input]]
    data[input] = ''
  }
  function removeFromList(list, index) {
    data[list].splice(index, 1)
    data = data
  }
</script>

<!-- Select File -->
<input
  type="file"
  id="filePicker"
  accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  on:change={handleSpreadsheetFile}
/>
<form on:submit|preventDefault={() => spreadsheetConversion()}>
  <button disabled={importedSheet !== null ? false : true} type="submit"
    >Export</button
  >
</form>

<!-- List of cloumn Names  -->
{#if importedColumnNames}
  <pre>{importedColumnNames}</pre>
{/if}
{#if exportedCSV}
  {exportedCSV}
{/if}

<!-- Input Forms -->
{#each [['importList', 'importInput', 'import'], ['exportList', 'exportInput', 'export']] as list, index}
  <form
    on:submit|preventDefault={() =>
      data[list[1]] ? addToList(list[0], list[1]) : ''}
  >
    <label for={`input${index}`}>Columns to {list[2]}</label>
    <input
      id={`input${index}`}
      bind:value={data[list[1]]}
      type="text"
      placeholder="Column name"
    />
    <button type="submit">Add</button>
  </form>
{/each}

<!-- List Views  -->
<div class="lists">
  {#each ['importList', 'exportList'] as list}
    <div class="list">
      {#each data[list] as item, index}
        <div class="description">{item}</div>
        <button class="button" on:click={() => removeFromList(list, index)}
          >❌</button
        >
      {/each}
    </div>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    border: 1px dotted #ffffff;
  }
  .button {
    background-color: #454545;
    align-self: center;
    justify-self: right;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>
