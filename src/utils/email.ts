import { string } from 'yup';
import { EmailErrorMessage } from '@/constants/form';

const emailValidatorFn = string().trim().email(EmailErrorMessage);

export const isValidEmail = (email: string): boolean => {
  let isValidEmail = false;
  try {
    emailValidatorFn.validateSync(email);
    isValidEmail = true;
  } catch (e) {}
  return isValidEmail;
};
