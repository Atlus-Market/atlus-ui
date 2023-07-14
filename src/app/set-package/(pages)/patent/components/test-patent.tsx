'use client';

import { useMutation } from '@tanstack/react-query';
import { createRequest, ProtectedEndpoint } from '@/api/api';

export const TestPatent = () => {
  const { mutateAsync } = useMutation({
    mutationFn: () => createRequest('/patent/US10609611B2', 'GET', ProtectedEndpoint.True)
  });
  return (
    <div>
      <button onClick={() => {
        mutateAsync();
      }}>Get Patent
      </button>
    </div>
  );
};
