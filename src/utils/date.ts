import { fromUnixTime } from 'date-fns';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export const parseGMTDate = (gmtDate: string): Date | null => {
  const date = Date.parse(gmtDate);
  if (Number.isNaN(date)) {
    return null;
  }
  return fromUnixTime(date / 1000);
};

export const formatSinceDate = (date: Date): string => {
  return timeAgo.format(date);
};
