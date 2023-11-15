'use client';

import ShowMoreText from 'react-show-more-text';
import { AtlusExpandButton } from '@/components/ui/button/atlus-expand-button';

interface PackageDescriptionProps {
  description: string;
}

export const PackageDescription = ({ description }: PackageDescriptionProps) => {
  return (
    <ShowMoreText
      lines={5}
      more={<AtlusExpandButton text="See more" isExpanded={false} />}
      less={<AtlusExpandButton text="See less" isExpanded={true} />}
      anchorClass="block mt-4"
      className="text-black font-normal text-sm md:text-base"
    >
      {description}
    </ShowMoreText>
  );
};
