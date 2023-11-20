'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { useGetSearchbarInput } from '@/app/search/components/use-get-searchbar-input';

export const SetInputInitialValue = () => {
  const searchParams = useSearchParams();
  const input = useGetSearchbarInput();

  useEffect(() => {
    if (!input) {
      return;
    }
    input.value = searchParams.get(searchPackagesQueryParam) ?? '';
  }, [input, searchParams]);

  return null;
};
