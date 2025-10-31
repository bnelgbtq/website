<script>
	import { page } from '$app/state';

	/**
	 * @typedef {Object} Props
	 * @property {Array<{url: string, shortTitle: string}>} [items]
	 */

	/** @type {Props} */
	let { items = [] } = $props();
</script>

<ol class="horizontal-nav">
	{#each items as item}
		<li class={page.url.pathname === item.url ? 'horizontal-nav__active' : ''}>
			<a href={item.url}>{item.shortTitle}</a>
		</li>
	{/each}
</ol>

<style>
	.horizontal-nav {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	@media (min-width: 720px) {
		.horizontal-nav {
			flex-direction: row;
			gap: 1rem;
		}
	}

	.horizontal-nav a {
		text-decoration-thickness: 1px;
		text-decoration-skip-ink: auto;
		text-underline-offset: 3px;
	}

	.horizontal-nav li.horizontal-nav__active:after {
		content: ' 👈';
	}
</style>
