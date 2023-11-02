import { Visibility } from '@/components/common/dropdown/visibility-options';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';

interface PackageVisibilityTagProps {
  visibility: Visibility;
}

export const PackageVisibilityTag = ({ visibility }: PackageVisibilityTagProps) => {
  const label = visibility === Visibility.Public ? 'Public' : 'Private';
  return <AtlusTag text={label} color="gray" />;
};
