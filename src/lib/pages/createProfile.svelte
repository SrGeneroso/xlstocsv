<script>
	import { readXlsHeaders } from '../xls/Conversion'
	import Droplet from '../ui//droplet.svelte'
	import Dnd from '../ui/dnd.svelte'
	import DndLimit from '../ui/dnd-limit.svelte'
	import ExampleTable from '../ui/exampleTable.svelte'
	import DndDelete from '../ui/dnd-delete.svelte'

	let xlsColumnNames
	let columnNamesSelected = []
	let columnsNamesToExport = [
		{ id: 'Referencia', name: 'Referencia' },
		{ id: 'Descripcion', name: 'Descripcion' },
		{ id: 'Cantidad', name: 'Cantidad' },
		{ id: 'Precio', name: 'Precio' },
		{ id: 'Descuento', name: 'Descuento' },
		{ id: 'IVA', name: 'IVA' }
	]
	let columnsToDelete = []
	let columnNameToAdd = ''
	let profileName = ''
	let profileURL = ''

	function addToColumnNames() {
		if (!columnNameToAdd) return
		columnsNamesToExport = [...columnsNamesToExport, { id: `import-${columnNameToAdd}-${Date.now()}`, name: columnNameToAdd }]
		columnNameToAdd = ''
	}

	async function getHeaders(file) {
		let headers = await readXlsHeaders(file[0])
		return headers.importedColumnNames.map((name, index) => ({
			id: `${index}-import-${name}` + 1,
			name,
			data: headers.importedDataExample[index]
		}))
	}
	function createProfile() {
		let params = {}
		for (let i = 0; i < columnsNamesToExport.length; i++) {
			params[columnNamesSelected[i].name] = columnsNamesToExport[i].name
		}
		profileURL = `?mode=usingProfile&profileName=${encodeURIComponent(profileName)}&data=${encodeURIComponent(JSON.stringify(params))}`
	}
</script>

<svelte:head>
	<title>Crear Perfil GDTools</title>
</svelte:head>

{#if !xlsColumnNames}
	<div class="upload-file-dropbox">
		<p>Arrastra un archivo .xls para ver los nombres de las columnas</p>

		<Droplet
			handleFiles={async file => {
				xlsColumnNames = await getHeaders(file)
			}}
			let:droppable
			acceptedMimes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
			maxFilesAllowed={1}
		>
			<div class="zone" class:droppable>Arrastra o selecciona tu archivo .xls</div>
		</Droplet>
	</div>
{:else if xlsColumnNames}
	<div class="example-table section-border">
		<p>Esta es la primera linea de datos importada del archivo</p>
		<ExampleTable dataArray={xlsColumnNames} columnName="name" dataName="data" />
	</div>

	<div class="imported-columns section-border">
		<p>Arrastra las columnas del archivo importado al contenedor inferior en el orden que quieres que sean exportadas</p>
		<Dnd type="importedColumns" bind:items={xlsColumnNames} />
	</div>

	<div class="columns-to-import section-border">
		Columnas a exportar
		<DndLimit type="importedColumns" bind:items={columnNamesSelected} maxItems={columnsNamesToExport.length} />
	</div>
	<div class="columns-to-export section-border">
		<p>Añade, elimina y reordena las columnas que quieres que se exporten.</p>
		<p>Ejemplo, Referencia; Descripcion; Cantidad; Precio; Descuento; IVA.</p>

		<div class="columns-to-export">
			<Dnd bind:items={columnsNamesToExport} type="targetColumns" />

			<div class="add-remove-columns">
				<form on:submit|preventDefault={addToColumnNames}>
					<input bind:value={columnNameToAdd} placeholder="Nombre de columna" type="text" />
					<button type="submit">+</button>
				</form>
				<DndDelete bind:items={columnsToDelete} type="targetColumns" />
			</div>
		</div>
	</div>
	<div class="create-profile-exec section-border">
		{#if profileURL}
			Arrastra este link <a href={profileURL}>{profileName} a CSV</a> a los marcadores de tu navegador o al escritorio para crear un acceso directo
		{:else}
			<form on:submit|preventDefault={createProfile}>
				<input bind:value={profileName} placeholder="Nombre de perfil" type="text" />
				<button type="submit" disabled={columnNamesSelected.length != columnsNamesToExport.length || profileName.trim().length === 0}
					>Crear Perfil</button
				>
			</form>
		{/if}
	</div>
{/if}

<style>
	div {
		margin-top: var(--size-3);
	}
	.section-border {
		/* background-color: red; */
		border: 2px solid var(--surface-2);
		border-radius: var(--radius-3);
		padding: var(--size-2);
	}
	.example-table {
	}

	.upload-file-dropbox {
		padding: var(--size-2);
	}

	.zone {
		background-color: var(--surface-2);
		border: 1px dotted var(--orange-1);
		border-radius: var(--radius-3);
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		width: var(--size-fluid-10);
		height: var(--size-fluid-6);
		box-shadow: var(--shadow-4);
		transition: all 0.3s ease-in-out;
		&:hover {
			transform: scale(1.02, 1.02);
			box-shadow: var(--shadow-5);
		}
	}
	.columns-to-export {
		margin-inline: auto;
		/* background-color: red; */
	}

	.add-remove-columns {
		display: grid;
		grid-template-columns: 3fr 1fr;
		margin-inline: auto;
	}
</style>
