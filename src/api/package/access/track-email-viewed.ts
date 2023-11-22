import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export const trackEmailViewed = (customId: string) => {
  return createRequest<void, void>({
    url: `/package/email_viewed/${customId}`,
    method: 'GET',
    isProtected: ProtectedEndpoint.False,
  }).then(getResponseData);
};
