/**
 * Validates password. Must have:
 * * one lowercase char
 * * one uppercase char
 * * one digit
 * * one special char (@$!%*?&)
 * * min 8 & max 100
 * @param password to validate
 */
export const isValidPassword = (password: string): boolean => {
  return new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\$!%&\*]).{8,100}$/
  ).test(password);
};
