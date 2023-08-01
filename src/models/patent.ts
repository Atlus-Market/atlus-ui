export interface Patent {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationReferenceEpodoc: {
    date: string; // GMT date string
  };
  familyId: string;
}
