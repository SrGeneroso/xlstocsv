<script>
  import {
    exportedJson,
    data,
    handleSpreadsheetFile,
    spreadsheetConversion
  } from './lib/Conversion'

  function addToList(list, input) {
    data[list] = [...data[list], data[input]]
    data[input] = ''
  }
  function removeFromList(list, index) {
    data[list].splice(index, 1)
    data[list] = data[list]
  }
</script>

<!-- Select File -->
<input
  type="file"
  id="filePicker"
  accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  on:change={handleSpreadsheetFile}
  on:mouseenter={() => console.log(exportedJson === null)}
/>
<form on:submit|preventDefault={() => spreadsheetConversion()}>
  <button type="submit">Export</button>
</form>

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
