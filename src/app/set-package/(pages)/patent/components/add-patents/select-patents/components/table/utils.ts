import { Row } from '@tanstack/react-table';


export interface CheckBoxState {
  checked: boolean;
  indeterminate: boolean;
}

export const getCheckboxState = <T>(row: Row<T>): CheckBoxState => {
  const hasSubRows = row.subRows.length > 0;

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
