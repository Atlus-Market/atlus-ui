'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import clsx from 'clsx';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import { useFormStatus } from 'react-dom';
import { MouseEvent } from 'react';

interface PackageWatchlistButtonProps {
  isWatched: boolean;
}

const stopEventPropagation = (e: MouseEvent | undefined) => {
  e?.stopPropagation();
};

export const PackageWatchlistButton = ({ isWatched }: PackageWatchlistButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <AtlusButton
      className={clsx({
        'atlus-btn-36': !pending,
      })}
      isLoading={pending}
      iconOnlyIcon={isWatched ? <HiStar className="text-orange" /> : <HiOutlineStar />}
      variant="icon-only"
      color={pending ? 'orange' : 'grey'}
      onClick={stopEventPropagation}
    />
  );
};
