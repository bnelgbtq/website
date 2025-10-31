import { pick } from 'lodash-es';
import { HUMANITIX_KEY } from '$env/static/private';

const CACHE_LENGTH = 1000 * 60 * 60;
let eventCache = {
	date: 0,
	events: []
};

async function fetchEvents(apiKey = '', organiserId = '', futureOnly = true) {
	if (eventCache.date > Date.now() - CACHE_LENGTH) {
		return eventCache.events;
	}

	const url = new URL('https://api.humanitix.com/v1/events');
	url.searchParams.set('inFutureOnly', String(futureOnly));
	url.searchParams.set('page', '1');
	url.searchParams.set('pageSize', '5');

	// Make the request to Humanitix API
	const response = await fetch(url.toString(), {
		headers: {
			'x-api-key': apiKey,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Humanitix API error: ${response.status} - ${text}`);
	}

	const data = await response.json();

	// Filter events by organiserId if provided
	let events = data.events;
	if (organiserId) {
		events = events.filter((event) => event.organiserId === organiserId);
	}

	events = events
		.filter((event) => event.published)
		.map((event) => ({
			...pick(event, ['name', 'url', 'bannerImage', 'startDate']),
			venue: event.eventLocation?.venueName
		}));

	eventCache = {
		date: Date.now(),
		events
	};

	// Send the filtered events back to the client
	return events;
}

export async function GET(request) {
	if (!HUMANITIX_KEY) {
		return new Response(JSON.stringify({ error: 'Missing API Key' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	const events = await fetchEvents(HUMANITIX_KEY);
	return new Response(JSON.stringify({ events }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});

	return new Response(events);
}
