import { createRequest, getResponseData, ProtectedEndpoint } from '@/api/api';

export interface UploadUserCompanyLogoPayload {
  logo: File;
}

export const uploadUserCompanyLogo = (payload: UploadUserCompanyLogoPayload): Promise<void> => {
  const headers = {
    'content-type': 'multipart/form-data',
  };

  const formData = new FormData();
  formData.append('image', payload.logo);

  return createRequest<FormData, void>({
    url: '/user/company-image',
    method: 'POST',
    isProtected: ProtectedEndpoint.True,
    headers,
    payload: formData,
  }).then(getResponseData);
};
