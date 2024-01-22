<script lang="ts">
	import { breakEnigma, interruptBombe } from '../../lib/bombeService';
	import type { BombeResponse, BombeErrorResponse, BombeStatus } from '../../lib/types';
	import { onMount, onDestroy } from 'svelte';
	import { Client } from '@stomp/stompjs';

	let encodedMessage = '';
	let searchPhrase = '';
	let stompClient: Client;
	let bombeStatusMessages: BombeStatus[] = [];

	const totalSettings = 5712200;
	const totalSettingsPretty = '5,712,200';

	let bombeResponse: BombeResponse | BombeErrorResponse | null = null;

	onMount(() => {
		connect();
		return () => {
			disconnect();
		};
	});

	function connect() {
		stompClient = new Client({
			brokerURL: 'ws://localhost:8081/bombe-status', // Update this to your WebSocket URL
			onConnect: () => {
				console.log('Connected to STOMP over WebSocket');
				stompClient.subscribe('/topic/bombe-status', (message) => {
					let status: BombeStatus = JSON.parse(message.body);
					bombeStatusMessages = [status];
				});
			}
			// Add other necessary configurations such as onDisconnect, debug, etc.
		});

		stompClient.activate();
	}

	function disconnect() {
		if (stompClient) {
			stompClient.deactivate();
			console.log('Disconnected from STOMP over WebSocket');
		}
	}

	function calculateProgress(status: BombeStatus) {
        let attempts = parseInt(status.numberOfAttempts.replace(/,/g, ''));
        let progress = (attempts / totalSettings) * 100;
        return progress
	}

	const submitForm = async () => {
        bombeStatusMessages = [];
    bombeResponse = null;
		try {
			const response = await breakEnigma({ encodedMessage, searchPhrase });
			bombeResponse = response; // Store the response
		} catch (error) {
			console.error('Error breaking Enigma:', error);
			bombeResponse = { error: 'Error: ' + error };
		}
	};

	const interrupt = async () => {
		try {
			await interruptBombe();
			console.log('Bombe process interrupted');
		} catch (error) {
			console.error('Error interrupting Bombe:', error);
		}
	};
</script>

<form on:submit|preventDefault={submitForm} class="p-4 bg-gray-100 rounded-lg shadow">
	<div class="grid grid-cols-1 gap-4 mb-4">
		<div>
			<label for="encodedMessage" class="block text-sm font-medium text-gray-700"
				>Encoded Message:</label
			>
			<input
				type="text"
				id="encodedMessage"
				bind:value={encodedMessage}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>

		<div>
			<label for="searchPhrase" class="block text-sm font-medium text-gray-700"
				>Search Phrase:</label
			>
			<input
				type="text"
				id="searchPhrase"
				bind:value={searchPhrase}
				class="mt-1 block w-full input input-bordered"
			/>
		</div>
	</div>

	<div class="flex justify-start gap-2">
		<button type="submit" class="btn btn-secondary">Break Enigma</button>
		<button type="button" on:click={interrupt} class="btn btn-accent">Interrupt Bombe</button>
	</div>
</form>

{#each bombeStatusMessages as status (status.numberOfAttempts)}
	<div>
		<!-- Progress Bar -->
		<progress class="progress progress-primary w-56" value={calculateProgress(status)} max="100"></progress>
		<!-- Optionally display the numerical progress -->
		<p class="text-sm text-gray-600 mt-2">
			Attempts: {status.numberOfAttempts} / {totalSettingsPretty} ({calculateProgress(
				status
			).toFixed(2)}%)
		</p>
	</div>
{/each}

{#if bombeResponse && 'settings' in bombeResponse}
	<div class="response mt-4">
		<h2 class="font-bold">Bombe Response:</h2>
		<p>Decoded Message: {bombeResponse.decodedMessage}</p>
		<p>Number of Attempts: {bombeResponse.numberOfAttempts}</p>
		<p>Elapsed Time: {bombeResponse.elapsedTime}</p>
		<p>Status: {bombeResponse.bombeResultStatus}</p>
		<div class="mt-4">
			<h3 class="font-semibold">Discovered Enigma Settings:</h3>
			<p>Rotor 1 Position: {bombeResponse.settings.rotor1Position}</p>
			<p>Rotor 2 Position: {bombeResponse.settings.rotor2Position}</p>
			<p>Rotor 3 Position: {bombeResponse.settings.rotor3Position}</p>
			<p>Plugboard Swaps: {JSON.stringify(bombeResponse.settings.plugboardSwaps)}</p>
		</div>
	</div>
{:else if bombeResponse && 'error' in bombeResponse}
	<div class="alert alert-error mt-4">
		<p>{bombeResponse.error}</p>
	</div>
{/if}
