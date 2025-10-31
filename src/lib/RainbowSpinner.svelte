<script>
	import Rainbow from './Rainbow/Rainbow.svelte';

	/** @type {number} */
	export let height = 300;
</script>

<div class="rainbow-spinner" style="--height: {height}px;">
	{#each Array.from({ length: 2 }) as _, i}
		<div class="rainbow-spinner__rainbow">
			<Rainbow />
		</div>
	{/each}
</div>

<style>
	.rainbow-spinner {
		height: var(--height);
		overflow: hidden;
	}
	.rainbow-spinner__rainbow {
		height: var(--height);
		animation: rainbow-spinner-pan 10s linear infinite;
	}
	@keyframes rainbow-spinner-pan {
		from {
			translate: 0 0;
		}
		to {
			translate: 0 calc(0px - var(--height));
		}
	}
</style>
