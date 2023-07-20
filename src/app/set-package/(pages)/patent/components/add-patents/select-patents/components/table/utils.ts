import { Row } from '@tanstack/react-table';
import { ExpandedState } from '@tanstack/table-core/src/features/Expanding';
import {
  TableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';


export interface CheckBoxState {
  checked: boolean;
  indeterminate: boolean;
}

export const getCheckboxState = <T>(row: Row<T>): CheckBoxState => {
  const hasSubRows = row.getCanExpand();

  if (hasSubRows) {
    const indeterminate = row.getIsSomeSelected();
    return {
      checked: !indeterminate && row.getIsAllSubRowsSelected(),
      indeterminate
    };
  }

  // is a subRow
  return {
    indeterminate: false,
    checked: row.getIsSelected()
  };
};

export const getInitialExpandedState = <T>(tableData: TableData<T>[]): ExpandedState => {
  const numberOfRows = tableData.length;
  const expandedState: ExpandedState = {};
  for (let i = 0; i < numberOfRows; i++) {
    expandedState[i] = true;
  }
  return expandedState;
};
