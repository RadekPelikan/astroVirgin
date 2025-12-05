import PocketBase, { ClientResponseError } from 'pocketbase';
import type { TypedPocketBase } from '../types/pocketbase-types.generated';
import type { AstroGlobal } from 'astro';


export const isPocketBaseTokenValid = async (astro: AstroGlobal): Promise<boolean> => {

  const cookie = astro.cookies.get('pb_auth');
  const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;
  let isValid = false;
  if (cookie) {
    const { token } = JSON.parse(cookie?.value as any);
    pb.authStore.save(token, null);
    await pb.collection('users').authRefresh();
    isValid = pb.authStore.isValid;
    pb.authStore.clear();
  }
  return isValid;
}