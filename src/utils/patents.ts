import { Patent } from '@/models/patent';
import { CustomPatentPayload } from '@/api/package/create-package';
import { FamilyPatentGroup } from '@/app/set-package/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';
import { groupBy } from 'lodash';

export const sortPatentsByPublicationNumber = (patents: Patent[]): Patent[] => {
  return patents.sort((p1, p2) => getPatentId(p1).localeCompare(getPatentId(p2)));
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

export const mapPatentToCustomPatentPayload = (patent: Patent): CustomPatentPayload => {
  return {
    patentNumber: getPatentId(patent),
    applicationNumber: patent.applicationNumber,
    title: patent.title,
    status: patent.status,
    assignee: patent.assignees.join(','),
    applicationDate: patent.applicationDate,
  };
};

export const mapCustomPatentToPatent = (customPatent: CustomPatentPayload): Patent => {
  return {
    patentNumber: customPatent.patentNumber,
    applicationNumber: customPatent.applicationNumber,
    title: customPatent.title,
    status: customPatent.status,
    assignees: [customPatent.assignee],
    applicationDate: customPatent.applicationDate,
    publicationNumber: '',
    familyId: '',
    applicants: [],
  };
};

interface IPatentId {
  publicationNumber?: string;
  patentNumber: string;
}

export const getPatentId = (patent: IPatentId): string => {
  return (patent.publicationNumber || patent.patentNumber) ?? '';
};

export const getPatentReadableAssignees = (
  patent: {
    assignees: string[];
  },
  concatValue = ' & '
): string => {
  const readableAssignees = (patent.assignees ?? []).join(concatValue);
  return readableAssignees.length > 0 ? readableAssignees : '-';
};

export const groupPatentsByFamily = (patents: Patent[]): FamilyPatentGroup => {
  const groupedPatents = groupBy(patents, (patent: Patent) => patent.familyId);
  const familyIdKeys = Object.keys(groupedPatents);

  familyIdKeys.forEach(familyIdKey => {
    groupedPatents[familyIdKey] = sortPatentsByPublicationNumber(groupedPatents[familyIdKey]);
  });

  return groupedPatents;
};
