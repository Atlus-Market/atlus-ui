'use client';

import { AtlusSearchBar } from '@/components/common/search/atlus-search-bar';
import { FormEvent, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchRoute } from '@/constants/routes';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';
import { searchPackagesQueryParam } from '@/constants/search-packages';

const createSearchRoute = (query: string): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append(searchPackagesQueryParam, query);
  return `${SearchRoute}?${urlSearchParams.toString()}`;
};

const searchName = 'query';

export const SearchPackagesBar = () => {
  const { data: user } = useAtlusUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const query = (formData.get(searchName) as string) ?? '';
      router.push(createSearchRoute(query));
    },
    [router]
  );

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <AtlusSearchBar
        placeholder="Search for packages"
        name={searchName}
        initialValue={searchParams.get(searchPackagesQueryParam) ?? ''}
      />
      <input type="hidden" />
    </form>
  );
};
