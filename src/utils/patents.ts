import { Patent } from '@/models/patent';

export const sortPatentsByPublicationNumber = (patents: Patent[]): Patent[] => {
  return patents.sort((p1, p2) => p1.publicationNumber.localeCompare(p2.publicationNumber));
};

type GetIdFn<T extends unknown> = (arg: T) => string;
/**
 * Merges all patents into one single array.
 * patents2 replaces patents in patents1.
 * @param arr1
 * @param arr2
 * @param getIdFn
 */
export const mergeArrays = <T extends unknown>(arr1: T[], arr2: T[], getIdFn: GetIdFn<T>): T[] => {
  const patentsMap = new Map<string, T>();
  arr1.forEach(patent => patentsMap.set(getIdFn(patent), patent));
  arr2.forEach(patent => patentsMap.set(getIdFn(patent), patent));
  return Array.from(patentsMap.values());
};
