<script lang="ts">
	import { page } from '$app/state';
	import site from '../../data/site.json';
	import ogImage from './opengraph-image.jpg';
	import favicon from './icon.svg';

	let {
		title = site.title,
		ogTitle = site.title,
		description = site.description,
		ogDescription = site.description
	} = $props();
</script>

<svelte:head>
	<title>{title} 🏳️‍🌈 {site.title}</title>
	<meta name="description" content={description || ogDescription} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:title" content={(ogTitle || title).trim()} />
	<meta property="og:description" content={ogDescription || description} />
	<meta property="og:url" content="{site.baseUrl}{page.url.pathname}" />
	<meta property="og:image" content="{site.baseUrl}{ogImage}" />
	<meta
		property="og:image:alt"
		content="Four cartoon women sit around a park bench with a laptop and game controllers"
	/>
	<meta property="og:type" content="website" />
	<link rel="icon" href={favicon} sizes="any" type="image/svg+xml" />
</svelte:head>
