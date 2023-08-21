'use client';

import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import axios, { HttpStatusCode } from 'axios';
import { showErrorNotification } from '@/components/ui/notification/atlus-notification';

interface ApiClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response.status === HttpStatusCode.Unauthorized) {
    const errorMessage = 'Invalid session. Please login again';
    showErrorNotification({ text: errorMessage, toastId: 'invalid-session-toast-id' });
    (window as Window).location = '/logout';
  }
  return Promise.reject(error);
});

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
