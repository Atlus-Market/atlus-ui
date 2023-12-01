import clsx from 'clsx';
import { PackageTableHeader } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/package-table-header';
import { TableHeaderTitle } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/table-header-title';
import { getPatentId, getPatentReadableAssignees } from '@/utils/patents';
import { Fragment } from 'react';
import { PackageTableCell } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/package-table-cell';
import { PackageTablePatentTitle } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/package-table-patent-title';
import { PatentsInFamilyLink } from '@/app/(main)/package/[id]/components/package-patents/components/patents-in-family-link';
import { PackageTablePatentId } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/package-table-patent-id';
import { PackageTableApplicationDate } from '@/app/(main)/package/[id]/components/package-patents/components/table-components/package-table-application-date';
import { FamilyPatentGroup } from '@/app/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

export type PackagePatentsTableType = 'compact' | 'full';

interface PackagePatentsTableProps {
  familyPatents: FamilyPatentGroup;
  type: PackagePatentsTableType;
}

export const gridBorderStyles = clsx(
  'border border-light-grey overflow-hidden',
  'rounded-tl-lg rounded-tr-lg md:rounded-tl-xl md:rounded-tr-xl',
  'rounded-br-xl rounded-bl-xl'
);

export const PackagePatentsTable = ({ familyPatents, type }: PackagePatentsTableProps) => {
  const patentsFamilyId = Object.keys(familyPatents);
  const isCompact = type === 'compact';
  const isFull = type === 'full';

  return (
    <div
      className={clsx(
        {
          'hidden md:grid': isCompact,
          'grid w-max': isFull,
          'grid-cols-[repeat(4,minmax(50px,1fr))]': isCompact,
          'grid-cols-[repeat(5,minmax(50px,200px))] overflow-x-auto': isFull,
        },
        gridBorderStyles
      )}
    >
      <PackageTableHeader
        className={clsx({
          'col-span-2': isCompact,
        })}
      >
        <TableHeaderTitle title="Title" />
      </PackageTableHeader>
      <PackageTableHeader>
        <TableHeaderTitle title="Publication/Patent no." />
      </PackageTableHeader>
      {isFull && (
        <PackageTableHeader>
          <TableHeaderTitle title="Assignee" />
        </PackageTableHeader>
      )}
      {isFull && (
        <PackageTableHeader>
          <TableHeaderTitle title="Application no." />
        </PackageTableHeader>
      )}
      <PackageTableHeader>
        <TableHeaderTitle title="Filling date" />
      </PackageTableHeader>

      {patentsFamilyId.map((familyId, patentsGroupIndex) => {
        const patents = familyPatents[familyId];
        // const familyNumber = patentsGroupIndex + 1;
        const patentsToRender = isCompact ? [patents[0]] : patents;
        const isLastFamily = patentsFamilyId.length - 1 === patentsGroupIndex;

        return patentsToRender.map((patent, patentIndex) => {
          const patentId = getPatentId(patent);
          const isLastRow = patentsToRender.length - 1 === patentIndex;
          const cellBorderBottom = {
            'border-b border-b-light-grey': true,
            '!border-b-0': (isFull && isLastRow) || (isCompact && isLastFamily),
          };

          return (
            <Fragment key={patentId}>
              <PackageTableCell
                className={clsx(
                  {
                    'col-span-2': isCompact,
                    '!border-l-light-grey': isFull,
                  },
                  cellBorderBottom
                )}
              >
                <PackageTablePatentTitle title={patent.title} />
                {isCompact && familyId.length > 1 && (
                  <div className="mt-3">
                    <PatentsInFamilyLink familyPatentGroup={{ [familyId]: patents }} />
                  </div>
                )}
              </PackageTableCell>
              <PackageTableCell className={clsx(cellBorderBottom)}>
                <PackageTablePatentId patentId={patentId} />
              </PackageTableCell>
              {isFull && (
                <PackageTableCell className={clsx(cellBorderBottom)}>
                  {getPatentReadableAssignees(patent)}
                </PackageTableCell>
              )}
              {isFull && (
                <PackageTableCell className={clsx(cellBorderBottom)}>
                  {patent.applicationNumber}
                </PackageTableCell>
              )}
              <PackageTableCell className={clsx(cellBorderBottom)}>
                <PackageTableApplicationDate gmtDate={patent.applicationDate} />
              </PackageTableCell>
            </Fragment>
          );
        });
      })}
    </div>
  );
};
