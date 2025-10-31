import { allStripes } from '$lib/Rainbow/rainbows';
import { writable, derived } from 'svelte/store';

export const rainbowStripeIndex = writable(0);

export const rainbowGradient = derived([rainbowStripeIndex], ([stripeIndex]) => {
	const rainbow = allStripes[stripeIndex];
	return `linear-gradient(to right, ${rainbow.stripes.map((stripe) => stripe.colour).join(',')})`;
});

export const rainbowBoxShadow = derived([rainbowStripeIndex], ([stripeIndex]) => {
	const rainbow = allStripes[stripeIndex];
	return rainbow.stripes[rainbow.stripes.length - 1].colour
		.replace(')', ',.5')
		.replace('hsl', 'hsla');
});
