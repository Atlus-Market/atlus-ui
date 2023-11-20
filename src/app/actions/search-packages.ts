'use server';

import { redirect } from 'next/navigation';
import { searchPackagesQueryParam } from '@/constants/search-packages';
import { SearchRoute } from '@/constants/routes';
import { searchName } from '@/app/search/consts';

const createSearchRoute = (query: string): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append(searchPackagesQueryParam, query);
  return `${SearchRoute}?${urlSearchParams.toString()}`;
};

export const searchPackagesAction = async (formData: FormData) => {
  const query = (formData.get(searchName) as string) ?? '';
  console.log('Server action: searching for packages query:', query);
  redirect(createSearchRoute(query));
};
