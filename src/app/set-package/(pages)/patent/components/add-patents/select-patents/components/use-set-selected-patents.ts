import { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';


export const useSetSelectedPatents = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    console.log('rowSelectionState: ', rowSelection);
    const selectedRowsCount = Object.keys(rowSelection).filter(key => key.toString().indexOf('.') !== -1).length;
    console.log('selectedRow count: ', selectedRowsCount);
  }, [rowSelection]);

  return {
    rowSelection,
    setRowSelection
  }
};
