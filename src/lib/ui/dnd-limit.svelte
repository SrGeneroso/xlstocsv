<script>
	import { flip } from 'svelte/animate'
	import { dndzone } from 'svelte-dnd-action'

	export let items
	export let type
	export let maxItems = 5
	let dropFromOthersDisabled = false

	const flipDurationMs = 300

	function handleDndConsider(e) {
		items = e.detail.items
		if (items.length < maxItems) {
			dropFromOthersDisabled = false
		}
	}
	function handleDndFinalize(e) {
		items = e.detail.items
		dropFromOthersDisabled = items.length >= maxItems
	}
</script>

<section
	class="dnd-zone"
	use:dndzone={{ items, flipDurationMs, type, dropFromOthersDisabled, centreDraggedOnCursor: true }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<div class="dnd-item" animate:flip={{ duration: flipDurationMs }}>
			{item.name}
		</div>
	{/each}
</section>

<!-- https://svelte.dev/repl/44c9229556f3456e9883c10fc0aa0ee9?version=3.59.2 -->

<style>
	.dnd-zone {
		min-height: var(--size-6);
		background-color: var(--surface-2);
		padding: var(--size-2);
		box-shadow: var(--inner-shadow-3);
		border-radius: var(--radius-3);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		gap: var(--size-1);
	}
	.dnd-item {
		display: flex;
		padding-inline: var(--size-1);

		background-color: var(--surface-3);
		box-shadow: var(--shadow-2);
		border: 0.1rem solid var(--surface-2);
		border-radius: var(--radius-2);
		white-space: nowrap;
		transition: all 0.2s ease-in-out;
	}
	.dnd-item:hover {
		transform: scale(1.1, 1.1);
		box-shadow: var(--shadow-4);
	}
	:global(#dnd-action-dragged-el) {
	}
</style>
