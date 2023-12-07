'use client';
import { useFormStatus } from 'react-dom';
import { AtlusLoadingSpinner } from '@/components/ui/loading-spinner/atlus-loading-spinner';

export const SearchingPackagesLoader = () => {
  const status = useFormStatus();

  if (status.pending) {
    return <AtlusLoadingSpinner size={20} />;
  }

  return null;
};
