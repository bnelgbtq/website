<script>
	import HorizontalNav from './HorizontalNav.svelte';
	let { items, children } = $props();
</script>

<footer class="footer">
	<nav>
		<HorizontalNav {items} />
	</nav>
	<div class="footer__legal">
		{@render children()}
	</div>
</footer>

<style>
	.footer {
		margin: 4rem 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.footer__legal {
			font-size: 0.75rem;
			margin: 0;
			font-style: italic;
		}
	}
</style>
