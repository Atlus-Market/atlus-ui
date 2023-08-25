export interface Patent {
  applicants: string[];
  applicationDate:string;
  applicationNumber: string;
  familyId: string;
  patentNumber:string;
  publicationNumber: string; // also patent id
  status: string;
  title: string;
}
