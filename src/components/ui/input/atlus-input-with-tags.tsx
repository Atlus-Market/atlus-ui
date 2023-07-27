import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';

export type AtlusInputWithTagsProps = AtlusInputProps;

export const AtlusInputWithTags = (props: AtlusInputWithTagsProps) => {
  return (
    <AtlusInput {...props} />
  );
};
