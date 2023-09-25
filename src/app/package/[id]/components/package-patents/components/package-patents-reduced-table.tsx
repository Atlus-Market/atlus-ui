import { Patent } from '@/models/patent';
import { getPatentId, groupPatentsByFamily } from '@/utils/patents';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/package-table-application-date';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/package-table-patent-id';
import { PackageTablePatentTitle } from '@/app/package/[id]/components/package-patents/components/package-table-patent-title';
import { PackageTableHeader } from '@/app/package/[id]/components/package-patents/components/package-table-header';
import { PackageTableCell } from '@/app/package/[id]/components/package-patents/components/package-table-cell';
import clsx from 'clsx';
import { ViewPackagePatentsProvider } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-provider';
import { ViewPackagePatentsModal } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-modal';
import {
  gridBorderStyles,
  PackagePatentsTable,
} from '@/app/package/[id]/components/package-patents/components/package-patents-table';

interface PackagePatentsTableCompactProps {
  patents: Patent[];
}

export const PackagePatentsReducedTable = ({ patents }: PackagePatentsTableCompactProps) => {
  const familyPatents = groupPatentsByFamily(patents);
  const patentsGroups = Object.values(familyPatents);
  return (
    <div>
      <ViewPackagePatentsProvider>
        <PackagePatentsTable patents={patents} type="compact" />
        <div className="md:hidden">
          {patentsGroups.map((patents, index) => {
            const patent = patents[0];
            const patentId = getPatentId(patent);
            return (
              <div key={patentId}>
                <div className={clsx('grid grid-col-2 mt-6 mb-2', gridBorderStyles)}>
                  <PackageTableHeader className="col-span-2">
                    <TableHeaderTitle title={`Family ${index + 1}`} />
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
                  <PatentsInFamilyLink patents={patents} />
                </div>
              </div>
            );
          })}
        </div>
        <ViewPackagePatentsModal />
      </ViewPackagePatentsProvider>
    </div>
  );
};
