import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface SendMessageRequestPayload {
  recipientId: string;
  packageId: string;
  content: string;
}

export const sendMessageToBroker = async (
  messageRequestPayload: SendMessageRequestPayload
): Promise<void> => {
  return createRequest<SendMessageRequestPayload, void>({
    url: '/messages/broker',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    data: messageRequestPayload,
  });
};
