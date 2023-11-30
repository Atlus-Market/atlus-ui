import Image from 'next/image';
import ImageGreySvg from '@/public/assets/icons/files/image-grey.svg';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { FileSelector } from '@/components/ui/select-file/file-selector';
import { useRef } from 'react';

interface CompanyLogoProps {
  onSelectFile: (file: File) => void;
}

export const CompanyLogo = ({ onSelectFile }: CompanyLogoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div className="bg-light-grey-2 rounded-lg px-3 py-4 md:px-7 md:py-8 mb-2">
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
          <FileSelector
            className="hidden"
            onFileSelected={ime => console.log(ime)}
            ref={inputRef}
          />
          <AtlusButton
            variant="outline"
            color="black"
            className="atlus-btn-36 sm:max-md:!min-w-0 sm:max-md:w-[95px]"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Upload
          </AtlusButton>
        </div>
      </div>
      <span className="text-dark-grey font-inter text-xs pl-3">
        Your logo will appear on your packages.
      </span>
    </div>
  );
};
