<script>
	import NavBar from './lib/ui/navBar.svelte'
	import CreateProfile from './lib/pages/createProfile.svelte'
	import UsingProfile from './lib/pages/usingProfile.svelte'
	let urlParams = Object.fromEntries(new URLSearchParams(window.location.search).entries())
	let appMode = urlParams.mode
</script>

<NavBar
	title="SRG GDTools"
	links={[
		{ name: 'Crear Perfil', url: '?mode=createProfile' },
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
		<UsingProfile />
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
