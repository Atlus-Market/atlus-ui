import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = (changePasswordPayload: ChangePasswordPayload): Promise<void> => {
  return createRequest<ChangePasswordPayload, void>({
    url: '/password/change',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    payload: changePasswordPayload,
  }).then(getResponseData);
};
