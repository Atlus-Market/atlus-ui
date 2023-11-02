import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  console.log('revalidating packages...');
  revalidatePath('/package/[id]');
  revalidatePath('/dashboard');
  return new Response();
}
