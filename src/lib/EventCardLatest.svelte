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

<EventCard event={events.events[0]} />
