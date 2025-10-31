<script>
	import Header from '$lib/Header.svelte';
	import menuHeader from '../data/menuHeader.json';
	import menuFooter from '../data/menuFooter.json';
	import site from '../data/site.json';
	import Footer from '$lib/Footer.svelte';
	import Rainbow from '$lib/Rainbow/Rainbow.svelte';
	import '../global.css';
	import { rainbowBoxShadow, rainbowGradient } from '$lib/stores';

	let { children } = $props();
</script>

<div class="layout" style:--rainbow={$rainbowGradient} style:--box-shadow-base={$rainbowBoxShadow}>
	<Header items={menuHeader} tagline={site.description} />

	<article>
		{@render children()}
	</article>

	<Footer items={menuFooter}>
		<p>
			Copyright &copy; 2025 <a href="https://ashk.au/">Ash Kyd</a> and contributors. Site design
			inspired by{' '}
			<a href="https://queerjs.com">queerjs.com</a>. Suggest{' '}
			<a href="https://github.com/bnelgbtq/bnelgbtq-website"> changes on Github </a>
			.
		</p>
	</Footer>
	<div class="rainbow-sidebar">
		<Rainbow isClickable={true} />
	</div>
</div>
