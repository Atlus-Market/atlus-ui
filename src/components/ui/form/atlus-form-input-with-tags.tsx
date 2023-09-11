'use client';

import {
  AtlusInputWithTags,
  AtlusInputWithTagsProps,
} from '@/components/ui/input/atlus-input-with-tags';
import { Controller, useFormContext } from 'react-hook-form';
import { useCallback } from 'react';

export interface AtlusFormInputWithTagsProps extends AtlusInputWithTagsProps {
  name: string;
}

export const AtlusFormInputWithTags = (props: AtlusFormInputWithTagsProps) => {
  const { name } = props;
  const { control, setValue, getValues } = useFormContext();

  const onTagsChange = useCallback(
    (tags: string[]) => {
      setValue(name, tags);
    },
    [name, setValue]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AtlusInputWithTags {...props} initialValue={field.value} onTagsChange={onTagsChange} />
      )}
    />
  );
};
