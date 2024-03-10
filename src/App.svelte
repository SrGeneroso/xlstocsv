<script>
	import NavBar from './lib/ui/navBar.svelte'
	import CreateProfile from './lib/pages/createProfile.svelte'

	//Get URL Data
	const domain = `${window.location.hostname}${location.port ? `:${location.port}` : ''}`

	let urlParams = Object.fromEntries(new URLSearchParams(window.location.search).entries())

	let appMode = urlParams.mode
	let urlParam2 = new URLSearchParams(window.location.search).keys()

	//query structure? ?mode=createProfile&profileName=davasa&Referencia=Referencia&Descripcion=Descripción&Cantidad=Cantidad&Precio=Precio&Descuento=%25%20Dto.1
	// i need to encode decode uri
</script>

<NavBar
	title="SRG GDTools"
	links={[
		{ name: 'Crear Perfil', url: '?mode=createProfile' },
		{ name: 'Usar Perfil', url: '?mode=usingProfile' },
		{ name: 'Github', url: 'https://github.com/SrGeneroso/xlstocsv' }
	]}
/>
<body>
	{#if !appMode}
		<!-- Home Page -->
		<h1>SRGDTools</h1>
		<h2>Conversion de albaranes xls a GDTaller</h2>
		<p>TODO, manual de como usar la app</p>
	{:else if appMode === 'createProfile'}
		<CreateProfile />
	{:else if appMode === 'usingProfile'}
		<!-- Using Profile Page -->
		im using profiles
	{:else}
		Ooops, se supone que deberia haber algo aqui
	{/if}
</body>

<style>
	body {
		width: 90%;
		margin-inline: auto;
	}
</style>
