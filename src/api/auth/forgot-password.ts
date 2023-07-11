import { createRequest, ProtectedEndpoint } from '@/api/api';

interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = (forgotPasswordPayload: ForgotPasswordPayload): Promise<void> => {
  return createRequest<ForgotPasswordPayload, void>('/password/reset', 'POST', ProtectedEndpoint.False, forgotPasswordPayload);
};
