import { PackageStat } from '@/app/(main)/dashboard/components/package/package-stat';
import { HiEye, HiShare } from 'react-icons/hi2';
import { HiDownload, HiX } from 'react-icons/hi';
import { PackageStats as PackageStatsType } from '@/models/package-stats';

interface PackageStatsProps {
  packageStats: PackageStatsType;
}

export const PackageStats = ({ packageStats }: PackageStatsProps) => {
  return (
    <div className="flex items-center gap-5 md:gap-8">
      <PackageStat icon={HiEye} value={packageStats.views} />
      <PackageStat icon={HiShare} value={packageStats.shares} />
      <PackageStat icon={HiDownload} value={packageStats.downloads} />
      <PackageStat icon={HiX} value={packageStats.notInterestedCount} />
    </div>
  );
};
