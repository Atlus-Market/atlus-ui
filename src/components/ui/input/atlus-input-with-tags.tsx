import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { ForwardedRef, forwardRef, useMemo, useRef, useState } from 'react';
import { isArray } from 'lodash';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { pascalCase } from 'pascal-case';
import { useFormState } from 'react-hook-form';

export interface AtlusInputWithTagsProps extends AtlusInputProps {
  onTagsChange?: (tags: string[]) => void;
  initialValue?: string[];
}

export const AtlusInputWithTags = forwardRef<HTMLInputElement, AtlusInputWithTagsProps>(
  function AtlusInputWithTags(
    { onTagsChange, name, initialValue = [], ...rest },
    ref: ForwardedRef<HTMLInputElement>
  ) {
    const [tags, setTags] = useState<string[]>(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const { errors } = useFormState({
      name: name,
      exact: true,
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        const value = (event.target as HTMLInputElement).value?.trim();
        if (value?.length > 0) {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          const newTags = [...tags, pascalCase(value)];
          onTagsChange?.(newTags);
          setTags(newTags);
        }
      }
    };

    const tagsList = useMemo(() => {
      if (!isArray(tags) || tags.length === 0) {
        return null;
      }
      return (
        <>
          {tags.map((tag, index) => {
            const onClose = () => {
              const filteredTags = tags.filter(t => t !== tag);
              setTags(filteredTags);
              onTagsChange?.(filteredTags);
            };
            return <AtlusTag key={`${index}-${tag}`} text={tag} onClose={onClose} size="small" />;
          })}
        </>
      );
    }, [onTagsChange, tags]);

    return (
      <AtlusInput
        {...rest}
        name={name}
        ref={inputRef}
        leftCmp={tagsList}
        onKeyDown={handleKeyDown}
        inputClassName="min-w-[260px]"
        errors={errors}
      />
    );
  }
);
