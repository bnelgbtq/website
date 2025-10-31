<script>
	let { children } = $props();
</script>

<div class="hero-item">
	{@render children()}
</div>

<style>
	.hero-item > :global(*) {
		display: block;
		width: 80%;
		height: auto;
		margin: 0 auto;
	}
</style>
