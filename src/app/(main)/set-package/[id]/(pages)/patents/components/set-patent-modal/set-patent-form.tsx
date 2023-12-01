import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { ReactNode, useMemo } from 'react';
import { Patent } from '@/models/patent';
import {
  parseDateString,
  plainDateFormat,
  plainDateValidator,
} from '@/components/ui/form/validators/plain-date-validator';
import { CustomPatentPayload } from '@/api/package/create-package';
import { mapCustomPatentToPatent, mapPatentToCustomPatentPayload } from '@/utils/patents';
import format from 'date-fns/format';
import { parseGMTDate } from '@/utils/date';

const schema: ObjectSchema<CustomPatentPayload> = object({
  title: string().trim().required(RequiredField),
  status: string().trim().required(RequiredField),
  applicationNumber: string().trim().required(RequiredField),
  patentNumber: string().default('').required(RequiredField),
  assignee: string().required(RequiredField),
  applicationDate: string()
    .trim()
    .required(RequiredField)
    .test(plainDateValidator)
    .transform(parseDateString),
});

interface SetPatentForm {
  children: ReactNode;
  initialValues?: Patent;
  onSubmit: (patent: Patent) => void;
}

export const SetPatentForm = ({ initialValues, children, onSubmit }: SetPatentForm) => {
  const initialCustomPatentValues = useMemo(() => {
    const customPatentPayload = initialValues && mapPatentToCustomPatentPayload(initialValues);
    if (customPatentPayload?.applicationDate) {
      const applicationDate = parseGMTDate(customPatentPayload.applicationDate);
      if (applicationDate) {
        customPatentPayload.applicationDate = format(applicationDate, plainDateFormat);
      }
    }
    return customPatentPayload;
  }, [initialValues]);

  const formProps = useAtlusForm<CustomPatentPayload>({
    formOptions: {
      resolver: yupResolver(schema),
      defaultValues: initialCustomPatentValues && initialCustomPatentValues,
    },
  });

  const {
    formState: { errors },
  } = formProps;
  console.log('SetPatent initialValues; ', initialCustomPatentValues);
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
