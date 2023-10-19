import { PackageStatus } from '@/models/package-status';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

interface PackageStatusProps {
  status: PackageStatus;
}

export const PackageStatusTag = ({ status }: PackageStatusProps) => {
  switch (status) {
    case PackageStatus.Open:
      return <AtlusTag text="Open" color="green" />;
    case PackageStatus.ExclusivityPeriod:
      return <AtlusTag text="Exclusivity period" color="yellow" />;
    case PackageStatus.Sold:
      return <AtlusTag text="Sold" color="red" />;
    case PackageStatus.OffMarket:
      return <AtlusTag text="Off market" color="gray" />;
    default:
      return null;
  }
};
