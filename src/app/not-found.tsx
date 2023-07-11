'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootRoute } from '@/constants/routes';

export default async function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(RootRoute);
  }, [router]);

  return null;
}
