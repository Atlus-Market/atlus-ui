'use client';

import { ReactNode } from 'react';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

interface ApiClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
