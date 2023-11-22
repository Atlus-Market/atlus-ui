import { trackEmailViewed } from '@/api/package/access/track-email-viewed';

interface GetEmailImages {
  customId: string;
}

export async function GET(request: Request, { params }: { params: GetEmailImages }) {
  try {
    const { customId } = params;
    console.log(`Tracking email view for: ${customId} [start]`);
    await trackEmailViewed(customId);
    console.log(`Tracking email view for: ${customId} [end]`);
  } catch (e) {
    console.error(`[error] Tracking email view for: ${params?.customId} [end]`);
    console.error(e);
  }
  return new Response();
}
