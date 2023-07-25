import { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { useAppDispatch } from '@/redux/hooks';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { setPatents } from '@/redux/features/set-package/set-package';


interface UseSetSelectedPatentsProps {
  table: Table<PatentTableData>;
}

export const useSetSelectedPatents = ({ table }: UseSetSelectedPatentsProps) => {
  const dispatch = useAppDispatch();

  const selectedRowModel = table.getSelectedRowModel();
  useEffect(() => {
    const patents = selectedRowModel.flatRows.map(row => row.original);
    dispatch(setPatents({ patents }));
  }, [dispatch, selectedRowModel]);
};
