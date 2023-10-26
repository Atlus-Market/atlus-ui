import { GroupBase } from 'react-select';
import { AtlusDropdownListProps } from '@/components/ui/dropdown-list/atlus-dropdown-list';

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    atlusDropdownProps: Omit<
      AtlusDropdownListProps<unknown>,
      'options' | 'value' | 'defaultValue' | 'onChange' | 'filterOption'
    >;
  }
}
