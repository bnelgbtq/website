<script>
	import RainbowSpinner from './RainbowSpinner.svelte';

	let email = $state('');

	/** @type {string | null} */
	let error = $state(null);

	/** @type {'ready' | 'submitting' | 'success'} */
	let status = $state('ready');

	/** @type {HTMLFormElement} */
	let form;

	async function onSubmit(e) {
		e.preventDefault();
		error = null;

		if (!email) {
			error = 'Please enter an email';
			return;
		}

		status = 'submitting';

		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok) {
				status = 'success';
				email = '';
			} else {
				error = data.error || 'An error occurred. Please try again.';
				status = 'ready';
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
			status = 'ready';
		}
	}
</script>

<form class={`email-subscribe email-subscribe--${status}`} onsubmit={onSubmit} bind:this={form}>
	<label for="email-subscribe">
		<div class="email-subscribe__sell">To hear about upcoming events, enter your email</div>
	</label>
	<div class="email-subscribe__pill">
		<div class="email-subscribe__inliner">
			<div class="email-subscribe__input">
				<input id="email-subscribe" type="email" bind:value={email} disabled={status !== 'ready'} />
			</div>
			<button type="submit" disabled={status !== 'ready'}> Subscribe </button>
		</div>
		<div
			class={`email-subscribe__spinner email-subscribe__spinner--${
				status === 'submitting' ? 'submitting' : 'dormant'
			}`}
		>
			{#if status === 'submitting'}
				<RainbowSpinner height={100} />
				<div class="email-subscribe__spinner-text">loading...</div>
			{/if}
		</div>
		{#if status === 'success'}
			<div class={`email-subscribe__success`}>
				<div class="email-subscribe__emojo">🥳</div>
				<div>
					<strong class="email-subscribe__done">Done!</strong>
					Check your email to confirm.
				</div>
				<div class="email-subscribe__emojo">🌈</div>
			</div>
		{/if}
	</div>
	<p class="email-subscribe__error" aria-hidden={!error}>
		{error || ''}
	</p>
</form>

<style>
	.email-subscribe {
		margin: 0;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 16px;
		position: relative;
		white-space: balance;
	}

	@media (min-width: 720px) {
		.email-subscribe {
			margin: 0 32px;
		}
	}

	.email-subscribe__pill {
		position: relative;
		box-shadow: var(--box-shadow);
		border-radius: 1000px;
		overflow: hidden;
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
		border: 2px solid transparent;
	}

	.email-subscribe--ready .email-subscribe__pill {
		border: 2px solid var(--highlightDarkest);
		&:focus-within {
			border-color: var(--highlight);
		}
	}

	.email-subscribe__spinner {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 0%;
		z-index: 3;
		overflow: hidden;
		transition: ease-out height 0.2s;
	}

	.email-subscribe__spinner--submitting {
		height: 100%;
	}

	.email-subscribe__spinner-text {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		font-size: 1.5rem;
		color: #fff;
		-webkit-text-stroke: 5px #00000044;
		paint-order: stroke fill;
	}

	.email-subscribe__success {
		position: absolute;
		left: 0;
		bottom: 0;
		width: calc(100% - 2rem);
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 1rem;
		text-wrap: balance;
		overflow: hidden;
		gap: 16px;
		background: linear-gradient(to right, var(--highlightDarkest), var(--highlightDark));
		color: white;
		animation: email-subscribe__success 0.75s ease-in-out;
	}

	.email-subscribe__success .email-subscribe__done {
		font-weight: bold;
		&:after {
			content: ' ';
		}
	}

	.email-subscribe__error {
		position: absolute;
		width: 9em;
		left: 50%;
		bottom: -4px;
		translate: -50% 100%;
		margin: 0;
		background: linear-gradient(to right, var(--highlightDarkest), var(--highlightDark));
		box-shadow: var(--box-shadow);
		border-radius: var(--border-radius);
		color: white;
		transition: opacity 0.2s;
		padding: 8px 16px;
	}

	.email-subscribe__error[aria-hidden='true'] {
		opacity: 0;
		pointer-events: none;
	}

	.email-subscribe__error:hover {
		opacity: 0.4;
	}

	@keyframes email-subscribe__success {
		from {
			opacity: 0;
		}
		25% {
			opacity: 1;
		}
		50% {
			filter: brightness(1.5);
		}
		to {
		}
	}

	.email-subscribe__emojo {
		font-size: 1rem;
	}

	@media (min-width: 720px) {
		.email-subscribe__emojo {
			font-size: 2em;
		}
	}

	.email-subscribe__inliner {
		position: relative;
		display: flex;
	}

	.email-subscribe__input {
		outline: none;
		flex: 1;
		max-width: 100%;
		position: relative;
		height: 3em;
		font-size: 1.25rem;
	}

	@media (min-width: 720px) {
		.email-subscribe__input {
			height: 3em;
		}
	}

	.email-subscribe__input :global(input) {
		border: none;
		background: transparent;
		color: inherit;
		outline: none;
		font-size: inherit;
		font-family: inherit;
		font-weight: 300;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 0 16px;
		&::-internal-autofill-selected {
			-webkit-background-clip: text;
			-webkit-text-fill-color: var(--text);
		}
	}

	.email-subscribe__inliner :global(button) {
		margin: 6px;
		border-radius: 1000px;
		border: none;
		background: var(--highlightDarkest);
		color: white;
		font-weight: bold;
		padding: 0 24px;
		cursor: pointer;
		transition: background-color 0.2s;
		&:hover {
			background-color: var(--highlightDark);
		}

		&:active {
			background-color: var(--highlight);
		}

		&:focus-visible {
			outline: 2px solid var(--highlight);
			outline-offset: 2px;
		}
	}
</style>
