<script lang="ts">
	import PocketBase from 'pocketbase';
	import { authLinks } from '../../config/navbar';
	import { onMount } from 'svelte';
	const pb = new PocketBase('http://127.0.0.1:8090');

	let isValid = $state(false)


	onMount(() => {
	console.log("mount");
		isValid = pb.authStore.isValid;
	})

	const onLogoutHandler = (e: MouseEvent) => {
		pb.authStore.clear();
		window.location.href = '/';
	};
</script>

<ul class="grid gap-2 sm:flex sm:h-full">
	{#if isValid}
		<li class="grid justify-center">
			<a href="" class="">
				<img
					src={`http://127.0.0.1:8090/api/files/users/${pb.authStore?.record.id}/${pb.authStore?.record.avatar}`}
					class="aspect-square w-10 rounded-full"
					alt=""
				/>
			</a>
		</li>
		<li class="grid h-full">
			<button onclick={onLogoutHandler}>Logout</button>
		</li>
	{:else}
		{#each authLinks as link}
			<li class="grid h-full sm:flex">
				<a href={link.href} class="grid h-full place-items-center">
					<span>{link.label}</span>
				</a>
			</li>
		{/each}
	{/if}
</ul>
