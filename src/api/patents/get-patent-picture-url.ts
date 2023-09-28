import { createUrl } from '@/api/api';

export const getPatentPictureUrl = (publicationNumber: string): string => {
  return createUrl(`/patent/thumb/${publicationNumber}`);
};
