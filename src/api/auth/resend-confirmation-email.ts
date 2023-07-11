import { createRequest, ProtectedEndpoint } from '@/api/api';

interface ResendConfirmationEmailPayload {
  email: string;
}

export const resendConfirmationEmail = (resendConfirmationEmailPayload: ResendConfirmationEmailPayload): Promise<void> => {
  return createRequest<ResendConfirmationEmailPayload, void>('/user/resend-confirmation', 'POST', ProtectedEndpoint.False, resendConfirmationEmailPayload);
};
