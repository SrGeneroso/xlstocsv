<script>
	import NavBar from './lib/ui/navBar.svelte'
	import CreateProfile from './lib/pages/createProfile.svelte'
	import UsingProfile from './lib/pages/usingProfile.svelte'
	let appMode = Object.fromEntries(new URLSearchParams(window.location.search).entries()).mode
</script>

<NavBar
	title="GDTools"
	links={[
		{ name: 'Crear Perfil', url: '?mode=createProfile' },
		{ name: 'Github', url: 'https://github.com/SrGeneroso/xlstocsv' }
	]}
/>
<body>
	{#if !appMode}
		<!-- Home Page -->
		<h1>GDTools</h1>
		<br />
		<h2>XLStoCSV</h2>
		<br />
		<p>Crea un perfil basado en las columnas de tus archivos y define las columnas que quieres exportar.</p>
		<br />
		<p>
			Dirigete a la seccion de <a href="?mode=createProfile">Crear Perfil</a> para crear tu link personalizado<br /> ¡No te olvides de guardar el link
			de tu perfil personalizado!
		</p>
	{:else if appMode === 'createProfile'}
		<CreateProfile />
	{:else if appMode === 'usingProfile'}
		<UsingProfile />
	{:else}
		<p>Ooops, la URL introducida no es correcta.</p>
	{/if}
</body>

<style>
	body {
		width: 90%;
		margin-inline: auto;
	}
</style>
