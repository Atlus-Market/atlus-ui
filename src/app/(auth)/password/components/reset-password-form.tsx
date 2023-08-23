'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { passwordValidator } from '@/components/ui/form/validators/password-validator';
import { AtlusErrorMessage } from '@/components/ui/error-message/atlus-error-message';
import { AtlusFormInputPassword } from '@/components/ui/form/atlus-form-input-password';

export interface ResetPasswordFormSchema {
  password: string;
}

const schema: ObjectSchema<ResetPasswordFormSchema> = object({
  password: string().trim().required(RequiredField).test(passwordValidator)
});

interface ResetPasswordFormProps {
  onSubmit: (formValues: ResetPasswordFormSchema) => void;
  isLoading: boolean;
  errorMessage?: string;
}

export const ResetPasswordForm = ({
                                    onSubmit,
                                    isLoading,
                                    errorMessage
                                  }: ResetPasswordFormProps) => {
  const formProps = useAtlusForm<ResetPasswordFormSchema>({
    formOptions: {
      resolver: yupResolver(schema)
    }
  });
  const { register } = formProps;

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormInputPassword
        label='New password'
        placeholder='Set a password'
        type='password'
        {...register('password')}
      />

      <AtlusErrorMessage errorMessage={errorMessage} />

      <div className='text-center'>
        <AtlusButton className='my-8 md:my-12' type='submit' isLoading={isLoading}>
          Reset password
        </AtlusButton>
      </div>
    </AtlusForm>
  );
};
