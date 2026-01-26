import { JSDOM } from 'jsdom';
import assert from 'node:assert';

/**
 * Helper to extract text and throw error if missing
 * @param {Element} parent - The parent DOM element
 * @param {string} selector - CSS Selector
 * @param {string} fieldName - Name for the error message
 */
function getRequiredText(parent, selector, fieldName) {
	const element = parent.querySelector(selector);
	if (!element || !element.textContent.trim()) {
		throw new Error(
			`Scraper Error: Could not find required field "${fieldName}" using selector "${selector}"`
		);
	}
	return element.textContent.trim();
}

/**
 *
 * @param {string} htmlContent
 * @returns
 */
export function parseEventsStrict(htmlContent) {
	const dom = new JSDOM(htmlContent);
	const { document } = dom.window;

	const nextDataEl = document.querySelector('#__NEXT_DATA__');
	if (!nextDataEl) {
		throw new Error('No Next data el, events not found');
	}
	try {
		const events = JSON.parse(nextDataEl.textContent);
		const featuredItems = events.props.pageProps.initialData.data.featured_items;
		featuredItems.forEach((item) => {
			assert(typeof item.event === 'object');
			assert(typeof item.event.name === 'string');
			assert(!isNaN(Number(new Date(item.event.start_at))));
			assert(typeof item.event.url === 'string');
			assert(typeof item.event.geo_address_info.full_address === 'string');
		});
		return featuredItems;
	} catch (e) {
		console.error('Could not parse event data JSON. Events not found.');
		throw e;
	}
}
