'use client';

import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/ui/notification/atlus-notification';
import { useRouter } from 'next/navigation';
import { DashboardRoute } from '@/constants/routes';
import { useEffect } from 'react';

interface PackageRedirectStatusProps {
  message: string;
  result: boolean;
}

export const PackageRedirectStatus = ({ result, message }: PackageRedirectStatusProps) => {
  const router = useRouter();

  useEffect(() => {
    if (result) {
      showSuccessNotification({ text: message });
    } else {
      showErrorNotification({ text: message });
    }

    router.push(DashboardRoute);
  }, []);

  return null;
};
