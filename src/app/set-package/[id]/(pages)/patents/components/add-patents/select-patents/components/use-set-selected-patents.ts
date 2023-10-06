import { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PatentTableData } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { setSelectedTablePatentIds } from '@/redux/features/set-package/set-package';
import { selectRowSelectionState } from '@/redux/features/set-package/selectors/add-patents.selectors';
import { getPatentId } from '@/utils/patents';

interface UseSetSelectedPatentsProps {
  table: Table<PatentTableData>;
}

export const useSetSelectedPatents = ({ table }: UseSetSelectedPatentsProps) => {
  const dispatch = useAppDispatch();
  const rowSelectionState = useAppSelector(selectRowSelectionState);
  const rowsById = table.getRowModel().rowsById;

  useEffect(() => {
    const patentIds = Object.keys(rowSelectionState)
      .filter(rowId => rowSelectionState[rowId]) // Keep rows with true selection value
      .map(rowId => rowsById[rowId]) // get the rows
      .filter(row => !!row.getParentRow()) // filter parent Rows
      .map(row => getPatentId(row.original)); // get original patent from child row

    dispatch(setSelectedTablePatentIds({ patentIds }));
  }, [dispatch, rowsById, rowSelectionState]);
};
