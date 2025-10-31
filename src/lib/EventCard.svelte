<script>
	import ImageLoader from './ImageLoader.svelte';

	let { event = {} } = $props();

	let date = $derived(new Date(event?.startDate || Date.now()));

	let responsiveImage = $derived.by(() => {
		const image = event.bannerImage?.url || '';
		const imageId = image.split('/').pop();
		return imageId
			? `https://cdn.filestackcontent.com/cache=expiry:max/resize=width:1280/output=format:webp,quality:20/compress/${imageId}`
			: null;
	});

	let isNextEvent = $derived(date > new Date());
</script>

<div class="event-card" aria-hidden={!event.name}>
	<div class="event-card__img">
		<ImageLoader src={responsiveImage} alt="" width="2500" height="1250" />
	</div>
	<div class="event-card__content">
		<div class="event-card__date">
			<div class="event-card__date-day">
				{date.getDate()}
			</div>
			<div class="event-card__date-month">
				{date.toLocaleString('default', { month: 'short' })}
			</div>
		</div>
		<div>
			<h2 class="event-card__heading">
				<div class="event-card__badge">
					{isNextEvent ? 'Next event' : 'Last event'}
				</div>
				{event.name}
			</h2>
			<div class="event-card__location">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-geo-alt"
					viewBox="0 0 16 16"
				>
					<path
						d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
					/>
					<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
				</svg>
				<div class="event-card__location-name">
					{event.venue}
				</div>
			</div>
			{#if event.url}
				<a href={event.url} class="bespoke event-card__link">
					<span class="sr-only">Join us</span>
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.event-card {
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		overflow: hidden;
		border: 2px solid transparent;
		position: relative;
		border-radius: 20px;
		background-image:
			linear-gradient(var(--background), var(--background)),
			var(--rainbow, linear-gradient(red, orange, yellow, green, blue, purple));
		background-origin: border-box;
		background-clip: padding-box, border-box;
		transition:
			transform 0.25s,
			box-shadow 0.25s;

		&:hover,
		&:focus-within {
			cursor: pointer;
			transform: scale(1.03) rotate(1deg);
		}

		&:active {
			transform: scale(1.02) rotate(1deg);
		}

		.event-card__content {
			padding: 16px 24px 24px;
			display: flex;
			gap: 24px;
		}

		.event-card__img {
			background: var(--background-secondary);
			aspect-ratio: auto 2500 / 1250;
			overflow: hidden;
		}

		:global(img) {
			width: 100%;
			height: auto;
			margin: 0;
			padding: 0;
		}

		.event-card__heading {
			margin: 0;
			font-size: inherit;
			font-weight: bold;
			line-height: 1;
			display: flex;
			flex-direction: column;
			gap: 4px;
			margin-bottom: 4px;
		}

		.event-card__date {
			display: flex;
			flex-direction: column;
			text-align: center;
			line-height: 1;
			gap: 5px;

			@media (min-width: 720px) {
				padding: 0 16px;
			}

			.event-card__date-day {
				font-size: 2.5rem;
				font-weight: bold;
			}

			.event-card__date-month {
				font-weight: bold;
				text-transform: uppercase;
				color: var(--text-secondary);
			}
		}

		.event-card__location {
			display: flex;
			gap: 0.25rem;
			align-items: center;
			font-size: 1rem;
		}

		.event-card__link {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.event-card__badge {
			font-weight: normal;
			text-transform: uppercase;
			font-size: 0.8rem;
		}
	}
</style>
