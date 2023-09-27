import { getPatentId } from '@/utils/patents';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-components/table-header-title';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-application-date';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-patent-id';
import { PackageTablePatentTitle } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-patent-title';
import { PackageTableHeader } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-header';
import { PackageTableCell } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-cell';
import clsx from 'clsx';
import {
  gridBorderStyles,
  PackagePatentsTable,
} from '@/app/package/[id]/components/package-patents/components/package-patents-table';
import { FamilyPatentGroup } from '@/app/set-package/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';

interface PackagePatentsTableCompactProps {
  familyPatents: FamilyPatentGroup;
}

export const PackagePatentsReducedTable = ({ familyPatents }: PackagePatentsTableCompactProps) => {
  const patentsFamilyIds = Object.keys(familyPatents);
  return (
    <div>
      <PackagePatentsTable familyPatents={familyPatents} type="compact" />
      <div className="md:hidden">
        {patentsFamilyIds.map(familyId => {
          const patents = familyPatents[familyId];
          const patent = patents[0];
          const patentId = getPatentId(patent);
          return (
            <div key={patentId}>
              <div className={clsx('grid grid-col-2 mt-6 mb-2', gridBorderStyles)}>
                <PackageTableHeader className="col-span-2">
                  <TableHeaderTitle title={`Family ${familyId}`} />
                </PackageTableHeader>
                <PackageTableCell className="col-span-2">
                  <PackageTablePatentTitle title={patent.title} />
                </PackageTableCell>
                <PackageTableCell>
                  <div>
                    <TableHeaderTitle title="Pub/Patent no." classNames="!text-[11px]" />
                  </div>
                  <PackageTablePatentId patentId={patentId} />
                </PackageTableCell>
                <PackageTableCell>
                  <div>
                    <TableHeaderTitle title="Filling date" classNames="!text-[11px]" />
                  </div>
                  <PackageTableApplicationDate gmtDate={patent.applicationDate} />
                </PackageTableCell>
              </div>
              <div className="pl-3">
                <PatentsInFamilyLink familyPatentGroup={{ [familyId]: patents }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
