export const isSecureProtocol = (url: string): boolean => {
  return new URL(url).protocol === 'https:';
};
