import { Validator } from '@/components/ui/form/validators/validator';
import parse from 'date-fns/parse';

export const plainDateFormat = 'MM/DD/YYYY';

export const plainDateValidator: Validator<string> = {
  name: 'plain-date-validator',
  message:
    `The date format should be ${plainDateFormat}`,
  test: (date, context): boolean => isValidDate(date)
};


const isValidDate = (date: string): boolean => {
  if (!date) {
    return false;
  }
  const parsedDate = parse(date, 'MM/dd/yyyy', new Date());
  console.log('parsedDate: ', parsedDate);
  console.log('parsedDate.getTime: ', parsedDate.getTime());
  return !isNaN(parsedDate.getTime());
};
