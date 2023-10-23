import { AtlusTagColor } from '@/components/ui/tag/atlus-tag';

export enum PackageStatus {
  Open = 0,
  ExclusivityPeriod = 1,
  Sold = 2,
  OffMarket = 3,
}

export interface PackageStatusStyle {
  tagColor: AtlusTagColor;
}

export const PackageStatusColorMap: Readonly<Record<PackageStatus, PackageStatusStyle>> = {
  [PackageStatus.Open]: {
    tagColor: 'green-2',
  },
  [PackageStatus.ExclusivityPeriod]: {
    tagColor: 'yellow',
  },
  [PackageStatus.Sold]: {
    tagColor: 'red-2',
  },
  [PackageStatus.OffMarket]: {
    tagColor: 'gray',
  },
};
