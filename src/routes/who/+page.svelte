<script>
	export const csr = false;
	import HeaderMetadata from '$lib/HeaderMetadata/HeaderMetadata.svelte';
	import organisers from '../../data/organisers.json';
</script>

<HeaderMetadata
	title="Who are we?"
	description="This meetup has been running since 2017 and has been organised by a number of wonderful folks."
/>
<h1>Who are we?</h1>
<p>
	This meetup has been running since 2017 and has been organised by a number of wonderful folks.
</p>
<p>Currently it's organised by:</p>

<ul>
	{#each organisers as organiser}
		<li>
			{#if organiser.url}
				<a href={organiser.url}>{organiser.name}</a>
			{:else}
				{organiser.name}
			{/if}

			{#if organiser.email}
				&nbsp;(<a href={`mailto:${organiser.email}`}>{organiser.email}</a>)
			{/if}
		</li>
	{/each}
</ul>
