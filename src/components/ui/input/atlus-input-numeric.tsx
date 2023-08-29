import { AtlusInput, AtlusInputProps } from '@/components/ui/input/atlus-input';
import { ForwardedRef, forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { BiDollar } from 'react-icons/bi';

export interface AtlusInputNumericProps extends AtlusInputProps {
  initialValue?: string[];
}

export const AtlusInputNumeric = forwardRef<HTMLInputElement, AtlusInputNumericProps>(
  function AtlusInputNumeric({
                               name,
                               initialValue = [],
                               type,
                               value,
                               defaultValue,
                               ...rest
                             }, ref: ForwardedRef<HTMLInputElement>) {

    return (
      <NumericFormat
        decimalScale={2}
        fixedDecimalScale
        thousandsGroupStyle='thousand'
        thousandSeparator=','
        customInput={AtlusInput}
        name={name}
        type='text'
        value={value as string}
        onChange={rest.onChange}
        onBlur={rest.onBlur}
        errors={rest.errors}
        leftCmp={<BiDollar size={16} />}
        {...rest}
      />
    );
  });
