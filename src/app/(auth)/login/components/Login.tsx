'use client';

import { LoginForm, LoginFormSchema } from '@/app/(auth)/login/components/login-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveOnboardingEmail } from '@/services/auth.service';
import { VerifyEmailRoute } from '@/constants/routes';
import { StatusCodes } from 'http-status-codes';
import { getRedirectUrl } from '@/app/(auth)/login/login.utils';
import { SignInResponse } from '@/api/auth/login';

export const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();
  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    setErrorMessage(undefined);
    setIsLoggingIn(true);
    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
      // callbackUrl: getRedirectUrl(window.location.search),
    });

    if (signInResult && signInResult.error) {
      setIsLoggingIn(false);
      try {
        const signInResponse = JSON.parse(signInResult?.error) as SignInResponse;
        if (signInResponse.status === StatusCodes.FORBIDDEN) {
          saveOnboardingEmail(email);
          router.replace(VerifyEmailRoute);
          setErrorMessage(signInResponse.data.msg);
        } else {
          setErrorMessage('Your username or password is incorrect');
        }
      } catch (localError) {
        console.error('Error trying to parse error response: ', localError);
      }
      return;
    }

    router.push(getRedirectUrl(window.location.search));
  };
  return <LoginForm onSubmit={onSubmit} errorMessage={errorMessage} isSubmitting={isLoggingIn} />;
};
