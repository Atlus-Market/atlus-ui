import 'server-only';
import { Dataroom } from '@/models/dataroom';
import { getServerAuthHeaders } from '@/api/api-server';
import { getDataroom } from '@/api/dataroom/get-dataroom';

export const getDataroomOnServer = async (dataroomId: string): Promise<Dataroom> => {
  return getDataroom(dataroomId, { headers: await getServerAuthHeaders() });
};
