import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  GroupingState,
  useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';

import './styles.css';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header-cell';
import { CellContext } from '@tanstack/table-core/src/core/cell';
import {
  RowCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/row-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import format from 'date-fns/format';

type Patent = {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationDateEpodoc: string;
  familyId: string;
}

const defaultData: Patent[] = patentsMock;

const columnHelper = createColumnHelper<Patent>();

const columns: ColumnDef<Patent, any>[] = [
  columnHelper.group({
      header: 'Family',
      id: 'familyId',
      enableGrouping: true,
      columns: [
        columnHelper.accessor('publicationNumber', {
          id: 'publicationNumber',
          header: () => <HeaderCell title='Publication/Patent no.' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell
            text={cellContext.getValue()} />
        }),
        columnHelper.accessor('title', {
          id: 'title',
          header: () => <HeaderCell title='Title' />,
          cell: (cellContext: CellContext<Patent, string>) =>
            <RowCell
              className='!font-medium'
              text={cellContext.getValue()}
            />
        }),
        columnHelper.accessor('status', {
          id: 'status',
          header: () => <HeaderCell title='Status' />,
          cell: (cellContext: CellContext<Patent, string>) =>
            <AtlusTag
              className='!text-xs !px-2 !py-[6px]'
              text={cellContext.getValue()}
            />
        }),
        columnHelper.accessor('applicantsOriginal', {
          id: 'applicantsOriginal',
          header: () => <HeaderCell title='Assignee' />,
          cell: (cellContext: CellContext<Patent, string[]>) => {
            return <RowCell
              className='whitespace-break-spaces'
              text={cellContext.getValue().join(' &\n')}
            />;
          }
        }),
        columnHelper.accessor('applicationNumber', {
          id: 'applicationNumber',
          header: () => <HeaderCell title='Application No.' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell
            text={cellContext.getValue()} />
        }),
        columnHelper.accessor('applicationDateEpodoc', {
          id: 'applicationDateEpodoc',
          header: () => <HeaderCell title='Application date' />,
          cell: (cellContext: CellContext<Patent, string>) => {
            const date = Date.parse(cellContext.getValue());
            return <RowCell text={format(date, 'dd  MMM yyyy')} />;
          }
        }),
        columnHelper.accessor('familyId', {
          header: () => <HeaderCell title='Family ID' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
        })
      ]
    }
  )
];

export const PatentsTable = () => {
  console.log('---------------------------------------------');
  const [data, setData] = useState(() => [...defaultData]);
  const [grouping, setGrouping] = useState<GroupingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  });
  console.log('groupingState: ', grouping);

  return (
    <div className='p-2'>
      <table>
        <thead className='text-left whitespace-nowrap'>
          {table.getHeaderGroups().map(headerGroup => {
            console.log('****** headerGroup: ', headerGroup);
            return (
              <tr key={headerGroup.id}  {...headerGroup}>
                {headerGroup.headers.map(header => {
                    console.log(`headerId: ${header.id}: canGroup`, header.column.getCanGroup());
                    return (
                      <th key={header.id} className='px-4'>
                        {header.isPlaceholder
                          ? null
                          : headerGroup.depth === 0 ?
                            <div>
                              <button onClick={header.column.getToggleGroupingHandler()}>
                                {header.column.getIsGrouped() ? 'Grouped' : 'Group'}
                              </button>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  }
                )}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='bg-white'>
              {<>{console.log(row.getVisibleCells())}</>}
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='pt-5 pb-8 px-4'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
