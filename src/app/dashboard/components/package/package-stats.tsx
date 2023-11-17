import { PackageStat } from '@/app/dashboard/components/package/package-stat';
import { HiEye, HiShare } from 'react-icons/hi2';
import { HiDownload, HiX } from 'react-icons/hi';
import { Package } from '@/models/package';

type PackageStats = Pick<Package, 'views' | 'shares' | 'downloads'>;

interface PackageStatsProps {
  packageStats: PackageStats;
}

export const PackageStats = ({ packageStats }: PackageStatsProps) => {
  return (
    <div className="flex items-center gap-5 md:gap-8">
      <PackageStat icon={HiEye} value={packageStats.views} />
      <PackageStat icon={HiShare} value={packageStats.shares} />
      <PackageStat icon={HiDownload} value={packageStats.downloads} />
      <PackageStat icon={HiX} value={1} />
    </div>
  );
};
