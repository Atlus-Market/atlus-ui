import { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useAppDispatch } from '@/redux/hooks';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { selectPatents } from '@/redux/features/set-package/set-package';


interface UseSetSelectedPatentsProps {
  table: Table<PatentTableData>;
}

export const useSetSelectedPatents = ({ table }: UseSetSelectedPatentsProps) => {
  const dispatch = useAppDispatch();

  const selectedRowModel = table.getSelectedRowModel();

  useEffect(() => {
    const patents = selectedRowModel.flatRows
      .filter(row => !!row.getParentRow()) // filter parent Rows
      .map(row => row.original); // get original patent from child row

    dispatch(selectPatents({ patents }));
  }, [dispatch, selectedRowModel]);
};
