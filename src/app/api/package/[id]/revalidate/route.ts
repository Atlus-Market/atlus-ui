import { revalidatePath } from 'next/cache';
import { PackagePageUrl } from '@/constants/routes';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const packageId = params.id;
  console.log(`revalidatingPath for package ${packageId} `);
  revalidatePath(PackagePageUrl(packageId), 'page');
  console.log(`revalidating patch for package ${packageId} finished!`);

  return new Response();
}
