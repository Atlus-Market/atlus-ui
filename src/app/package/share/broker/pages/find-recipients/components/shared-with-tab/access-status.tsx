import { PackageAccessValue } from '@/models/package-access-value';

interface AccessStatusProps {
  packageAccessValue: PackageAccessValue;
}

export const AccessStatus = ({ packageAccessValue }: AccessStatusProps) => {
  let accessStatus = 'Restricted';
  if (packageAccessValue === PackageAccessValue.FullAccess) {
    accessStatus = 'Full access';
  } else if (packageAccessValue === PackageAccessValue.LimitedAccess) {
    accessStatus = 'Limited access';
  }
  return <div className="text-orange text-xs">{accessStatus}</div>;
};
