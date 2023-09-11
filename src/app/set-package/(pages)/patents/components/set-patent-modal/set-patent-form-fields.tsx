import { Controller, useFormContext } from 'react-hook-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { Patent } from '@/models/patent';
import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { statusOptions } from '@/components/common/dropdown/status-options';

interface SetPatentFormFieldsProps {
  allowEditPublicationNumber?: boolean;
}

export const SetPatentFormFields = ({
  allowEditPublicationNumber = true,
}: SetPatentFormFieldsProps) => {
  const formProps = useFormContext<Patent>();
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = formProps;
  console.log('SetPatentForm Errors: ', errors);

  return (
    <div>
      <AtlusFormInput label="Title" placeholder="Enter title" type="text" {...register('title')} />

      <div className="flex gap-6">
        <AtlusFormInput
          label="Application number"
          placeholder="US12345678B1"
          type="text"
          {...register('applicationNumber')}
          wrapperClassName="grow"
        />

        <AtlusFormInput
          label="Patent number"
          placeholder="US12345678B1"
          type="text"
          {...register('publicationNumber')}
          wrapperClassName="grow"
          disabled={!allowEditPublicationNumber}
        />
      </div>

      <AtlusFormDropdownList
        label="Status"
        placeholder="Select status"
        name="status"
        options={statusOptions}
        showDropdownIndicator
        isSearchable={false}
        wrapperClassName="w-[50%] pr-4"
      />

      <Controller
        name="applicants"
        control={control}
        render={({ field }) => (
          <AtlusInput
            {...field}
            label="Assignee"
            placeholder="Enter current assignee"
            type="text"
            value={field.value?.join('') ?? ''}
            errors={errors}
            onChange={e => {
              const value = e.target.value;
              setValue('applicants', value ? [value] : []);
            }}
          />
        )}
      />

      <Controller
        name="applicationDate"
        control={control}
        render={({ field }) => (
          <AtlusInput
            {...field}
            label="Application date"
            placeholder="MM/DD/YYYY"
            type="text"
            wrapperClassName="w-[50%]"
            value={field.value ?? ''}
            errors={errors}
            onChange={e => {
              setValue('applicationDate', e.target.value);
            }}
          />
        )}
      />
    </div>
  );
};
