'use client';

import { AtlusSearchBar } from '@/components/common/search/atlus-search-bar';
import { KeyboardEvent, useCallback } from 'react';
import { isEnterKeyEvent } from '@/utils/keyboard';
import { useRouter } from 'next/navigation';
import { SearchRoute } from '@/constants/routes';
import { useAtlusUser } from '@/app/(auth)/session/use-atlus-user';

const createSearchRoute = (query: string): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('q', query);
  return `${SearchRoute}?${urlSearchParams.toString()}`;
};

export const SearchPackagesBar = () => {
  const user = useAtlusUser();
  const router = useRouter();
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement> | null) => {
      if (e && isEnterKeyEvent(e)) {
        const inputValue = (e.target as HTMLInputElement).value;
        console.log('Searching for ', inputValue);
        router.push(createSearchRoute(inputValue));
      }
    },
    [router]
  );

  if (!user) {
    return null;
  }

  return <AtlusSearchBar placeholder="Search for packages" onKeyDown={onKeyDown} />;
};
