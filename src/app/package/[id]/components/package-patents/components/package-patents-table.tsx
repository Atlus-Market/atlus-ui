import clsx from 'clsx';
import { PackageTableHeader } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-header';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-components/table-header-title';
import { getPatentId, getPatentReadableAssignees, groupPatentsByFamily } from '@/utils/patents';
import { Fragment } from 'react';
import { PackageTableCell } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-cell';
import { PackageTablePatentTitle } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-patent-title';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-patent-id';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/table-components/package-table-application-date';
import { Patent } from '@/models/patent';

export type PackagePatentsTableType = 'compact' | 'full';

interface PackagePatentsTableProps {
  patents: Patent[];
  type: PackagePatentsTableType;
}

export const gridBorderStyles = clsx(
  'border border-light-grey overflow-hidden',
  'rounded-tl-lg rounded-tr-lg md:rounded-tl-xl md:rounded-tr-xl',
  'rounded-br-xl rounded-bl-xl'
);

export const PackagePatentsTable = ({ patents, type }: PackagePatentsTableProps) => {
  const familyPatents = groupPatentsByFamily(patents);
  const patentsGroups = Object.values(familyPatents);
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

      {patentsGroups.map((patentsGroup, patentsGroupIndex) => {
        const familyNumber = patentsGroupIndex + 1;
        const patentsToRender = isCompact ? [patentsGroup[0]] : patentsGroup;
        const isLastGroup = patentsGroups.length - 1 === patentsGroupIndex;

        return patentsToRender.map((patent, patentIndex) => {
          const patentId = getPatentId(patent);
          const isLastRow = patentsToRender.length - 1 === patentIndex;
          const cellBorderBottom = {
            'border-b border-b-light-grey': true,
            '!border-b-0': (isFull && isLastRow) || (isCompact && isLastGroup),
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
                {isCompact && patentsGroup.length > 1 && (
                  <div className="mt-3">
                    <PatentsInFamilyLink patents={patentsGroup} familyNumber={familyNumber} />
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
