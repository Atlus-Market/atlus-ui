'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { PageWrapper } from '@/components/common/page-wrapper';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useRouter } from 'next/navigation';
import { LoginRoute } from '@/constants/routes';
import { defaultErrorMessage } from '@/constants/api';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      {/*<Header />*/}
      <PageWrapper className="w-full text-center">
        <h2>{defaultErrorMessage}</h2>

        <AtlusButton
          variant="clear"
          color="orange"
          className="mb-4"
          onClick={() => router.replace(LoginRoute)}
        >
          Go to Home
        </AtlusButton>
      </PageWrapper>
    </div>
  );
}
