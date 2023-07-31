import { fromUnixTime } from 'date-fns';

export const parseGMTDate = (gmtDate: string): Date | null => {
  const date = Date.parse(gmtDate);
  if (Number.isNaN(date)) {
    return null;
  }
  return fromUnixTime(date / 1000);
};
