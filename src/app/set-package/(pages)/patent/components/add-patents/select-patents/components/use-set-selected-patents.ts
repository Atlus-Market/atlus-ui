import { useEffect } from 'react';
import { RowSelectionState } from '@tanstack/react-table';

interface UseSetSelectedPatentsProps {
  rowSelectionState: RowSelectionState;
}

export const useSetSelectedPatents = ({ rowSelectionState }: UseSetSelectedPatentsProps) => {
  useEffect(() => {
    console.log('rowSelectionState: ', rowSelectionState);
    const selectedRowsCount = Object.keys(rowSelectionState).filter(key => key.toString().indexOf('.') !== -1).length;
    console.log('selectedRow count: ', selectedRowsCount);
  }, [rowSelectionState]);
};
