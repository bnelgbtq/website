<script>
	let isLoaded = $state(false);

	let props = $props();

	function onLoad() {
		isLoaded = true;
	}
</script>

<img
	{...props}
	onload={onLoad}
	style={`opacity: ${isLoaded ? 1 : 0}; transition: opacity 0.25s;`}
	loading="lazy"
	decoding="async"
/>
