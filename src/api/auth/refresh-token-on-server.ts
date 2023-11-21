import 'server-only';
import axios, { AxiosResponse } from 'axios';
import { createUrl } from '@/api/api';
import { getServerAuthHeaders } from '@/api/api-server';

export const refreshToken = async (): Promise<void> => {
  await axios<void, AxiosResponse<Response>>({
    method: 'GET',
    url: createUrl('/refresh'),
    headers: await getServerAuthHeaders(),
    withCredentials: true,
  });
};
