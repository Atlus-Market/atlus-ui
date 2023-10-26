'use client';

import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { object, ObjectSchema } from 'yup';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import Link from 'next/link';
import { AtlusErrorMessage } from '@/components/ui/error-message/atlus-error-message';
import { LoginRoute } from '@/constants/routes';
import { emailField } from '@/components/ui/form/validators/email-field';

export interface ForgotPasswordFormSchema {
  email: string;
}

const schema: ObjectSchema<ForgotPasswordFormSchema> = object({
  email: emailField,
});

interface ForgotFormProps {
  isLoading: boolean;
  errorMessage?: string;
  onSubmit: (formValues: ForgotPasswordFormSchema) => void;
}

export const ForgotPasswordForm = ({ onSubmit, errorMessage, isLoading }: ForgotFormProps) => {
  const formProps = useAtlusForm<ForgotPasswordFormSchema>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });
  const { register } = formProps;

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      <AtlusFormInput label="Email" placeholder="Enter email" type="email" {...register('email')} />

      <AtlusErrorMessage errorMessage={errorMessage} />

      <div className="text-center">
        <AtlusButton
          className="my-8 md:my-12"
          variant="solid"
          color="orange"
          type="submit"
          isLoading={isLoading}
        >
          Send reset link
        </AtlusButton>

        <div className="text-13 md:text-base font-medium">
          <span className="text-dark-grey">Back to </span>
          <Link href={LoginRoute} className="text-orange">
            Log in
          </Link>
        </div>
      </div>
    </AtlusForm>
  );
};
