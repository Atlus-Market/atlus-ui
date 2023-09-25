'use client';

import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useViewPackagePatentsContext } from '@/app/package/[id]/components/package-patents/components/view-package-patents/use-view-package-patents-context';
import { FamilyPatentGroup } from '@/app/set-package/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';
import { PatentsFamily } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-provider';

interface SeeAllPatentsButtonProps {
  familyPatents: FamilyPatentGroup;
}

export const SeeAllPatentsButton = ({ familyPatents }: SeeAllPatentsButtonProps) => {
  const { setPatents } = useViewPackagePatentsContext();
  return (
    <AtlusButton
      variant="outline"
      className="mt-4 md:mt-6"
      onClick={() => {
        const patentsFamilies: PatentsFamily[] = [];
        Object.values(familyPatents).map((patents, index) => {
          patentsFamilies.push({
            patents,
            familyNumber: index + 1,
          });
        });
        setPatents(patentsFamilies);
      }}
    >
      See all patents
    </AtlusButton>
  );
};
