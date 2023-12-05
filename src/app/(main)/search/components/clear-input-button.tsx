'use client';

import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiOutlineX } from 'react-icons/hi';
import { useGetSearchbarInput } from '@/app/(main)/search/components/use-get-searchbar-input';
import { useRouter } from 'next/navigation';
import { DashboardRoute } from '@/constants/routes';

export const ClearInputButton = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const input = useGetSearchbarInput();
  const router = useRouter();

  useEffect(() => {
    setInputValue(input?.value ?? '');
  }, [input?.value]);

  const debounceFn = useCallback(
    debounce(() => {
      setInputValue(input?.value ?? '');
    }, 200),
    [input]
  );

  const updateValue = useCallback(() => debounceFn(), [debounceFn]);

  useEffect(() => {
    if (!input) {
      return;
    }

    input.addEventListener('keyup', updateValue);

    return () => {
      input?.removeEventListener('keyup', updateValue);
    };
  }, [input, updateValue]);

  const clearInput = useCallback(() => {
    if (input) {
      input.value = '';
      setInputValue('');
    }
    router.push(DashboardRoute);
  }, [input, router]);

  const hasInputValue = inputValue?.length > 0;

  if (!hasInputValue) {
    return null;
  }

  return (
    <AtlusButton
      className="atlus-btn-22"
      iconOnlyIcon={<HiOutlineX className="text-middle-grey text-[20px]" />}
      variant="icon-only"
      color="grey"
      onClick={clearInput}
      type="button"
    />
  );
};