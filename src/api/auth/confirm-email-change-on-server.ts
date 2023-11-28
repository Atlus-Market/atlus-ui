import 'server-only';
import { createRequest, getResponseData } from '@/api/api';
import { LoginResponse } from '@/api/auth/login';
import { getServerAuthHeaders } from '@/api/api-server';

interface ConfirmEmailChangePayload {
  confirmationToken: string;
}

export type ConfirmEmailChangeResponse = LoginResponse;

export const confirmEmailChangeOnServer = async ({
  confirmationToken,
}: ConfirmEmailChangePayload): Promise<ConfirmEmailChangeResponse> => {
  return createRequest<void, LoginResponse>({
    url: `/confirm-email-change/${confirmationToken}`,
    headers: await getServerAuthHeaders(),
    method: 'GET',
  }).then(getResponseData);
};
