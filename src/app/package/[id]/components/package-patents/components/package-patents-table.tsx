import { Patent } from '@/models/patent';
import clsx from 'clsx';
import { PackageTableHeader } from '@/app/package/[id]/components/package-patents/components/package-table-header';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { getPatentId, getPatentReadableAssignees, groupPatentsByFamily } from '@/utils/patents';
import { Fragment } from 'react';
import { PackageTableCell } from '@/app/package/[id]/components/package-patents/components/package-table-cell';
import { PackageTablePatentTitle } from '@/app/package/[id]/components/package-patents/components/package-table-patent-title';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/package-table-patent-id';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/package-table-application-date';

export type PackagePatentsTableType = 'compact' | 'full';

interface PackagePatentsTableProps {
  patents: Patent[];
  type: PackagePatentsTableType;
}

export const gridBorderStyles = clsx(
  'border border-light-grey-2 overflow-hidden',
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
          'grid-cols-4': isCompact,
          'grid-cols-[repeat(5,_200px)] overflow-x-auto': isFull,
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

      {patentsGroups.map((patentsGroup, index) => {
        const patentsToRender = isCompact ? [patentsGroup[0]] : patentsGroup;
        return patentsToRender.map(patent => {
          const patentId = getPatentId(patent);
          const isLastRow = patentsGroups.length - 1 === index;
          return (
            <Fragment key={patentId}>
              <PackageTableCell
                className={clsx({
                  'col-span-2': isCompact,
                  '!border-b-0': isLastRow,
                })}
              >
                <PackageTablePatentTitle title={patent.title} />
                {isCompact && patentsGroup.length > 1 && (
                  <div className="mt-3">
                    <PatentsInFamilyLink patents={patentsGroup} />
                  </div>
                )}
              </PackageTableCell>
              <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                <PackageTablePatentId patentId={patentId} />
              </PackageTableCell>
              {isFull && (
                <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                  {getPatentReadableAssignees(patent)}
                </PackageTableCell>
              )}
              {isFull && (
                <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                  {patent.applicationNumber}
                </PackageTableCell>
              )}
              <PackageTableCell className={clsx({ '!border-b-0': isLastRow })}>
                <PackageTableApplicationDate gmtDate={patent.applicationDate} />
              </PackageTableCell>
            </Fragment>
          );
        });
      })}
    </div>
  );
};
