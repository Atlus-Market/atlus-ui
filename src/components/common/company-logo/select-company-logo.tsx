import Image from 'next/image';
import ImageGreySvg from '@/public/assets/icons/files/image-grey.svg';
import clsx from 'clsx';
import { DataImageURL } from '@/types';
import { ButtonLogoSelector } from '@/components/common/company-logo/button-logo-selector';

interface CompanyLogoProps {
  onSelectFile: (dataImageURL: DataImageURL) => void;
}

export const wrapperClassNames = 'bg-light-grey-2 rounded-lg';

export const SelectCompanyLogo = ({ onSelectFile }: CompanyLogoProps) => {
  return (
    <div>
      <div className={clsx(wrapperClassNames, 'px-3 py-4 md:px-7 md:py-8mb-2')}>
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px] md:gap-4">
            <Image src={ImageGreySvg} alt="image-logo" />
            <div className="flex flex-col gap-1">
              <span className="text-soft-black font-inter text-13 md:text-sm font-medium">
                Add <span className="hidden md:inline-block">company</span> logo
              </span>
              <span className="text-dark-grey font-inter text-11 md:text-xs">
                JPG<span className="inline-block md:hidden">,</span>{' '}
                <span className="hidden md:inline-block">or</span> PNG (max 10MB)
              </span>
            </div>
          </div>
          <ButtonLogoSelector onSelectFile={onSelectFile} btnText="Upload" />
        </div>
      </div>
      <span className="text-dark-grey font-inter text-xs pl-3">
        Your logo will appear on your packages.
      </span>
    </div>
  );
};
