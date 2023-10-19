import { createRequest, getResponseData } from '@/api/api';

interface ConfirmEmailPayload {
  confirmationToken: string;
}

export const confirmEmail = ({ confirmationToken }: ConfirmEmailPayload): Promise<void> => {
  return createRequest<void, void>({
    url: `/user/confirm/${confirmationToken}`,
    method: 'GET',
  }).then(getResponseData);
};
