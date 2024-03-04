<script>
	import { flip } from 'svelte/animate'
	import { dndzone } from 'svelte-dnd-action'
	export let items
	export let containerWidth = '90%'
	export let itemWidth = ''
	export let type
	const flipDurationMs = 300
	function handleDndConsider(e) {
		items = e.detail.items
	}
	function handleDndFinalize(e) {
		items = e.detail.items
	}
</script>

<section
	class="dnd-zone"
	style="width:{containerWidth}"
	use:dndzone={{ items, flipDurationMs, type }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<div class="dnd-item" style="flex: 0 0 {itemWidth}" animate:flip={{ duration: flipDurationMs }}>
			{item.name}
		</div>
	{/each}
</section>

<style>
	.dnd-zone {
		min-height: var(--size-8);
		margin: var(--size-2) auto;
		background-color: var(--surface-2);
		padding: var(--size-2);
		box-shadow: var(--inner-shadow-4);
		border-radius: var(--radius-2);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		gap: var(--size-1);
	}
	.dnd-item {
		padding: var(--size-1);
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
