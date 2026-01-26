<script>
	import { onMount } from 'svelte';
	import EventCard from './EventCard.svelte';

	/** @type {{events: Array<{name?: string, url?: string, venue?: string, bannerImage?: {url?: string}, startDate?: string}>}} */
	let events = $state({ events: [] });

	onMount(async () => {
		try {
			const res = await fetch('/api/events');
			events = await res.json();
		} catch (e) {
			console.error('could not fetch events', e);
		}
	});
</script>

{#if events?.events?.length}
	<EventCard event={events.events[0]} />
{:else}
	<p>
		There are no events scheduled. Why not check out <a href="https://luma.com/bnelgbt"
			>our calendar on Luma</a
		>.
	</p>
{/if}
