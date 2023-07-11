'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { AtlusFormInputPassword } from '@/components/ui/form/atlus-form-input-password';
import { AtlusErrorMessage } from '@/components/ui/error-message/atlus-error-message';
import { ForgotPassword, OnboardingSelectUser } from '@/constants/routes';

export interface LoginFormSchema {
  email: string;
  password: string;
}

const schema: ObjectSchema<LoginFormSchema> = object({
  email: string().trim().email().required(RequiredField),
  password: string().trim().required(RequiredField)
});

interface LoginFormProps {
  onSubmit: (formValues: LoginFormSchema) => void;
  errorMessage?: string;
}

export const LoginForm = ({ onSubmit, errorMessage }: LoginFormProps) => {
  const formProps = useAtlusForm<LoginFormSchema>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: {
        email: 'sergio+0.7947031469408283@toptal.com',
        password: 'fay$0FgTx7F8@9RW'
      }
    }
  });
  const { register, formState: { isSubmitting } } = formProps;

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormInput
        label='Email'
        placeholder='email'
        type='email'
        wrapperClassName='mb-[18px] md:mb-8'
        {...register('email')}
      />
      <AtlusFormInputPassword
        label='Password'
        placeholder='password'
        type='password'
        rightLabel={
          <Link
            href={ForgotPassword}
            className='text-orange text-[13px] md:text-sm leading-0'>
            Forgot password
          </Link>}
        {...register('password')}
      />

      <AtlusErrorMessage errorMessage={errorMessage} />

      <div className='text-center'>
        <AtlusButton className='my-8 md:my-12' type='submit' isLoading={isSubmitting}>
          Log in
        </AtlusButton>

        <div className='text-[13px] md:text-base font-medium'>
          <span className='text-dark-grey'>Don&apos;t have an account? </span>
          <Link href={OnboardingSelectUser} className='text-orange'>Sign up</Link>
        </div>
      </div>
    </AtlusForm>
  );
};
