import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { object, ObjectSchema, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { createPortal } from 'react-dom';

interface AtlusPhoneTestProps {
  children: ReactNode;
}

interface FormTest {
  phone: string;
}

const brokerSettingsSchema: ObjectSchema<FormTest> = object({
  phone: string().required('Required'),
});

export const AtlusPhoneTest = () => {
  const formProps = useForm<FormTest>({
    resolver: yupResolver(brokerSettingsSchema),
  });
  return (
    <div>
      {createPortal(
        <AtlusForm
          formProps={formProps}
          onSubmit={formValues => console.log(formValues)}
          className="w-full"
        >
          <AtlusFormInput {...formProps.register('phone')} />

          <AtlusButton type="submit">Submit</AtlusButton>
        </AtlusForm>,
        document.body
      )}
    </div>
  );
};
