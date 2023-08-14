import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RowData } from '@tanstack/table-core/src/types';

import './styles.css';
import {
  getInitialExpandedState,
  makeFamilyRowGroups
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/table/utils';
import {
  PatentsFamilyGroup
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/table/patents-family-group';
import {
  HeaderRow
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/table/header/header-row';
import {
  usePatentsColumns
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/table/column/use-patents-columns';
import { Patent } from '@/models/patent';
import {
  useGroupPatentsByFamily
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/use-group-patents-by-family';
import {
  selectFetchedPatents,
  selectRowSelectionState
} from '@/redux/features/set-package/selectors/add-patents-selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  PatentsRowSelectionState
} from '@/redux/features/set-package/slices/add-patents/slices/select-patents';
import { setRowSelectionState } from '@/redux/features/set-package/set-package';
import {
  useSetSelectedPatents
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/use-set-selected-patents';

export type TableData<T extends RowData> = T & {
  subRows?: TableData<T>[];
}

export type PatentTableData = TableData<Patent>;

export const PatentsTable = () => {
  const fetchedPatents = useAppSelector(selectFetchedPatents);
  const rowSelectionState = useAppSelector(selectRowSelectionState);
  const groupPatentsByFamily = useGroupPatentsByFamily({ patents: fetchedPatents });
  const dispatch = useAppDispatch();
  console.log('useGroupPatentsByFamily: ', groupPatentsByFamily);

  const updateRowSelectionState = useCallback(
    (rowSelectionState: PatentsRowSelectionState) => dispatch(setRowSelectionState({ rowSelectionState }))
    , []);

  const [data, setData] = useState(groupPatentsByFamily);
  const [expanded, setExpanded] = useState<ExpandedState>(getInitialExpandedState(groupPatentsByFamily));
  const columns = usePatentsColumns({
    rowSelectionState: rowSelectionState,
    setRowSelection: updateRowSelectionState
  });

  useEffect(() => {
    setData(groupPatentsByFamily);
  }, [groupPatentsByFamily]);

  console.log('data: ', data);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      rowSelection: rowSelectionState // Used so rows can read their selection state
    },
    onExpandedChange: setExpanded,

    /**
     * DO NOT USE because parent row state is not updated correctly.
     * If all children rows are  selected and then one by one are deselected,
     * parent row remains in a selected (checked) state after all children have
     * been deselected.
     * Same bug is happening in @tanstack/react-table selection examples.
     */
    // onRowSelectionChange: setRowSelectionState,

    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  const tableRows = table.getRowModel().rows;
  const patentsFamilyGroups = useMemo(() => {
    // This grouping is used to render only first row and expand the rest.
    return makeFamilyRowGroups(tableRows);
  }, [tableRows]);

  useSetSelectedPatents({ table });

  const hasFetchedPatents = fetchedPatents?.length > 0;
  if (!hasFetchedPatents) {
    return (
      <div className='w-full text-center p-5'>
        <span>No patents were found.</span>
      </div>
    );
  }

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
