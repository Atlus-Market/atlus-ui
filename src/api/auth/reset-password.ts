import { createRequest, ProtectedEndpoint } from '@/api/api';

interface ResetPasswordPayload {
  password: string;
}

export const resetPassword = (resetPasswordToken: string, resetPasswordPayload: ResetPasswordPayload): Promise<void> => {
  return createRequest<ResetPasswordPayload, void>(`/password/reset/${resetPasswordToken}`, 'POST', ProtectedEndpoint.False, resetPasswordPayload);
};
