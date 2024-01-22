<script lang="ts">
	import { encodeDecodeMessage } from '../../lib/enigmaService';
	import type { EnigmaSettings } from '../../lib/types';

	let message = '';
	let responseMessage = '';
	let rotor1Position = '';
	let rotor2Position = '';
	let rotor3Position = '';
	let swapFrom = '';
	let swapTo = '';

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	const submitForm = async () => {
		const settings: EnigmaSettings = {
			rotor1Position,
			rotor2Position,
			rotor3Position,
			plugboardSwaps: swapFrom && swapTo ? { [swapFrom]: swapTo } : {}
		};

		try {
			const response = await encodeDecodeMessage({ message, settings });
			responseMessage = response.encodedMessage; // Store the response
		} catch (error) {
			console.error('Error encoding/decoding message:', error);
			responseMessage = 'Error: ' + error;
		}
	};
</script>

<form on:submit|preventDefault={submitForm} class="p-4 bg-yellow-500 rounded-lg shadow">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
		<div>
			<label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
			<input
				type="text"
				id="message"
				bind:value={message}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>

		<div>
			<label for="rotor1" class="block text-sm font-medium text-gray-700">Rotor 1 Position:</label>
			<input
				type="text"
				id="rotor1"
				bind:value={rotor1Position}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>

		<div>
			<label for="rotor2" class="block text-sm font-medium text-gray-700">Rotor 2 Position:</label>
			<input
				type="text"
				id="rotor2"
				bind:value={rotor2Position}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>

		<div>
			<label for="rotor3" class="block text-sm font-medium text-gray-700">Rotor 3 Position:</label>
			<input
				type="text"
				id="rotor3"
				bind:value={rotor3Position}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>
	</div>

	<label for="swapFrom">Plugboard Swap From:</label>
	<select bind:value={swapFrom} id="swapFrom" class="input input-bordered w-full mb-4">
		<option value="">Select a letter</option>
		{#each alphabet as letter}
			<option value={letter}>{letter}</option>
		{/each}
	</select>

	<label for="swapTo">Plugboard Swap To:</label>
	<select bind:value={swapTo} id="swapTo" class="input input-bordered w-full mb-4">
		<option value="">Select a letter</option>
		{#each alphabet as letter}
			<option value={letter}>{letter}</option>
		{/each}
    </select>

	<div><button type="submit" class="btn btn-primary">Encode/Decode</button>
</form>

{#if responseMessage}
	<div class="alert alert-info mt-4">
		<h2>Response:</h2>
		<p>{responseMessage}</p>
	</div>
{/if}
