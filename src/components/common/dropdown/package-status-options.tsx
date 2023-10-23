import { DropdownOption } from '@/components/ui/dropdown-list/atlus-dropdown-list';
import { PackageStatus } from '@/models/package-status';
import { DropdownLabelWithIcon } from '@/components/ui/dropdown-list/dropdown-label-with-icon';
import { AtlusCircle } from '@/components/ui/atlus-circle';

export const packageStatusOptions: Readonly<DropdownOption<PackageStatus>[]> = [
  {
    label: (
      <DropdownLabelWithIcon
        label="Open"
        icon={<AtlusCircle className={'bg-[#15C188]'} width={10} height={10} />}
      />
    ),
    value: PackageStatus.Open,
    data: {
      description: 'This package is available for purchase.',
    },
  },
  {
    label: (
      <DropdownLabelWithIcon
        label="Exclusivity Period"
        icon={<AtlusCircle className={'bg-[#DADD4C]'} width={10} height={10} />}
      />
    ),
    value: PackageStatus.ExclusivityPeriod,
    data: {
      description: 'This package is under exclusivity.',
    },
  },
  {
    label: (
      <DropdownLabelWithIcon
        label="Sold"
        icon={<AtlusCircle className={'bg-red'} width={10} height={10} />}
      />
    ),
    value: PackageStatus.Sold,
    data: {
      description: 'This package has been sold.',
    },
  },
  {
    label: (
      <DropdownLabelWithIcon
        label="OffMarket"
        icon={<AtlusCircle className={'bg-middle-grey'} width={10} height={10} />}
      />
    ),
    value: PackageStatus.OffMarket,
    data: {
      description: 'This package is no longer available and cannot be viewed by others.',
    },
  },
];
