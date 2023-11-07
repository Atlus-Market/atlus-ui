import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';

interface NoDataProps {
  image: string | StaticImageData;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
}

export const NoData = ({ image, title, subtitle, footer }: NoDataProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={image} alt="Online presentation" width={230} />
      {title && (
        <div className="text-18 md:text-lg text-black font-geologica mb-3 md:mb-4">{title}</div>
      )}
      {subtitle && (
        <div className="text-sm md:text-base text-black font-inter mb-8">{subtitle}</div>
      )}
      {footer}
    </div>
  );
};
