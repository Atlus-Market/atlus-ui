import { Row } from '@tanstack/react-table';
import { ExpandedState } from '@tanstack/table-core/src/features/Expanding';
import {
  PatentTableData,
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


export interface PatentsFamilyRowsGroup {
  parentRow: Row<TableData<any>>;
  childRows: Row<TableData<any>>[];
}

export const makeFamilyRowGroups = (rows: Row<PatentTableData>[]): PatentsFamilyRowsGroup[] => {
  let result: PatentsFamilyRowsGroup[] = [];

  let familyGroup: PatentsFamilyRowsGroup;
  rows.forEach(row => {
    if (row.getCanExpand()) {
      familyGroup = {
        parentRow: row,
        childRows: []
      };
      result.push(familyGroup);
    } else {
      familyGroup.childRows.push(row);
    }
  });

  console.log('FamilyGroups: ', result);
  return result;
};
