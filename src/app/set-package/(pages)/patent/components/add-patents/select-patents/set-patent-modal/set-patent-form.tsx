import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode } from 'react';
import { Patent } from '@/models/patent';
import { plainDateValidator } from '@/components/ui/form/validators/plain-date-validator';

const schema: ObjectSchema<Patent> = object({
  familyId: string().default('a').trim().required(RequiredField),
  publicationNumber: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  status: string().trim().required(RequiredField),
  applicationNumber: string().trim().required(RequiredField),
  applicantsOriginal: array().min(1, 'Enter at least one assignee').required(RequiredField),
  applicationReferenceEpodoc: object({
    date: string().trim().required(RequiredField)
  }).required(RequiredField).test(plainDateValidator)
});

interface SetPatentForm {
  children: ReactNode;
  initialValues?: Patent;
  onSubmit: (patent: Patent) => void;
}

export const SetPatentForm = ({ initialValues, children, onSubmit }: SetPatentForm) => {
  const formProps = useAtlusForm<Patent>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialValues
    }
  });

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
};
