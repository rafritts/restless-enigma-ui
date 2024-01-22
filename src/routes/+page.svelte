<script lang="ts">
	import Enigma from './enigma/Enigma.svelte';
	import Bombe from './bombe/Bombe.svelte';

	let activeMachine = 'Enigma';
</script>

<main class="flex justify-center">
	<div class="container mx-auto p-4 flex flex-col items-center">
		<h1 class="text-center text-3xl font-bold mb-8">Welcome to the Enigma and Bombe Interface</h1>

		<div class="mb-4">
			<button class="btn mr-2" on:click={() => (activeMachine = 'Enigma')}>Enigma Machine</button>
			<button class="btn" on:click={() => (activeMachine = 'Bombe')}>Bombe Machine</button>
		</div>

		{#if activeMachine === 'Enigma'}
			<section class="w-full md:w-3/4 lg:w-1/2 mb-8">
				<h2 class="text-2xl font-semibold mb-4">Enigma Machine</h2>
				<Enigma />
			</section>
		{:else if activeMachine === 'Bombe'}
			<section class="w-full md:w-3/4 lg:w-1/2">
				<h2 class="text-2xl font-semibold mb-4">Bombe Machine</h2>
				<Bombe />
			</section>
		{/if}
	</div>
</main>

<style>
	@import '../app.css';
</style>
