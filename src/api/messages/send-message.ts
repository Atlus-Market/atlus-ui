import { createRequest, ProtectedEndpoint } from '@/api/api';
import { AddContactPayload } from '@/api/contacts/add-contact';
import { sleep } from '@/utils/sleep';

export interface SendMessageRequestPayload {
  message: string;
}

export const sendMessage = async (
  messageRequestPayload: SendMessageRequestPayload
): Promise<void> => {
  await sleep(2000);
  // throw new Error('a');
  return;
  // return createRequest<SendMessageRequestPayload, void>({
  //   url: `/message/package`, // TODO: change this url to correct one
  //   method: 'POST',
  //   isProtected: ProtectedEndpoint.True,
  // });
};
