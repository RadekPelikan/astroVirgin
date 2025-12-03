<script lang="ts">
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('http://127.0.0.1:8090');

	let validationErrors = $state<string[]>([]);
	// $inspect(validationErrors);

	const fetchAvatarFile = async (url: string): Promise<File> => {
		const res = await fetch(url);
		const blob = await res.blob(); // convert response to blob
		return new File([blob], 'avatar.jpg', { type: blob.type }); // create a File object
	};

	const onSubmitHandler = async (e: SubmitEvent) => {
		e.preventDefault(); // prevent page reload

		const form = e.target as HTMLFormElement;
		const data = new FormData(form);
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const avatar = await fetchAvatarFile('https://avatar.iran.liara.run/public');

		pb.collection('users')
			.create({ email, password, passwordConfirm: password, avatar })
			.then((data) => {
				window.location.href = '/';
			})
			.catch((err) => {
				validationErrors = Object.values(err.response.data).map((e: any) => e.message);
			});
	};
</script>

<div>
	<form
		class="grid max-w-80 place-content-center gap-2 bg-sky-300 px-8 py-12"
		onsubmit={onSubmitHandler}
	>
		<input name="email" type="email" placeholder="Email" required />
		<input name="password" type="password" placeholder="Password" required />
		{#if validationErrors.length > 0}
			<ul class="grid gap-1 rounded-sm bg-red-500 px-3 py-1">
				{#each validationErrors as error}
					<li class="text-sm text-white">• {error}</li>
				{/each}
			</ul>
		{/if}
		<button type="submit">Register</button>
	</form>
</div>
