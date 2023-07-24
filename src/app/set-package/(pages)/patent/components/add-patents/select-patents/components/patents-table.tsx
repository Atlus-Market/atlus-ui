import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { RowData } from '@tanstack/table-core/src/types';

import './styles.css';
import {
  getInitialExpandedState,
  makeFamilyRowGroups
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/utils';
import {
  PatentsFamilyGroup
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/patents-family-group';
import {
  HeaderRow
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-row';
import {
  usePatentsColumns
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/column/use-patents-columns';
import {
  useSetSelectedPatents
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/use-set-selected-patents';
import { Patent } from '@/models/patent';
import {
  useGroupPatentsByFamily
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/use-group-patents-by-family';
import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';

export type TableData<T extends RowData> = T & {
  subRows?: TableData<T>[];
}

export type PatentTableData = TableData<Patent>;

export const PatentsTable = () => {
  const groupPatentsByFamily = useGroupPatentsByFamily({ patents: patentsMock });
  console.log('useGroupPatentsByFamily: ', groupPatentsByFamily);
  const [data, setData] = useState(groupPatentsByFamily);

  const [expanded, setExpanded] = useState<ExpandedState>(getInitialExpandedState(groupPatentsByFamily));
  console.log('expandedState: ', expanded);

  const {
    rowSelection,
    setRowSelection
  } = useSetSelectedPatents();
  const columns = usePatentsColumns({ rowSelection, setRowSelection });

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      rowSelection
    },
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  const tableRows = table.getRowModel().rows;
  // This grouping is used to render only first row and expand the rest.
  const patentsFamilyGroups = makeFamilyRowGroups(tableRows);

  return (
    <table>
      <thead className='text-left whitespace-nowrap'>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => <HeaderRow key={header.id} header={header} />)}
          </tr>
        ))}
      </thead>
      <tbody>
        {patentsFamilyGroups.map(patentsGroup =>
          <PatentsFamilyGroup
            key={patentsGroup.parentRow.id}
            patentsFamilyGroup={patentsGroup} table={table}
          />
        )}
      </tbody>
    </table>
  );
};
