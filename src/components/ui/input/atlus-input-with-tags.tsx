import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { ForwardedRef, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { isArray } from 'lodash';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

export interface AtlusInputWithTagsProps extends AtlusInputProps {
  onTagsChange?: (tags: string[]) => void;
}

export const AtlusInputWithTags = forwardRef<HTMLInputElement, AtlusInputWithTagsProps>(
  function AtlusInputWithTags({ onTagsChange, name, ...rest }, ref: ForwardedRef<HTMLInputElement>) {
    const [tags, setTags] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      onTagsChange?.(tags);
    }, [tags, name, onTagsChange]);

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
      <AtlusInput
        {...rest}
        name={name}
        ref={inputRef}
        leftCmp={tagsList}
        onKeyDown={handleKeyDown}
        inputClassName='min-w-[310px]'
      />
    );
  });
