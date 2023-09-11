import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode } from 'react';
import { Patent } from '@/models/patent';
import { plainDateValidator } from '@/components/ui/form/validators/plain-date-validator';
import { CustomPatentPayload } from '@/api/package/create-package';
import { mapCustomPatentToPatent, mapPatentToCustomPatentPayload } from '@/utils/patents';

const schema: ObjectSchema<CustomPatentPayload> = object({
  title: string().trim().required(RequiredField),
  status: string().trim().required(RequiredField),
  applicationNumber: string().trim().required(RequiredField),
  patentNumber: string().default('').required(RequiredField),
  assignee: string().required(RequiredField),
  applicationDate: string().trim().required(RequiredField).test(plainDateValidator),
});

// @ts-ignore
window.patentSchema = schema;

interface SetPatentForm {
  children: ReactNode;
  initialValues?: Patent;
  onSubmit: (patent: Patent) => void;
}

export const SetPatentForm = ({ initialValues, children, onSubmit }: SetPatentForm) => {
  const initialCustomPatent = initialValues && mapPatentToCustomPatentPayload(initialValues);
  const formProps = useAtlusForm<CustomPatentPayload>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialCustomPatent && initialCustomPatent,
    },
  });

  const {
    formState: { errors },
  } = formProps;
  console.log('SetPatent initialValues; ', initialCustomPatent);
  console.log('SetPatent FormError; ', errors);

  const onFormSubmit = (customPatent: CustomPatentPayload) => {
    onSubmit(mapCustomPatentToPatent(customPatent));
  };

  return (
    <AtlusForm formProps={formProps} onSubmit={onFormSubmit}>
      {children}
    </AtlusForm>
  );
};
