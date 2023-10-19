'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FooterProps {
  nextBtnText?: string;
  shouldSkip?: boolean;
  nextUrl?: string;

  // Does not stop next page navigation if there is a nextUrl
  onNextClick?: () => void;
  nextBtnType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  isNextBtnLoading?: boolean;
}

export const Footer = ({
  shouldSkip,
  nextBtnText = 'Next',
  nextUrl,
  onNextClick,
  nextBtnType = 'button',
  isNextBtnLoading = false,
}: FooterProps) => {
  const router = useRouter();
  return (
    <footer className={clsx('flex justify-between md:justify-center', 'px-6 pt-[15px] pb-4')}>
      <AtlusButton variant="clear" className="mr-[52px]" onClick={() => router.back()}>
        Back
      </AtlusButton>
      <AtlusButton
        className={shouldSkip ? '!bg-middle-grey' : ''}
        type={nextBtnType}
        isLoading={isNextBtnLoading}
        onClick={() => {
          onNextClick?.();
          if (nextUrl) {
            router.push(nextUrl);
          }
        }}
      >
        {shouldSkip ? 'Skip' : nextBtnText}
      </AtlusButton>
    </footer>
  );
};
