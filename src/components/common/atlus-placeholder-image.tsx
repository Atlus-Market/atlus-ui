import Image from 'next/image';

interface AtlusPlaceholderImageProps {
  image: any;
  imageAltText: string;
  bottomText?: string;
}

export const AtlusPlaceholderImage = ({
  image,
  imageAltText,
  bottomText,
}: AtlusPlaceholderImageProps) => {
  return (
    <div className="max-w-[300px] text-center">
      <Image src={image} alt={imageAltText} className="my-0 mx-auto" />
      {bottomText && <div className="text-dark-grey text-sm mt-6">{bottomText}</div>}
    </div>
  );
};
