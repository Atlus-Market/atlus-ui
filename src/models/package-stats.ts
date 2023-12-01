import { Package } from '@/models/package';

export type PackageStats = Pick<Package, 'views' | 'shares' | 'downloads' | 'notInterestedCount'>;
