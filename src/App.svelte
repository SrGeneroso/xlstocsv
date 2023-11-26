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

<!-- Select File -->
<!-- <input
	type="file"
	id="filePicker"
	accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	on:change={handleSpreadsheetFile}
	on:mouseenter={() => console.log(exportedJson === null)}
/>

<label for="filePicker" class="file-upload">
	<span>Select File</span>
	<input type="file" id="filePicker" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
</label> -->
<p>Conversion of Davasa to GDTaller</p>
<Droplet
	{handleFiles}
	let:droppable
	acceptedMimes={['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
	maxFilesAllowed={1}
>
	<div class="zone" class:droppable>Select or drop files here</div>
</Droplet>

<style>
	.zone {
		border: 1px dotted red;
		width: 50vw;
		height: 3rem;
		background-color: gray;
	}
</style>
