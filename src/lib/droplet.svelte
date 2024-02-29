<!-- https://github.com/probablykasper/svelte-droplet/blob/master/src/lib/FileDrop.svelte -->
<script lang="ts">
	export let handleFiles: (files: File[]) => void = () => {
		/* noop */
	}

	export let acceptedMimes: string[] | null = null
	export let maxFilesAllowed = 0
	export let disabled = false
	export let name: string | null | undefined = undefined
	export let tabindex = 0

	let droppable = false
	$: if (disabled) droppable = false

	let input: HTMLInputElement

	function getAcceptedFiles(files: FileList | File[] = []): File[] {
		let acceptedFiles = []
		for (let i = 0; i < files.length; i++) {
			if (acceptedMimes === null || isAccepted(files[i])) {
				acceptedFiles.push(files[i])
			} else {
				console.log('mime incorrect')
				return
			}
		}
		if (maxFilesAllowed !== 0) {
			acceptedFiles = acceptedFiles.slice(0, maxFilesAllowed)
		} else {
			console.log('max files number reached')
			return
		}
		return acceptedFiles
	}

	function isAccepted(item: DataTransferItem | File): boolean {
		if (acceptedMimes === null) {
			return true
		}
		for (const acceptedType of acceptedMimes) {
			if (acceptedType.startsWith('.')) {
				const file = item instanceof DataTransferItem ? item.getAsFile() : item
				if (file?.name.endsWith(acceptedType)) {
					return true
				}
			}
			if (acceptedType === 'application/*' && item.type.startsWith('application/')) {
				return true
			} else if (acceptedType === 'audio/*' && item.type.startsWith('audio/')) {
				return true
			} else if (acceptedType === 'video/*' && item.type.startsWith('video/')) {
				return true
			} else if (acceptedType === 'image/*' && item.type.startsWith('image/')) {
				return true
			} else if (acceptedType === 'text/*' && item.type.startsWith('text/')) {
				return true
			} else if (item.type === acceptedType) {
				return true
			}
		}
		return false
	}

	function dragOver(e: DragEvent) {
		if (disabled) {
			return
		}
		const items = Array.from(e.dataTransfer?.items || [])
		for (const item of items) {
			if (item.kind === 'file' && isAccepted(item)) {
				droppable = true
				return
			}
		}
	}

	function dragLeave() {
		droppable = false
	}

	function drop(e: DragEvent) {
		if (disabled) {
			return
		}
		const acceptedFiles = getAcceptedFiles(e.dataTransfer?.files)
		if (acceptedFiles.length > 0) {
			handleFiles(acceptedFiles)
		}
		droppable = false
	}

	let inputFiles: FileList
	function handleChange() {
		const acceptedFiles = getAcceptedFiles(inputFiles)
		if (acceptedFiles && acceptedFiles.length > 0) {
			handleFiles(acceptedFiles)
		}
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault()
			input.click()
		}
	}
</script>

<div
	on:drop|preventDefault={drop}
	on:dragover|preventDefault={dragOver}
	on:dragenter|preventDefault={dragOver}
	on:dragleave|preventDefault={dragLeave}
	{tabindex}
	on:keydown={keydown}
	on:click={() => input.click()}
	role="button"
	aria-label="File Upload"
>
	<slot {droppable}>Upload</slot>
</div>
<input
	type="file"
	accept={acceptedMimes === null ? null : acceptedMimes.join(',')}
	multiple={maxFilesAllowed !== 1}
	bind:files={inputFiles}
	on:change={handleChange}
	bind:this={input}
	{disabled}
	{name}
/>

<style>
	div {
		cursor: pointer;
	}

	[disabled] {
		cursor: default;
	}

	input {
		display: none;
	}
</style>
