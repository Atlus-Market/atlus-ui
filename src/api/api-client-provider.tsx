'use client';

import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { showErrorNotification } from '@/components/ui/notification/atlus-notification';
import { LogoutRoute } from '@/constants/routes';
import { StatusCodes } from 'http-status-codes';
import { defaultErrorMessage } from '@/constants/api';

interface ApiClientProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient();

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error) {
      return;
    }

    console.error('API ERROR: ', error);

    if (!error.response || error.response.status >= StatusCodes.INTERNAL_SERVER_ERROR) {
      if (error.code === AxiosError.ERR_CANCELED) {
        return Promise.reject(error);
      }
      showErrorNotification({
        text: defaultErrorMessage,
        toastId: error.code,
      });
    } else if (error.response?.status === HttpStatusCode.Unauthorized) {
      const errorMessage = 'Invalid session. Please login again';
      showErrorNotification({
        text: errorMessage,
        toastId: 'invalid-session-toast-id',
      });
      (window as Window).location = LogoutRoute;
    } else if (error.response?.data) {
      const errorMessage =
        error.response.data.error || error.response.data.msg || defaultErrorMessage;
      showErrorNotification({ text: errorMessage, toastId: error.config.url });
    }

    return Promise.reject(error);
  }
);

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
