<script>
	export let columnName = 'name'
	export let dataName = 'data'
	export let dataArray = [
		{ column: 'Example column', data: 'Example data' },
		{ column: 'Another', data: 'Another data' },
		{ column: 'One more', data: 'One more data' }
	]
</script>

<div class="exampleTable">
	<table class="exampleTable-table">
		<thead class="exampleTable-head">
			<tr>
				{#each dataArray as data}
					<th>{data[columnName]}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="exampleTable-body">
			{#each dataArray as data}
				<td>{data[dataName]}</td>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.exampleTable {
		padding: var(--size-2);
		overflow-x: scroll;
		border-radius: 0;
	}
	.exampleTable-head > tr > th {
		/* background-color: red; */
		white-space: nowrap;
	}
	.exampleTable-body > td {
		/* background-color: red; */
		white-space: nowrap;
	}
</style>
