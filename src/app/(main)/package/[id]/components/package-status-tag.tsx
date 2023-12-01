import { PackageStatus, PackageStatusColorMap } from '@/models/package-status';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

interface PackageStatusProps {
  status: PackageStatus;
}

export const PackageStatusTag = ({ status }: PackageStatusProps) => {
  switch (status) {
    case PackageStatus.Open:
      return <AtlusTag text="Open" color={PackageStatusColorMap[PackageStatus.Open].tagColor} />;
    case PackageStatus.ExclusivityPeriod:
      return (
        <AtlusTag
          text="Exclusivity period"
          color={PackageStatusColorMap[PackageStatus.ExclusivityPeriod].tagColor}
        />
      );
    case PackageStatus.Sold:
      return <AtlusTag text="Sold" color={PackageStatusColorMap[PackageStatus.Sold].tagColor} />;
    case PackageStatus.OffMarket:
      return (
        <AtlusTag
          text="Off market"
          color={PackageStatusColorMap[PackageStatus.OffMarket].tagColor}
        />
      );
    default:
      return null;
  }
};
