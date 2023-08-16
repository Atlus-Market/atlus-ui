import { createRequest, ProtectedEndpoint } from '@/api/api';

interface ResendConfirmationEmailPayload {
  email: string;
}

export const resendConfirmationEmail = (resendConfirmationEmailPayload: ResendConfirmationEmailPayload): Promise<void> => {
  return createRequest<ResendConfirmationEmailPayload, void>({
    url: '/user/resend-confirmation',
    method: 'POST',
    isProtected: ProtectedEndpoint.False,
    payload: resendConfirmationEmailPayload
  });
};
