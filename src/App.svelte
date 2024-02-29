<script>
	import { exportedJson, data, handleSpreadsheetFile, spreadsheetConversion } from './lib/Conversion'
	import Droplet from './lib/droplet.svelte'

	function handleFiles(files) {
		handleSpreadsheetFile(files)
		console.log({ files })
		for (const file of files) {
			console.log(file.name)
		}
	}
</script>

<h1>SRGDTools</h1>
<p>Conversion de albaranes xls a GDTaller</p>
<div class="dropbox">
	<Droplet
		{handleFiles}
		let:droppable
		acceptedMimes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
		maxFilesAllowed={1}
	>
		<div class="zone" class:droppable>Arrastra o selecciona tu archivo .xls</div>
	</Droplet>
</div>

<style>
	.dropbox {
		padding: var(--size-2);
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
