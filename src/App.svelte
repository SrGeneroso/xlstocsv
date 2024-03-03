<script>
	import { exportedJson, data, readXlsHeaders, handleSpreadsheetFile, spreadsheetConversion } from './lib/xls/Conversion'
	import Droplet from './lib/ui/droplet.svelte'
	import NavBar from './lib/ui/navBar.svelte'
	import Dnd from './lib/ui/dnd.svelte'

	//Get URL Data
	const domain = `${window.location.hostname}${location.port ? `:${location.port}` : ''}`

	let urlParams = Object.fromEntries(new URLSearchParams(window.location.search).entries())

	let appMode = urlParams.mode
	let urlParam2 = new URLSearchParams(window.location.search).keys()

	//query structure? ?mode=createProfile&profileName=davasa&Referencia=Referencia&Descripcion=Descripción&Cantidad=Cantidad&Precio=Precio&Descuento=%25%20Dto.1
	// i need to encode decode uri

	let headers
	let items2 = []

	async function getHeaders(file) {
		let headers = await readXlsHeaders(file[0])
		return headers.map((name, index) => ({ id: index + 1, name }))
	}

	async function handleFiles(files) {
		handleSpreadsheetFile(files)
		for (const file of files) {
			console.log(file.name)
		}
	}
</script>

<NavBar
	title="SRG GDTools"
	links={[
		{ name: 'Crear Perfil', url: '?mode=createProfile' },
		{ name: 'Github', url: 'https://github.com/SrGeneroso/xlstocsv' },
		{ name: 'Github', url: 'https://github.com/SrGeneroso/xlstocsv' },
		{ name: 'Github', url: 'https://github.com/SrGeneroso/xlstocsv' }
	]}
/>
{#if !appMode}
	<!-- Home Page -->
	<h1>SRGDTools</h1>
	<h2>Conversion de albaranes xls a GDTaller</h2>
	<p>TODO, manual de como usar la app</p>
{:else if appMode === 'createProfile'}
	<!-- Create Profile Page -->
	<p>TODO - input profile name</p>
	{#if !headers}
		<div class="dropbox">
			<p>Arrastra un archivo .xls para ver los nombres de las columnas</p>
			<Droplet
				handleFiles={async file => {
					headers = await getHeaders(file)
				}}
				let:droppable
				acceptedMimes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
				maxFilesAllowed={1}
			>
				<div class="zone" class:droppable>Arrastra o selecciona tu archivo .xls</div>
			</Droplet>
		</div>
	{:else if headers}
		<div class="headers">
			<Dnd items={headers} />
			<Dnd items={items2} />
		</div>
	{/if}
{:else if appMode === 'usingProfile'}
	<!-- Using Profile Page -->
	im using profiles
{:else}
	Ooops, se supone que deberia haber algo aqui
{/if}

<style>
	NavBar {
	}
	.dropbox {
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
	.headers {
		display: flex;
		flex-wrap: wrap;
	}
</style>
