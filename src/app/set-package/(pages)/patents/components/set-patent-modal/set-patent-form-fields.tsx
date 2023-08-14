import { Controller, useFormContext } from 'react-hook-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { Patent } from '@/models/patent';
import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusFormDropdownList } from '@/components/ui/form/atlus-form-dropdown';
import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';


const statusOptions: DropdownOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
  { value: 'issued', label: 'Issued' },
  { value: 'abandoned', label: 'Abandoned' },
  { value: 'lapsed', label: 'Lapsed' }
];

interface SetPatentFormFieldsProps {
  allowEditPublicationNumber?: boolean;
}

export const SetPatentFormFields = ({ allowEditPublicationNumber = true }: SetPatentFormFieldsProps) => {
  const formProps = useFormContext<Patent>();
  const {
    register,
    setValue, control, formState: { errors }
  }
    = formProps;
  console.log('SetPatentForm Errors: ', errors);

  return (
    <div>
      <AtlusFormInput
        label='Title'
        placeholder='Enter title'
        type='text'
        {...register('title')}
      />

      <div className='flex gap-6'>
        <AtlusFormInput
          label='Application number'
          placeholder='US12345678B1'
          type='text'
          {...register('applicationNumber')}
          wrapperClassName='grow'
        />

        <AtlusFormInput
          label='Patent number'
          placeholder='US12345678B1'
          type='text'
          {...register('publicationNumber')}
          wrapperClassName='grow'
          disabled={!allowEditPublicationNumber}
        />
      </div>

      <AtlusFormDropdownList
        label='Status'
        placeholder='Select status'
        name='status'
        options={statusOptions}
        showDropdownIndicator
        isSearchable={false}
        wrapperClassName='w-[50%] pr-4'
      />

      <Controller
        name='applicantsOriginal'
        control={control}
        render={({ field }) => (
          <AtlusInput
            {...field}
            label='Assignee'
            placeholder='Enter current assignee'
            type='text'
            value={field.value?.join('') ?? ''}
            errors={errors}
            onChange={e => {
              const value = e.target.value;
              setValue('applicantsOriginal', value ? [value] : []);
            }}
          />
        )}
      />

      <Controller
        name='applicationReferenceEpodoc'
        control={control}
        render={({ field }) => (
          <AtlusInput
            {...field}
            label='Application date'
            placeholder='MM/DD/YYYY'
            type='text'
            wrapperClassName='w-[50%]'
            value={field.value?.date ?? ''}
            errors={errors}
            onChange={e => {
              setValue('applicationReferenceEpodoc', { date: e.target.value });
            }}
          />
        )}
      />
    </div>
  );
};
