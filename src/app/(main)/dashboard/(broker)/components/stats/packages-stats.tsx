import { getBrokerPackageStatsOnServer } from '@/api/package/get-broker-packages-stats-on-server';
import { Stat } from '@/app/(main)/dashboard/(broker)/components/stats/stat';

import InboxStatSVG from '@/public/assets/icons/stats/inbox.svg';
import EyeStatSVG from '@/public/assets/icons/stats/eye.svg';
import DownloadStatSVG from '@/public/assets/icons/stats/download.svg';
import ShareStatSVG from '@/public/assets/icons/stats/share.svg';

export const PackagesStats = async () => {
  const packagesStats = await getBrokerPackageStatsOnServer();
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
      <Stat icon={InboxStatSVG} value={packagesStats.totalPackages} label="Packages" />
      <Stat icon={EyeStatSVG} value={packagesStats.views.totalViews} label="Views" />
      <Stat
        icon={DownloadStatSVG}
        value={packagesStats.downloads.totalDownloads}
        label="Downloads"
      />
      <Stat icon={ShareStatSVG} value={packagesStats.shares.totalShares} label="Shares" />
    </div>
  );
};
