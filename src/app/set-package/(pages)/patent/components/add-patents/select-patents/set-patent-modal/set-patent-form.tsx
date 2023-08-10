import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { forwardRef, ReactNode, useCallback, useImperativeHandle } from 'react';
import { Patent } from '@/models/patent';
import { plainDateValidator } from '@/components/ui/form/validators/plain-date-validator';

const schema: ObjectSchema<Patent> = object({
  familyId: string().default('a').trim().required(RequiredField),
  publicationNumber: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  status: string().trim().required(RequiredField),
  applicationNumber: string().trim().required(RequiredField),
  applicantsOriginal: array().min(1,'Enter at least one assignee').required(RequiredField),
  applicationReferenceEpodoc: object({
    date: string().trim().required(RequiredField)
  }).required(RequiredField).test(plainDateValidator)
});

interface SetPatentForm {
  children: ReactNode;
  initialValues?: Patent;
  onSubmit?: (patent: Patent) => void;
}

export interface SetPatentRefExposedProps {
  submitForm: () => Promise<void>;
}

export const SetPatentForm = forwardRef<
  SetPatentRefExposedProps,
  SetPatentForm
>(function SetPatentForm({ initialValues, children, onSubmit }, ref) {

  const formProps = useAtlusForm<Patent>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialValues
    }
  });

  const { handleSubmit, formState: { isValid } } = formProps;

  const onFormSubmit = useCallback((formValues: Patent) => {
    onSubmit?.(formValues);
  }, [onSubmit]);

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: handleSubmit(onFormSubmit)
      };
    },
    [handleSubmit, onFormSubmit]
  );

  return (
    <AtlusForm formProps={formProps} onSubmit={onFormSubmit}>
      {children}
    </AtlusForm>
  );
});
