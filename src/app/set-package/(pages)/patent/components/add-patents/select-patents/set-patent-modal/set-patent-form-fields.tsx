import { Controller, useFormContext } from 'react-hook-form';
import { AtlusFormInput } from '@/components/ui/form/atlus-form-input';
import { Patent } from '@/models/patent';
import { AtlusInput } from '@/components/ui/input/atlus-input';

export const SetPatentFormFields = () => {
  const formProps = useFormContext<Patent>();
  const {
    register,
    watch,
    setValue, control, formState: { errors }
  }
    = formProps;
  console.log('SetPatentForm Errors: ', errors);

  console.log(watch());

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
        />
      </div>

      <div>
        Status
      </div>

      <Controller
        name='applicantsOriginal'
        control={control}
        render={({ field }) => (
          <AtlusInput
            {...field}
            label='Application number'
            placeholder='Enter current assignee'
            type='text'
            value={field.value?.join('') ?? ''}
            errors={errors}
            onChange={e => {
              setValue('applicantsOriginal', [e.target.value]);
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
