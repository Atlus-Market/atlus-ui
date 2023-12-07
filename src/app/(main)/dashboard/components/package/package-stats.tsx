import { PackageStat } from '@/app/(main)/dashboard/components/package/package-stat';
import { HiEye, HiShare } from 'react-icons/hi2';
import { HiDownload, HiX } from 'react-icons/hi';
import { PackageStats as PackageStatsType } from '@/models/package-stats';
import { AtlusTooltip } from '@/components/ui/tooltip/atlus-tooltip';
import { useId } from 'react';

interface PackageStatsProps {
  packageStats: PackageStatsType;
}

export const PackageStats = ({ packageStats }: PackageStatsProps) => {
  const tooltipId = useId();
  return (
    <div className="flex items-center gap-5 md:gap-8">
      <AtlusTooltip tooltipId={tooltipId} />
      <PackageStat
        icon={HiEye}
        value={packageStats.views}
        tooltipId={tooltipId}
        tooltipContent="Views"
      />
      <PackageStat
        icon={HiShare}
        value={packageStats.shares}
        tooltipId={tooltipId}
        tooltipContent="Shares"
      />
      <PackageStat
        icon={HiDownload}
        value={packageStats.downloads}
        tooltipId={tooltipId}
        tooltipContent="Downloads"
      />
      <PackageStat
        icon={HiX}
        value={packageStats.notInterestedCount}
        tooltipId={tooltipId}
        tooltipContent="Not interested"
      />
    </div>
  );
};
