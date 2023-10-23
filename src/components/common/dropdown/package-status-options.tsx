import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { PackageStatus } from '@/models/package-status';

export const packageStatusOptions: Readonly<DropdownOption<PackageStatus>[]> = [
  {
    label: 'Open',
    value: PackageStatus.Open,
    data: {
      description: 'This package is available for purchase.',
    },
  },
  {
    label: 'Exclusivity Period',
    value: PackageStatus.ExclusivityPeriod,
    data: {
      description: 'This package is under exclusivity.',
    },
  },
  {
    label: 'Sold',
    value: PackageStatus.Sold,
    data: {
      description: 'This package has been sold.',
    },
  },
  {
    label: 'OffMarket',
    value: PackageStatus.OffMarket,
    data: {
      description: 'This package is no longer available and cannot be viewed by others.',
    },
  },
];
