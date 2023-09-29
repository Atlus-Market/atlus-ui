'use client';

import { AtlusImageZoom } from '@/components/common/atlus-image-zoom';
import { getPatentPictureUrl } from '@/api/patents/get-patent-picture-url';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import NextImage from 'next/image';

interface PatentImageProps {
  publicationNumber?: string;
}

const DataImage =
  "data:image/svg+xml;charset=UTF-8,%3csvg width='126' height='126' viewBox='0 0 126 126' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_933_643)'%3e%3crect x='0.5' y='0.5' width='125' height='125' rx='6.85766' fill='white' stroke='%23F5F5F5'/%3e%3cg clip-path='url(%23clip1_933_643)'%3e%3cpath d='M82.5991 54.9902V82.5845C82.6011 82.8634 82.5481 83.14 82.4432 83.3984C82.3382 83.6568 82.1834 83.892 81.9876 84.0906C81.7918 84.2892 81.5587 84.4473 81.3018 84.5558C81.0449 84.6643 80.7691 84.7212 80.4902 84.7231H46.48C45.9211 84.7231 45.385 84.5012 44.9895 84.1062C44.5941 83.7112 44.3717 83.1753 44.3711 82.6164V44.3543C44.3711 43.2139 45.3247 42.2476 46.4991 42.2476H69.8501L82.5991 54.9902ZM78.3516 57.114H67.7327V46.4951H48.6187V80.4756H78.3516V57.114ZM54.99 52.8665H61.3613V57.114H54.99V52.8665ZM54.99 61.3616H71.9802V65.6091H54.99V61.3616ZM54.99 69.8567H71.9802V74.1042H54.99V69.8567Z' fill='%23C3C3C3'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_933_643'%3e%3crect width='126' height='126' fill='white'/%3e%3c/clipPath%3e%3cclipPath id='clip1_933_643'%3e%3crect width='50.9707' height='50.9707' fill='white' transform='translate(38 38)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ";

export const PatentImage = ({ publicationNumber }: PatentImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | typeof DataImage>(
    getPatentPictureUrl(publicationNumber ?? '')
  );
  const disableZoom = imageSrc === DataImage;

  const setDefaultImage = useCallback(() => {
    setImageSrc(DataImage);
  }, []);

  return (
    <AtlusImageZoom>
      <NextImage
        src={imageSrc}
        alt=""
        width={400}
        height={400}
        objectFit="contain"
        className={clsx(
          'h-full max-w-[126px] max-h-[126px] select-none',
          'indent-[-10000px]', // hide broken image
          {
            'pointer-events-none': disableZoom,
          }
        )}
        onError={setDefaultImage}
        placeholder={DataImage}
      />
    </AtlusImageZoom>
  );
};
