'use client';

import { Controller, useFormContext, useFormState } from 'react-hook-form';
import {
  AtlusDropdownList,
  AtlusDropdownListProps,
  ValueOptionType,
} from '@/components/ui/dropdown-list/atlus-dropdown-list';
import clsx from 'clsx';

type AtlusFormDropdownListProps<T extends ValueOptionType> = Omit<
  AtlusDropdownListProps<T>,
  'onChange' | 'onBlur'
> & {
  name: string;
};

export const AtlusFormDropdownList = <T extends ValueOptionType>({
  name = '',
  defaultValue,
  wrapperClassName,
  ...rest
}: AtlusFormDropdownListProps<T>) => {
  const { control, trigger } = useFormContext();
  const { errors } = useFormState({
    name: name,
    exact: true,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref, name: name } }) => {
        return (
          <AtlusDropdownList
            name={name}
            value={value}
            innerRef={ref}
            errors={errors}
            defaultValue={value || defaultValue}
            {...rest}
            onChange={onChange}
            onBlur={() => trigger(name)}
            wrapperClassName={clsx('mb-4 md:mb-6', wrapperClassName)}
          />
        );
      }}
    />
  );
};
