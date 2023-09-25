import { Patent } from '@/models/patent';
import { getPatentId, groupPatentsByFamily } from '@/utils/patents';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { Fragment } from 'react';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/package-table-application-date';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/package-table-patent-id';
import { PackageTablePatentTitle } from '@/app/package/[id]/components/package-patents/components/package-table-patent-title';
import { PackageTableHeader } from '@/app/package/[id]/components/package-patents/components/package-table-header';
import { PackageTableCell } from '@/app/package/[id]/components/package-patents/components/package-table-cell';
import clsx from 'clsx';
import { ViewPackagePatentsProvider } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-provider';
import { ViewPackagePatentsModal } from '@/app/package/[id]/components/package-patents/components/view-package-patents/view-package-patents-modal';

interface PackagePatentsTableCompactProps {
  patents: Patent[];
}

const gridBorderStyles = clsx(
  'border border-light-grey-2 overflow-hidden',
  'rounded-tl-lg rounded-tr-lg md:rounded-tl-xl md:rounded-tr-xl',
  'rounded-br-xl rounded-bl-xl'
);

export const PackagePatentsTableCompact = ({ patents }: PackagePatentsTableCompactProps) => {
  const familyPatents = groupPatentsByFamily(patents);
  const patentsGroups = Object.values(familyPatents);
  return (
    <div>
      <ViewPackagePatentsProvider>
        <div className="hidden md:block">
          <div className={clsx('grid grid-cols-4', gridBorderStyles)}>
            <PackageTableHeader className="col-span-2">
              <TableHeaderTitle title="Title" />
            </PackageTableHeader>
            <PackageTableHeader>
              <TableHeaderTitle title="Publication/Patent no." />
            </PackageTableHeader>
            <PackageTableHeader>
              <TableHeaderTitle title="Filling date" />
            </PackageTableHeader>
            {patentsGroups.map((patents, index) => {
              const patent = patents[0];
              const patentId = getPatentId(patent);
              const isLastRow = patentsGroups.length - 1 === index;
              return (
                <Fragment key={patentId}>
                  <PackageTableCell className={clsx('col-span-2', { '!border-b-0': isLastRow })}>
                    <PackageTablePatentTitle title={patent.title} />
                    {patents.length > 1 && (
                      <div className="mt-3">
                        <PatentsInFamilyLink patents={patents} />
                      </div>
                    )}
                  </PackageTableCell>
                  <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                    <PackageTablePatentId patentId={patentId} />
                  </PackageTableCell>
                  <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                    <PackageTableApplicationDate gmtDate={patent.applicationDate} />
                  </PackageTableCell>
                </Fragment>
              );
            })}
          </div>
        </div>

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
