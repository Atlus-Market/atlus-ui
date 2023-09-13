'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserType } from '@/models/user-type';
import { getOnboardingEmail } from '@/services/auth.service';
import { useEffect } from 'react';
import { LoginRoute } from '@/constants/routes';
import { SendVerificationEmailButton } from '@/app/onboarding/components/send-verification-email-button';

const brokerText =
  'You’re almost there! We sent a verification link to your email. ' +
  'Click on the link to start setting up packages, generate new leads, and close deals faster.';

const buyerText =
  'You’re almost there! We sent a verification link to your email. Click on' +
  ' the link to start discovering new packages, negotiate privately, and' +
  ' close deals faster from your dashboard.';

export const SendVerificationEmail = () => {
  const params = useParams();
  const router = useRouter();
  const isBroker = (params['user-type'] as UserType) === 'broker';

  useEffect(() => {
    const email = getOnboardingEmail();
    if (!email) {
      router.replace(LoginRoute);
    }
  }, [router]);

  return (
    <>
      <h4 className="text-sm md:text-base font-normal text-center mb-12">
        {isBroker ? brokerText : buyerText}
      </h4>
      <SendVerificationEmailButton />
    </>
  );
};
