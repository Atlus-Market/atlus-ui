import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react';
import { groupBy } from 'lodash';
import { RowData } from '@tanstack/table-core/src/types';
import { Dictionary } from '@reduxjs/toolkit';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import {
  RowCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/row-cell';
import format from 'date-fns/format';

import './styles.css';
import clsx from 'clsx';

type TableData<T extends RowData> = T & {
  subRows?: TableData<T>[];
}

type Patent = {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationDateEpodoc: string;
  familyId: string;
}

type PatentTableData = TableData<Patent>;

const groupedPatents: Dictionary<Patent[]> = groupBy(patentsMock, 'familyId');

const familyRows: PatentTableData[] = Object.keys(groupedPatents).map(familyIdKey => ({
  familyId: familyIdKey,
  publicationNumber: `familyId: ${familyIdKey}`,
  applicationDateEpodoc: 'applicationDateEpodoc',
  applicantsOriginal: [],
  title: 'title',
  status: 'status',
  applicationNumber: 'applicationNumber',
  subRows: groupedPatents[familyIdKey]
}));

export const PatentsTable = () => {
  const columns = useMemo<ColumnDef<PatentTableData, string | string[]>[]>(
    () => [
      {
        accessorKey: 'familyId',
        header: ({ table }) => (
          <HeaderCell title='Publication/Patent no.' />
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`
            }}>
            <>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler()
                }}
              />
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' }
                  }}
                >
                  {row.getIsExpanded() ? '👇' : '👉'} Select Family
                  ({row.subRows.filter(r => r.getIsSelected()).length} out
                  of {row.subRows.length} selected)
                </button>
              ) : (
                <RowCell text={getValue().toString()} />
              )}{' '}
            </>
          </div>
        )
      },
      {
        accessorKey: 'title',
        cell: cellContext => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell text={cellContext.getValue().toString()} />;
        },
        header: () => <HeaderCell title='Title' />
      },
      {
        accessorKey: 'status',
        header: () => <HeaderCell title='Status' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }

          return <AtlusTag
            className='!text-xs !px-2 !py-[6px]'
            text={cellContext.getValue().toString()}
          />;
        }
      },
      {
        accessorKey: 'applicantsOriginal',
        header: () => <HeaderCell title='Assignee' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell
            className='whitespace-break-spaces'
            text={(cellContext.getValue() as string[]).join(' &\n')}
          />;
        }
      },
      {
        accessorKey: 'applicationNumber',
        header: () => <HeaderCell title='Application No.' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell text={cellContext.getValue().toString()} />;
        }
      },
      {
        accessorKey: 'applicationDateEpodoc',
        header: () => <HeaderCell title='Application date' />,
        cell: (cellContext) => {
          const date = Date.parse(cellContext.getValue().toString());
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell text={format(date, 'dd  MMM yyyy')} />;
        }
      }
    ],
    []
  );

  const [data, setData] = useState(familyRows);
  console.log('data: ', data);

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true
  });

  return (
    <div className='p-2'>
      <div className='h-2' />
      <table>
        <thead className='text-left whitespace-nowrap'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className='px-4'>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id} className={clsx(
                row.getCanExpand() ? '' : 'bg-white'
              )}>
                {row.getVisibleCells().map(cell => {
                  if (row.getCanExpand()) {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={cell.id} className='pt-5 pb-8 px-4'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(expanded, null, 2)}</pre>
    </div>
  );
};

function IndeterminateCheckbox({
                                 indeterminate,
                                 className = '',
                                 ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
