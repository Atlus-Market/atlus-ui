'use client';

import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { showErrorNotification } from '@/components/ui/notification/atlus-notification';

interface ApiClientProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient();

axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  console.error('API ERROR: ', error);

  if (error.response?.status === HttpStatusCode.Unauthorized) {
    const errorMessage = 'Invalid session. Please login again';
    showErrorNotification({ text: errorMessage, toastId: 'invalid-session-toast-id' });
    (window as Window).location = '/logout';
  } else if (error.response?.data) {
    const errorMessage = error.response.data.error || error.response.data.msg;
    showErrorNotification({ text: errorMessage, toastId: error.config.url });
  } else if (!error.response) {
    console.error(error);
    if (error.code === AxiosError.ERR_CANCELED) {
      return;
    }
    showErrorNotification({ text: 'Something went wrong.', toastId: error.code });
  }

  return Promise.reject(error);
});

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
