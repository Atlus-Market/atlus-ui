'use client';

import { AtlusImageZoom } from '@/components/common/atlus-image-zoom';
import DocumentSVG from '@/public/assets/images/document.svg';
import { getPatentPictureUrl } from '@/api/patents/get-patent-picture-url';
import { useState } from 'react';
import clsx from 'clsx';
import NextImage from 'next/image';

interface PatentImageProps {
  publicationNumber?: string;
}

const DefaultImage = DocumentSVG;

export const PatentImage = ({ publicationNumber }: PatentImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | typeof DocumentSVG>(
    getPatentPictureUrl(publicationNumber ?? '')
  );
  const disableZoom = imageSrc === DefaultImage;

  return (
    <AtlusImageZoom>
      <NextImage
        src={imageSrc}
        alt="Patent image"
        width={400}
        height={400}
        style={{
          objectFit: 'contain',
          maxWidth: '126px',
          maxHeight: '126px',
        }}
        className={clsx('h-full', {
          'pointer-events-none': disableZoom,
        })}
        onError={() => setImageSrc(DefaultImage)}
      />
    </AtlusImageZoom>
  );
};
