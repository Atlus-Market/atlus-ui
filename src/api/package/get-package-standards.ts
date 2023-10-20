import { PackageStandards } from '@/models/package-standards';
import { sleep } from '@/utils/sleep';

interface GetPackageStandardsResponse {
  standards: PackageStandards[];
}

const packageStandards: PackageStandards[] = [
  '3G (UMTS)',
  '4G (LTE)',
  '5G',
  'Wi-Fi - IEEE 802.11 Standards',
  'Bluetooth - IEEE 802.15 Standards',
  'USB',
].map((name, index) => ({
  id: index,
  name,
}));

export const getPackageStandards = async (): Promise<GetPackageStandardsResponse> => {
  await sleep(600);
  return {
    standards: packageStandards,
  };
};
