import { Patent } from '@/models/patent';

export const sortPatentsByPublicationNumber = (patents: Patent[]): Patent[] => {
  return patents.sort((p1, p2) => p1.publicationNumber.localeCompare(p2.publicationNumber));
};
