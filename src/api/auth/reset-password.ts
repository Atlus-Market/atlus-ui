import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

interface ResetPasswordPayload {
  password: string;
}

export const resetPassword = (
  resetPasswordToken: string,
  resetPasswordPayload: ResetPasswordPayload
): Promise<void> => {
  return createRequest<ResetPasswordPayload, void>({
    url: `/password/reset/${resetPasswordToken}`,
    method: 'POST',
    isProtected: ProtectedEndpoint.False,
    payload: resetPasswordPayload,
  }).then(getResponseData);
};
