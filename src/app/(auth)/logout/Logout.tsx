'use client';

import { useLogout } from '@/app/(auth)/logout/use-logout';
import { useEffect } from 'react';

export const Logout = () => {
  const { logout } = useLogout();
  useEffect(() => logout(), [logout]);
  return null;
};
