import { createRequest } from '@/api/api';

interface ConfirmEmailPayload {
  confirmationToken: string;
}

export const confirmEmail = ({ confirmationToken }: ConfirmEmailPayload): Promise<void> => {
  return createRequest<void, void>(`/user/confirm/${confirmationToken}`, 'GET');
};
