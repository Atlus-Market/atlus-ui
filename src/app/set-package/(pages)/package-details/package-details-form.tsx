import { object, ObjectSchema, string } from 'yup';
import { RequiredField } from '@/constants/form';
import { useAtlusForm } from '@/components/ui/form/use-atlus-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusForm } from '@/components/ui/form/atlus-form';
import { AtlusFormTextarea } from '@/components/ui/form/atlus-form-textarea';

export interface IPackageDetailsForm {
  title: string;
  description: string;
}

const schema: ObjectSchema<IPackageDetailsForm> = object({
  title: string().trim().required(RequiredField),
  description: string().trim().required(RequiredField)
});

export interface PackageDetailsFormProps {
  onSubmit: (formValues: IPackageDetailsForm) => void;
}

export const PackageDetailsForm = ({ onSubmit }: PackageDetailsFormProps) => {
  const formProps = useAtlusForm<IPackageDetailsForm>({
    formOptions: {
      resolver: yupResolver(schema)
    }
  });
  const { register, handleSubmit, formState: { errors } } = formProps;
  console.log(errors);
  return (
    <div>
      <AtlusForm formProps={formProps} onSubmit={onSubmit}>
        <AtlusFormInput
          label='Title'
          placeholder='Enter package title'
          type='text'
          {...register('title')}
        />

        <AtlusFormTextarea
          label='Description'
          placeholder='Write a description for your package'
          {...register('description')}
        />
      </AtlusForm>
    </div>
  );
};
