import { PackageAccessValue } from '@/models/package-access-value';

export interface PackageAccess {
  access: PackageAccessValue;
  avatar: string;
  clickedLink: boolean;
  clickedLinkTimestamp: string;
  email: string;
  name: string;
  openedEmail: boolean;
  openedEmailTimestamp: string;
}
