import { DirectoryTree } from '@/models/dataroom';
import { parseGMTDate } from '@/utils/date';
import { getUnixTime } from 'date-fns';

export const sortDocumentsByUploadedDate = (directoryTree: DirectoryTree[]) => {
  return directoryTree.sort((d1, d2) => {
    const d1Date = parseGMTDate(d1.dateUploaded);
    const d2Date = parseGMTDate(d2.dateUploaded);

    if (!d1Date || !d2Date) {
      return 0;
    }

    const d1Unix = getUnixTime(d1Date);
    const d2Unix = getUnixTime(d2Date);
    return d1Unix - d2Unix;
  });
};
