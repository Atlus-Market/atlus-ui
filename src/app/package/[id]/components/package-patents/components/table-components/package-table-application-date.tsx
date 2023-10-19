import { parseGMTDate } from '@/utils/date';
import format from 'date-fns/format';
import { plainDateFormat } from '@/components/ui/form/validators/plain-date-validator';

interface PackageTableApplicationDateProps {
  gmtDate: string;
}

export const PackageTableApplicationDate = ({ gmtDate }: PackageTableApplicationDateProps) => {
  const date = parseGMTDate(gmtDate);
  const title = date ? format(date, plainDateFormat) : '-';
  return <span className="text-13 md:text-[15px] text-soft-black">{title}</span>;
};
