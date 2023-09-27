import { numericFormatter } from 'react-number-format';

export const formatPrice = (price: number | string): string => {
  return numericFormatter(price.toString(), {
    prefix: '$',
    thousandsGroupStyle: 'thousand',
    thousandSeparator: ',',
  });
};
