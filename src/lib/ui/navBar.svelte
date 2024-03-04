<script>
	export let title = 'navbar title'
	export let links = [
		{ name: 'Home', url: '/' },
		{ name: 'test', url: 'https://google.com' }
	]
	function isLocalURL(url) {
		return !(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//'))
	}
</script>

<header>
	<div class="nav">
		<input id="nav-check" type="checkbox" />
		<div class="nav-header">
			<a class="nav-title" href="/">{title}</a>
		</div>
		<div class="nav-btn">
			<label for="nav-check">
				<span> </span>
				<span> </span>
				<span> </span>
			</label>
		</div>

		<div class="nav-links">
			{#each links as link}
				<a href={link.url} target={isLocalURL(link.url) ? `_self` : '_blank'}>{link.name}</a>
			{/each}
		</div>
	</div>
</header>

<style>
	header {
		display: block;
	}
	.nav {
		width: 100%;
		padding: var(--size-fluid-1) 0;
		background-color: var(--surface-2);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.nav-header {
		display: flex;
		margin-inline: var(--size-fluid-3);
		padding: 0 var(--size-3);
		/* border: 1px solid red; */
	}
	.nav-title {
		font-weight: var(--font-weight-7);
		text-decoration: none;
		color: var(--text-1);
		transition: all 0.3s ease-in-out;
		&:hover {
			transform: scale(1.1, 1.1);
		}
	}
	.nav-links {
		display: flex;
		margin-inline: var(--size-fluid-3);
		gap: var(--size-3);
		padding: 0 var(--size-3);
		align-items: center;

		/* border: 1px solid green; */
	}

	.nav-links > a {
		background-color: var(--surface-1);
		border: 1px solid var(--surface-2);
		border-radius: var(--radius-2);
		box-shadow: var(--shadow-2);
		padding-inline: var(--size-3);
		text-decoration: none;
		color: var(--text-1);
		&:hover {
			background-color: var(--surface-3);
		}
	}
	.nav-btn {
		display: none;
	}

	#nav-check {
		display: none;
	}

	@media (max-width: 800px) {
		.nav-links {
			margin-inline: 0;
			background-color: var(--surface-3);
			position: absolute;
			width: 100%;
			left: 0;
			top: 100%;
			overflow-y: hidden;
			display: flex;
			flex-direction: column;
			padding-top: var(--size-3);
			transition: all 0.2s ease-in;
		}
		.nav-btn {
			position: absolute;
			background-color: var(--surface-2);
			right: 0;
			top: 0;
			height: 100%;
			aspect-ratio: 1/1;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			padding: var(--size-1);
		}
		.nav-btn > label {
			background-color: var(--surface-3);
			box-shadow: var(--shadow-3);
			border-radius: var(--radius-2);
			display: grid;
			padding: var(--size-1);
		}
		.nav-btn > label:hover,
		.nav #nav-check:checked ~ .nav-btn > label {
		}
		.nav-btn > label > span {
			height: 30%;
			translate: 0 130%;
			background-color: var(--text-1);
			border-radius: var(--radius-2);
		}
		.nav-links > a {
			display: block;
			width: 80%;
			text-align: center;
		}
		#nav-check:not(:checked) ~ .nav-links {
			padding-top: 0px;
			height: 0vh;
		}
		#nav-check:checked ~ .nav-links {
			height: calc(100vh - 100%);
			overflow-y: hidden;
		}
	}
</style>
