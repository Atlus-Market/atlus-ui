import { ReactNode } from 'react';

interface DropdownLabelWithIconProps {
  icon: ReactNode;
  label: ReactNode;
}

export const DropdownLabelWithIcon = ({ label, icon }: DropdownLabelWithIconProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      {icon}
      {label}
    </div>
  );
};
