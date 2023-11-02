import { Package } from '@/models/package';
import { PackageStat } from '@/app/dashboard/components/package/package-stat';
import { HiEye, HiShare } from 'react-icons/hi2';
import { HiDownload, HiX } from 'react-icons/hi';

interface PackageStatsProps {
  atlusPackage: Package;
}

export const PackageStats = ({ atlusPackage }: PackageStatsProps) => {
  return (
    <div className="flex items-center gap-5 md:gap-8">
      <PackageStat icon={HiEye} value={27} />
      <PackageStat icon={HiShare} value={4} />
      <PackageStat icon={HiDownload} value={3} />
      <PackageStat icon={HiX} value={1} />
    </div>
  );
};
