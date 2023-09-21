import { HiUser } from 'react-icons/hi2';

interface OwnerProfilePictureProps {
  pictureUrl?: string;
}

export const OwnerProfilePicture = ({ pictureUrl }: OwnerProfilePictureProps) => {
  if (pictureUrl) {
    return <span>{null}</span>;
  }

  return (
    <HiUser className="text-[64px] md:text-7xl rounded-[72px] text-light-grey border border-light-grey" />
  );
};
