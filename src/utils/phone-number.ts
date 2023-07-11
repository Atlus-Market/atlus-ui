import parsePhoneNumber from 'libphonenumber-js';

/**
 * Validate if a string is a valid phone number or not.
 * @param phoneNumber to validate
 */
export const isValidPhoneNumber = (
  phoneNumber: string | undefined
): boolean => {
  if (!phoneNumber) {
    return false;
  }
  return (
    parsePhoneNumber(phoneNumber, {
      extract: false, // Do not extract phone number from phoneNumber argument. Just parse it entirely.
    })?.isValid() ?? false
  );
};
