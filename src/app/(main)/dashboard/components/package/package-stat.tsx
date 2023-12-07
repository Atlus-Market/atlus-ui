import { JSXElementConstructor } from 'react';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface PackageStatProps {
  value: number | string;
  icon: JSXElementConstructor<IconBaseProps>;
  tooltipId: string;
  tooltipContent: string;
}

export const PackageStat = ({ value, icon, tooltipId, tooltipContent }: PackageStatProps) => {
  const Icon = icon;
  return (
    <div
      className="flex items-center gap-1 leading-none"
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
    >
      <Icon className="text-dark-grey text-base md:text-lg" />
      <span className="text-dark-grey text-xs md:text-sm !leading-none">{value}</span>
    </div>
  );
};
