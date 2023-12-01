import { JSXElementConstructor } from 'react';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface GeneralInfoItemProps {
  label: string | number;
  icon: JSXElementConstructor<IconBaseProps>;
}

export const GeneralInfoItem = ({ label, icon }: GeneralInfoItemProps) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-5">
      <Icon className="text-sm md:text-2xl text-dark-grey" />
      <span className="text-sm md:text-base text-black font-light md:font-normal">{label}</span>
    </div>
  );
};
