import { Validator } from '@/components/ui/form/validators/validator';
import parse from 'date-fns/parse';
import { parseGMTDate } from '@/utils/date';

export const plainDateFormat = 'MM/dd/yyyy';

export const plainDateValidator: Validator<string> = {
  name: 'plain-date-validator',
  message: `The date format should be ${plainDateFormat}`,
  test: (date, context): boolean => isValidDate(date),
};

const isValidDate = (date: string): boolean => {
  if (!date) {
    return false;
  }
  const parsedDate = parseGMTDate(date);
  console.log('isValidDate: ', parsedDate);
  if (!parsedDate) {
    return false;
  }
  return !isNaN(parsedDate.getTime());
};

export const parseDateString = (value: any, originalValue: string) => {
  const parsedDate = parse(originalValue, plainDateFormat, new Date());
  return parsedDate.toUTCString();
};
