'use client';

import { AtlusForm } from '@/components/ui/form/atlus-form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode } from 'react';

export interface ShareBuyerForm {
  emails: string[];
  message: string;
}

const schema: ObjectSchema<ShareBuyerForm> = object({
  emails: array().min(1).required(RequiredField),
  message: string().optional().default(''),
});

interface ShareBuyerPackageFormProps {
  children: ReactNode;
}

export const ShareBuyerPackageForm = ({ children }: ShareBuyerPackageFormProps) => {
  const formProps = useAtlusForm<ShareBuyerForm>({
    formOptions: {
      resolver: yupResolver(schema),
    },
  });

  const { getValues } = formProps;
  console.log('getValues: ', getValues());
  return (
    <AtlusForm
      className="h-full"
      formProps={formProps}
      onSubmit={values => {
        console.log('formValues submit: ', values);
      }}
    >
      {children}
    </AtlusForm>
  );
};
