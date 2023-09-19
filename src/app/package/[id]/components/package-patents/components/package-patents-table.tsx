import { Patent } from '@/models/patent';
import clsx from 'clsx';

export type PackagePatentsTableType = 'compact' | 'full';

interface PackagePatentsTableProps {
  patents: Patent[];
  type: PackagePatentsTableType;
}

export const PackagePatentsTable = ({ patents, type }: PackagePatentsTableProps) => {
  const isCompact = type === 'compact';
  const isFull = type === 'full';
  return (
    <div
      className={clsx('grid', {
        'grid-cols-2 md:grid-cols-3': isCompact,
        'grid-cols-6': isFull,
      })}
    >
      <div
        className={clsx('bg-peach', {
          'col-span-2 md:col-span-1': isCompact,
        })}
      >
        1
      </div>
      <div>2</div>
      <div>3</div>
      <div
        className={clsx({
          'bg-light-grey hidden': isCompact,
        })}
      >
        4
      </div>
      <div
        className={clsx({
          'bg-light-grey hidden': isCompact,
        })}
      >
        5
      </div>
      <div
        className={clsx({
          'bg-light-grey hidden': isCompact,
        })}
      >
        6
      </div>
    </div>
  );
};
