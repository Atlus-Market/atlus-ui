import { useLayoutEffect, useState } from 'react';
import { searchPackagesInputID } from '@/components/common/search/atlus-search-bar';

export const useGetSearchbarInput = () => {
  const [input, setInput] = useState<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    const searchInput = document.querySelector<HTMLInputElement>(`[id='${searchPackagesInputID}']`);
    if (!searchInput) {
      return;
    }
    setInput(searchInput);
  }, []);

  return input;
};
