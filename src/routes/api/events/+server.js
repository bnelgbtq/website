import { parseEventsStrict } from './eventScraper';
import fs from 'node:fs/promises';

const CACHE_LENGTH = 1000 * 60 * 60; // 1 hour

/** @type {any[] | null} */
let cachedEvents = null;
let cacheTimestamp = 0;

export async function GET() {
	const now = Date.now();

	// Return cached data if it's still fresh
	if (cachedEvents && now - cacheTimestamp < CACHE_LENGTH) {
		return new Response(JSON.stringify({ events: cachedEvents, cached: true }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': `public, max-age=${Math.floor((CACHE_LENGTH - (now - cacheTimestamp)) / 1000)}`
			}
		});
	}

	// Fetch fresh data
	const markup = await fetch('https://luma.com/bnelgbt').then((res) => res.text());
	const events = parseEventsStrict(markup);

	// Update cache
	cachedEvents = events;
	cacheTimestamp = now;

	return new Response(JSON.stringify({ events, cached: false }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': `public, max-age=${CACHE_LENGTH / 1000}`
		}
	});
}
