import { Package } from '@/models/package';
import { PackageStat } from '@/app/(protected-routes)/dashboard/components/package/package-stat';
import { HiEye, HiShare } from 'react-icons/hi2';
import { HiDownload, HiX } from 'react-icons/hi';

interface PackageStatsProps {
  atlusPackage: Package;
}

export const PackageStats = ({ atlusPackage }: PackageStatsProps) => {
  return (
    <div className="flex items-center gap-5 md:gap-8">
      <PackageStat icon={HiEye} value={atlusPackage.views} />
      <PackageStat icon={HiShare} value={atlusPackage.shares} />
      <PackageStat icon={HiDownload} value={atlusPackage.downloads} />
      <PackageStat icon={HiX} value={1} />
    </div>
  );
};
