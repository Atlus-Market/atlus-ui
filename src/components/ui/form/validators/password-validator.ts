import { Validator } from '@/components/ui/form/validators/validator';
import { isValidPassword } from '@/utils/password';

export const passwordValidator: Validator<string> = {
  name: 'password-validator',
  message:
    'Min. 8 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol (@$!%*? or &)',
  test: (value: string, context): boolean => isValidPassword(value),
};
