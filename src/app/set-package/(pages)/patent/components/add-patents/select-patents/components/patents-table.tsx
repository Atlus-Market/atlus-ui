import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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

const columns = [
  columnHelper.accessor('publicationNumber', {
    header: () => <HeaderCell title='Publication/Patent no.' />,
    cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
  }),
  columnHelper.accessor('title', {
    header: () => <HeaderCell title='Title' />,
    cell: (cellContext: CellContext<Patent, string>) =>
      <RowCell
      className="!font-medium"
        text={cellContext.getValue()}
      />
  }),
  columnHelper.accessor('status', {
    header: () => <HeaderCell title='Status' />,
    cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
  }),
  columnHelper.accessor('applicantsOriginal', {
    header: () => <HeaderCell title='Assignee' />,
    cell: (cellContext: CellContext<Patent, string[]>) => {
      return <RowCell text={cellContext.getValue().join(' & ')} />;
    }
  }),
  columnHelper.accessor('applicationNumber', {
    header: () => <HeaderCell title='Application No.' />,
    cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
  }),
  columnHelper.accessor('applicationDateEpodoc', {
    header: () => <HeaderCell title='Application date' />,
    cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
  })
];

export const PatentsTable = () => {
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className='p-2'>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => {
            console.log('headerGroup: ', headerGroup);
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
