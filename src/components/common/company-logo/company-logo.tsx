import clsx from 'clsx';
import { wrapperClassNames } from '@/components/common/company-logo/select-company-logo';
import { DataImageURL } from '@/types';
import { ButtonLogoSelector } from '@/components/common/company-logo/button-logo-selector';

interface CompanyLogoProps {
  logoUrl: string;
  onSelectFile: (dataImageURL: DataImageURL) => void;
}

export const CompanyLogo = ({ logoUrl, onSelectFile }: CompanyLogoProps) => {
  return (
    <div className={clsx(wrapperClassNames, 'flex justify-between items-center px-4 py-5')}>
      <img src={logoUrl} alt="Company logo" className="max-w-[200px] max-h-[60px]" />
      <ButtonLogoSelector onSelectFile={onSelectFile} btnText="Change" />
    </div>
  );
};
