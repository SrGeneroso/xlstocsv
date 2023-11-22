<script>
  import { read, utils, writeFileXLSX } from 'xlsx'

  let importedSheet = null
  let exportedCSV = null
  let importedColumnNames = null
  let data = {
    importInput: '',
    importList: [],
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

    if (
      file.type === 'application/vnd.ms-excel' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        importData = reader.result
        importSheet = read(importData)
        importedSheet = importSheet.Sheets[importSheet.SheetNames[0]]
        console.log(importedSheet)
        importedColumnNames = utils.sheet_to_json(importedSheet, {
          header: 1
        })[0]
        console.log(importedColumnNames)
      }
    } else {
      alert('Select a spreadsheet file')
      importedSheet = null
      event.target.value = ''
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

    exportedCSV = utils.sheet_to_csv(importedSheet)
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
  {importedColumnNames}
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
