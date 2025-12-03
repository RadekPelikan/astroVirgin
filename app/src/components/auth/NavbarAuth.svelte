<script lang="ts">
	import PocketBase from 'pocketbase';
	const pb = new PocketBase('http://127.0.0.1:8090');

	const { avatar, id } = pb.authStore?.record;
  new Error()
</script>

<a href="" class="h-full aspect-square">
	<img src={`http://127.0.0.1:8090/api/files/users/${id}/${avatar}`} class="h-full" alt="" />
</a>
