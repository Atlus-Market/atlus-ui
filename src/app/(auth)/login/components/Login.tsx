'use client';

import { LoginForm, LoginFormSchema } from '@/app/(auth)/login/components/login-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { SignInResponse } from '@/api/auth/login';
import { saveOnboardingEmail } from '@/services/auth.service';
import { DashboardRoute, VerifyEmailRoute } from '@/constants/routes';

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
    });

    if (signInResult?.error) {
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

    router.replace(DashboardRoute);
  };
  return <LoginForm onSubmit={onSubmit} errorMessage={errorMessage} isSubmitting={isLoggingIn} />;
};
