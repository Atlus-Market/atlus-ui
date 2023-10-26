'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { FamilyPatentGroup } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

interface SeeAllPatentsButtonProps {
  familyPatents: FamilyPatentGroup;
}

export const SeeAllPatentsButton = ({ familyPatents }: SeeAllPatentsButtonProps) => {
  const { setPatents } = useViewPackagePatentsContext();
  return (
    <AtlusButton
      variant="outline"
      color="black"
      className="mt-4 md:mt-6 atlus-btn-38 md:atlus-btn-45"
      onClick={() => {
        setPatents(familyPatents);
      }}
    >
      See all patents
    </AtlusButton>
  );
};
