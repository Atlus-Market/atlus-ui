import {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  GroupBase,
  GroupHeadingProps,
  IndicatorsContainerProps,
  MultiValueProps,
  MultiValueRemoveProps,
  NoticeProps,
} from 'react-select';
import { DropdownOption, ValueOptionType } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import { AtlusTagRemoveButton } from '@/components/ui/tag/atlus-tag-remove-button';
import { ControlProps } from 'react-select/dist/declarations/src/components/Control';

export const controls = {
  Control: <T extends ValueOptionType>({
    children,
    ...rest
  }: ControlProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { leftIcon } = rest.selectProps.atlusDropdownProps;
    return (
      <components.Control {...rest}>
        {leftIcon && <div className="inline-block mr-3">{leftIcon}</div>}
        {children}
      </components.Control>
    );
  },
  GroupHeading: <T extends ValueOptionType>({
    children,
    ...rest
  }: GroupHeadingProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { groupHeadingHeader } = rest.selectProps.atlusDropdownProps;
    return (
      <components.GroupHeading {...rest}>
        {groupHeadingHeader}
        {children}
      </components.GroupHeading>
    );
  },
  IndicatorsContainer: <T extends ValueOptionType>({
    children,
    ...rest
  }: IndicatorsContainerProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { indicatorsExtraCmp } = rest.selectProps.atlusDropdownProps;
    // Renders CleanIndicator & DropdownIndicator
    return (
      <components.IndicatorsContainer {...rest}>
        {indicatorsExtraCmp}
        {children}
      </components.IndicatorsContainer>
    );
  },
  DropdownIndicator: <T extends ValueOptionType>({
    children,
    ...rest
  }: DropdownIndicatorProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { showDropdownIndicator } = rest.selectProps.atlusDropdownProps;
    return (
      <components.DropdownIndicator {...rest}>
        {showDropdownIndicator ? children : <div />}
      </components.DropdownIndicator>
    );
  },
  ClearIndicator: <T extends ValueOptionType>({
    children,
    ...rest
  }: ClearIndicatorProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { isMulti, clearIndicator } = rest.selectProps.atlusDropdownProps;
    if (isMulti) {
      return null;
    }
    return (
      <components.ClearIndicator {...rest}>
        {clearIndicator ? clearIndicator : children}
      </components.ClearIndicator>
    );
  },
  NoOptionsMessage: <T extends ValueOptionType>({
    children,
    ...rest
  }: NoticeProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { noOptionsMessage } = rest.selectProps.atlusDropdownProps;
    if (typeof noOptionsMessage === 'function') {
      const NoOptionsMessage = noOptionsMessage;
      return <NoOptionsMessage inputValue={rest.selectProps.inputValue} />;
    }
    return (
      <components.NoOptionsMessage {...rest}>
        {noOptionsMessage ? noOptionsMessage : children}
      </components.NoOptionsMessage>
    );
  },
  IndicatorSeparator: () => null,
  MultiValue: <T extends ValueOptionType>({
    children,
    ...rest
  }: MultiValueProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>) => {
    const { customMultiValue } = rest.selectProps.atlusDropdownProps;
    if (customMultiValue) {
      const CustomElement = customMultiValue;
      return <CustomElement clearValue={rest.clearValue} data={rest.data.data} />;
    }
    return (
      <components.MultiValue {...rest}>
        <AtlusTag text={children as string} className="!pr-0 !rounded-r-[0]" />
      </components.MultiValue>
    );
  },
  MultiValueRemove: <T extends ValueOptionType>(
    rest: MultiValueRemoveProps<DropdownOption<T>, boolean, GroupBase<DropdownOption<T>>>
  ) => {
    if (rest.selectProps.atlusDropdownProps.customMultiValue) {
      return null;
    }
    return (
      <components.MultiValueRemove {...rest}>
        <AtlusTagRemoveButton classNames="!rounded-l-[0] pr-[12px] h-full" />
      </components.MultiValueRemove>
    );
  },
};
