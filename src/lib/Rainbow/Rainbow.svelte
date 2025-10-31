<script>
	import { onMount } from 'svelte';
	import { allStripes } from './rainbows';
	import { rainbowStripeIndex } from '$lib/stores';

	let isMounted = $state(false);

	let { isClickable = false } = $props();

	// Function to handle localStorage
	/**
	 * @param {string} action
	 * @param {...any} args
	 */
	function doLocalStorage(action = '', ...args) {
		try {
			return localStorage[action](...args);
		} catch (e) {}
	}

	// Load stripe index from localStorage on component mount
	onMount(() => {
		isMounted = true;
		$rainbowStripeIndex = JSON.parse(doLocalStorage('getItem', 'flagIndex') || '0');
	});

	// Save stripe index to localStorage when it changes
	$effect(() => {
		const _stripeIndex = $rainbowStripeIndex;
		if (isMounted) {
			doLocalStorage('setItem', 'flagIndex', _stripeIndex);
		}
	});

	// Function to handle click events
	function handleClick() {
		if (isMounted && allStripes[$rainbowStripeIndex + 1]) {
			$rainbowStripeIndex = $rainbowStripeIndex + 1;
		} else {
			$rainbowStripeIndex = 0;
		}
	}
</script>

{#snippet rainbow()}
	<div class="rainbow__wrapper">
		{#each [...(allStripes[$rainbowStripeIndex]?.stripes || []), ...Array.from( { length: 10 } )] as stripe, i}
			<div style="background: {stripe?.colour || 'black'}; flex: {stripe?.size || 0};"></div>
		{/each}
	</div>
{/snippet}

{#if isClickable}
	<button
		class="rainbow"
		title="{allStripes[$rainbowStripeIndex]?.name} flag"
		aria-live="assertive"
		onclick={handleClick}
	>
		<div class="sr-only">{allStripes[$rainbowStripeIndex]?.name} flag - click to change</div>
		{@render rainbow()}
	</button>
{:else}
	{@render rainbow()}
{/if}

<style>
	.rainbow {
		width: 100%;
		height: 100%;
		cursor: pointer;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		animation: fadeIn 0.2s;
	}

	.rainbow__wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.2s;
		& > * {
			flex: 1;
			transition:
				flex 0.2s,
				background-color 0.4s;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
