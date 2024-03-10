<script>
	import { handleSpreadsheetFile } from '../xls/Conversion'
	import Droplet from '../ui/droplet.svelte'
	let urlParams = Object.fromEntries(new URLSearchParams(window.location.search))
	let profileName = urlParams.profileName
	const format = urlParams.data
	// console.log(format)

	function handleFiles(files) {
		handleSpreadsheetFile(files, format)
	}
</script>

<svelte:head>
	<title>{`${profileName} to CSV - GDTools`}</title>
</svelte:head>

<div class="dropbox">
	{#if profileName}
		<div class="dropbox-title">
			Perfil <strong>{profileName}</strong>
		</div>
	{/if}
	{#if format}
		<Droplet
			{handleFiles}
			let:droppable
			acceptedMimes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
			maxFilesAllowed={1}
		>
			<div class="zone" class:droppable>Arrastra o selecciona tu archivo .xls</div>
		</Droplet>
		<div class="dropbox-info">
			<p>Solo se puede subir un archivo a la vez.</p>
			<p>Utiliza archivos con el mismo formato utilizado en la creacion de este perfil.</p>
			<p>Una vez procesado el archivo se abrira el dialogo para descargar el archivo convertido.</p>
		</div>
	{:else}
		La URL no contiene un formato correcto, por favor usa el <a href="/?mode=createProfile">Creador de perfiles</a> para generar una direccion para tus
		archivos.
	{/if}
</div>

<style>
	.dropbox {
		padding: var(--size-2);
	}
	.dropbox-title {
		padding: var(--size-2);
		font-size: var(--size-4);
	}
	.dropbox-info > p {
		padding: var(--size-2);
		font-size: var(--size-3);
	}
	.zone {
		background-color: var(--surface-2);
		border: 1px dotted var(--orange-1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		width: var(--size-fluid-10);
		height: var(--size-fluid-6);
		border-radius: var(--radius-3);
		box-shadow: var(--shadow-4);
		transition: all 0.3s ease-in-out;
		&:hover {
			transform: scale(1.05, 1.05);
			box-shadow: var(--shadow-5);
		}
	}
</style>
