'use client';

import { AtlusInputWithTagsProps } from '@/components/ui/input/atlus-input-with-tags';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AtlusInput } from '@/components/ui/input/atlus-input';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { isArray } from 'lodash';

export interface AtlusFormInputWithTagsProps extends AtlusInputWithTagsProps {
  name: string;
}

export const AtlusFormInputWithTags = (props: AtlusFormInputWithTagsProps) => {
  const { name } = props;
  const [tags, setTags] = useState<string[]>([]);
  const { control, setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      const value = (event.target as HTMLInputElement).value;
      if (value?.trim().length > 0) {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setTags([
          ...tags,
          value
        ]);
      }
    }
  };

  useEffect(() => {
    setValue(name, tags);
  }, [tags, name, setValue]);

  const tagsList = useMemo(() => {
    if (!isArray(tags) || tags.length === 0) {
      return null;
    }
    return (
      <div className='flex items-center flex-wrap gap-2 mr-2'>
        {tags.map((tag, index) => {
          const onClose = () => {
            setTags(tags.filter(t => t !== tag));
          };
          return (
            <AtlusTag key={`${index}-${tag}`} text={tag} onClose={onClose} />
          );
        })}
      </div>
    );
  }, [tags]);

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <AtlusInput
          {...props}
          ref={inputRef}
          leftCmp={tagsList}
          onKeyDown={handleKeyDown}
          inputClassName='min-w-[310px]'
        />
      )}
    />
  );
};
