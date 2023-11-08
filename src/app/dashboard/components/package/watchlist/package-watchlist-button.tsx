'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import clsx from 'clsx';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import { MouseEvent } from 'react';
import { useFormStatus } from 'react-dom';

interface PackageWatchlistButtonProps {
  isWatched: boolean;
}

const stopEventPropagation = (e: MouseEvent | undefined) => {
  e?.stopPropagation();
};

export const PackageWatchlistButton = ({ isWatched }: PackageWatchlistButtonProps) => {
  const { pending: isLoading } = useFormStatus();
  return (
    <AtlusButton
      className={clsx({
        'atlus-btn-36': !isLoading,
      })}
      isLoading={isLoading}
      iconOnlyIcon={isWatched ? <HiStar className="text-orange" /> : <HiOutlineStar />}
      variant="icon-only"
      color={isLoading ? 'orange' : 'grey'}
      onClick={stopEventPropagation}
    />
  );
};
