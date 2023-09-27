import 'server-only';
import { createUrl } from '@/api/api';
import axios, { AxiosResponse } from 'axios';
import { getServerAuthHeaders } from '@/api/api-server';

export const logout = async (): Promise<void> => {
  await axios<void, AxiosResponse<Response>>({
    method: 'GET',
    url: createUrl('/logout'),
    headers: await getServerAuthHeaders(),
    withCredentials: true,
  });
};
