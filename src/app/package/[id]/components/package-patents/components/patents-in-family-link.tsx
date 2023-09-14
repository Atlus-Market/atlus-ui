import { AtlusButton } from '@/components/ui/button/atlus-button';
import { pluralize } from '@/utils/words';

interface PatentsInFamilyLinkProps {
  totalPatents: number;
}

export const PatentsInFamilyLink = ({ totalPatents }: PatentsInFamilyLinkProps) => {
  if (totalPatents <= 1) {
    return null;
  }
  const label = `${totalPatents} ${pluralize('patent', totalPatents)} in this family`;
  return (
    <AtlusButton variant="clear" color="orange">
      {label}
    </AtlusButton>
  );
};
