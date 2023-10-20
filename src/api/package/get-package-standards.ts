import { PackageStandard } from '@/models/package-standard';
import { sleep } from '@/utils/sleep';

interface GetPackageStandardsResponse {
  standards: PackageStandard[];
}

const packageStandards: PackageStandard[] = [
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
