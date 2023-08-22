import { string } from 'yup';
import { EmailErrorMessage } from '@/constants/form';

export const emailField = string().trim().email().required(EmailErrorMessage);
