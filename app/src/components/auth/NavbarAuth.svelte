<script lang="ts">
	import PocketBase from 'pocketbase';
	import { authLinks } from '../../config/navbar';
	import type { TypedPocketBase } from '../../types/pocketbase-types.generated';

	const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;

	const onLogoutHandler = (e: MouseEvent) => {
		pb.authStore.clear();
		document.cookie = pb.authStore.exportToCookie({
			httpOnly: false,
			expires: new Date(0),
		});
		window.location.href = '/';
	};

	let authStore = $state(pb.authStore);

	// console.log('TEST 1');
	// pb.authStore.onChange((token, model) => {
	// 	console.log('TEST 2');
	// 	authStore = pb.authStore;
	// });

	// $inspect(authStore.isValid);
</script>

<ul class="grid gap-2 sm:flex sm:h-full">
	{#if authStore?.isValid && authStore?.record}
		<li class="grid justify-center">
			<a href={`/profile/${authStore.record?.id}`} class="">
				<img
					src={`http://127.0.0.1:8090/api/files/users/${authStore?.record.id}/${authStore?.record.avatar}`}
					class="aspect-square w-10 rounded-full"
					alt=""
				/>
			</a>
		</li>
		<li class="grid h-full">
			<button onclick={onLogoutHandler}>Logout</button>
		</li>
	{:else}
		<!-- {#each authLinks as link}
			<li class="grid h-full sm:flex">
				<a href={link.href} class="grid h-full place-items-center">
					<span>{link.label}</span>
				</a>
			</li>
		{/each} -->
	{/if}
</ul>
