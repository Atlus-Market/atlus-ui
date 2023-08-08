import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { array, object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { forwardRef, ReactNode, useCallback, useImperativeHandle } from 'react';
import { Patent } from '@/models/patent';
import { plainDateValidator } from '@/components/ui/form/validators/plain-date-validator';

const schema: ObjectSchema<Patent> = object({
  familyId: string().trim().required(RequiredField),
  publicationNumber: string().trim().required(RequiredField),
  title: string().trim().required(RequiredField),
  status: string().trim().required(RequiredField),
  applicationNumber: string().trim().required(RequiredField),
  applicantsOriginal: array().required(RequiredField),
  applicationReferenceEpodoc: object({
    date: string().trim().required(RequiredField)
  }).required(RequiredField).test(plainDateValidator)
});

interface SetPatentForm {
  children: ReactNode;
  initialValues?: Patent;
  onPatentSet?: (patent: Patent) => void;
}

export interface SetPatentRefExposedProps {
  submitForm: () => Promise<void>;
}

export const SetPatentForm = forwardRef<
  SetPatentRefExposedProps,
  SetPatentForm
>(function SetPatentForm({ initialValues, children, onPatentSet }, ref) {

  const formProps = useAtlusForm<Patent>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialValues
    }
  });

  const { handleSubmit } = formProps;

  const onSubmit = useCallback((formValues: Patent) => {
    onPatentSet?.(formValues);
  }, [onPatentSet]);

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: handleSubmit(onSubmit)
      };
    },
    [handleSubmit, onSubmit]
  );

  return (
    <AtlusForm formProps={formProps} onSubmit={onSubmit}>
      {children}
    </AtlusForm>
  );
});
