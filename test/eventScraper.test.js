import { expect, test } from 'vitest';
import { parseEventsStrict } from '../src/routes/api/events/eventScraper';
import fs from 'node:fs/promises';

test('parse full HTML', async () => {
	const html = await fs.readFile('./test/markup.html', 'utf8');
	const res = parseEventsStrict(html);

	// The markup.html has 1 real event and several shimmer/loading placeholders
	expect(res.length).toEqual(1);
	expect(res[0].event.name).toBe('February Queer Tech Drinks');
});
