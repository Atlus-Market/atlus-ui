import { Controller, useFormContext } from 'react-hook-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { statusOptions } from '@/components/common/dropdown/status-options';
import { CustomPatentPayload } from '@/api/package/create-package';

interface SetPatentFormFieldsProps {
  allowEditPublicationNumber?: boolean;
}

export const SetPatentFormFields = ({
  allowEditPublicationNumber = true,
}: SetPatentFormFieldsProps) => {
  const formProps = useFormContext<CustomPatentPayload>();
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
          {...register('patentNumber')}
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

      <AtlusFormInput
        label="Assignee"
        placeholder="Enter current assignee"
        type="text"
        {...register('assignee')}
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
