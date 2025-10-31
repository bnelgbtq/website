<script>
	import HorizontalNav from './HorizontalNav.svelte';

	let { items, tagline } = $props();
</script>

<header class="header">
	<p>{tagline}</p>
	<nav>
		<HorizontalNav {items} />
	</nav>
</header>

<style>
	.header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 2em 0 3rem;
		p {
			font-size: 0.75rem;
			margin: 0;
			font-style: italic;
		}

		nav {
			font-weight: 800;
		}
	}
</style>
