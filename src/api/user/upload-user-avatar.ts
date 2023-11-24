import { createRequest, ProtectedEndpoint } from '@/api/api';

export interface UploadUserAvatarPayload {
  avatar: File;
}

export const uploadUserAvatar = (payload: UploadUserAvatarPayload): Promise<void> => {
  const headers = {
    'content-type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('avatar', payload.avatar);

  return createRequest({
    url: '/user/avatar',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    headers,
    payload: formData,
  }).then(res => {
    console.log('Upload res: ', res.data);
  });
};
