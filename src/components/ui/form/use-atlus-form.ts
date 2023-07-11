import { FieldValues, useForm } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form/dist/types/form';

interface AtlusFormProps<TFieldValues extends FieldValues> {
  // useForm options from react-hook-form
  formOptions?: UseFormProps<TFieldValues>;
}

export const useAtlusForm = <T extends FieldValues>(
  props?: AtlusFormProps<T>
) => {
  return useForm({
    mode: 'onTouched',
    ...props?.formOptions,
  });
};
