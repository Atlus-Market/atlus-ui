'use client';

import { useOnboardingContext } from '@/app/onboarding/context/use-onboarding-context';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/user/create-user';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createCreateUserPayload
} from '@/app/onboarding/buyer/create-account/utils/create-user-payload';
import { useRouter } from 'next/navigation';
import {
  CreateBrokerAccountForm
} from '@/app/onboarding/broker/create-account/components/create-broker-account-form';
import {
  CreateBuyerAccountForm
} from '@/app/onboarding/buyer/create-account/components/create-buyer-account-form';
import { saveOnboardingEmail } from '@/services/auth-service';


export interface UserAccountForm {
  firstName: string;
  lastName: string;
  companyName: string;
  title?: string;
  businessPhone: string;
  email: string;
  password: string;
}

export interface CreateAccountRefExposedProps {
  submitForm: () => Promise<void>;
}

interface CreateUserAccountProps {
  formCmp: typeof CreateBrokerAccountForm | typeof CreateBuyerAccountForm;
}

export const CreateUserAccount = ({ formCmp: FormCmp }: CreateUserAccountProps) => {
  const formRef = useRef<CreateAccountRefExposedProps | null>(null);
  const onboardingContext = useOnboardingContext();
  const router = useRouter();
  const [formValues, setFormValues] = useState<UserAccountForm | undefined>(undefined);

  const mutation = useMutation({
    mutationFn: createUser
  });

  const { isLoading: isLoadingMutation, isSuccess, isError } = mutation;
  const { isCreatingAccount, updateContext, createAccountFormSubmitter } =
    onboardingContext;

  useEffect(() => {
    if (isCreatingAccount === isLoadingMutation) {
      return;
    }
    updateContext({
      isCreatingAccount: isLoadingMutation
    });
  }, [isCreatingAccount, isLoadingMutation, updateContext]);

  const createAccount = useCallback(
    (formValues: UserAccountForm) => {
      setFormValues(formValues);
      const createUserPayload = createCreateUserPayload(
        onboardingContext,
        formValues
      );
      mutation.mutate(createUserPayload);
    },
    [onboardingContext, mutation]
  );

  useEffect(() => {
    if (isSuccess) {
      saveOnboardingEmail(formValues?.email || '');
      router.push('verify-email');
    } else if (isError) {
      const errorMessage = 'Something went wrong while creating the user';
      // alert(errorMessage);
      console.error(errorMessage);
    }
  }, [isSuccess, isError, router, formValues]);

  useEffect(() => {
    updateContext({
      createAccountFormSubmitter: () => {
        formRef.current?.submitForm();
      }
    });
  }, []);

  return (
    <div className='max-w-[360px] mx-auto'>
      <FormCmp onSubmit={createAccount} ref={formRef} />
    </div>
  );
};
