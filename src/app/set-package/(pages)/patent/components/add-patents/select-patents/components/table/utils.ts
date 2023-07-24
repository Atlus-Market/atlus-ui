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


export const getCheckboxState2 = <T>(row: Row<T>): CheckBoxState => {
  const { id } = row;
  const hasSubRows = row.getCanExpand();


  if (hasSubRows) {
    const checked = row.getIsAllSubRowsSelected();
    const indeterminate = row.getIsSomeSelected();

    return {
      checked: row.getIsAllSubRowsSelected(),
      indeterminate: row.getIsSomeSelected()
    };
  }

  const parent = row.getParentRow();
  if (parent?.getIsSomeSelected()) {
    return {
      checked: false,
      indeterminate: true
    };
  }

  if (parent?.getIsAllSubRowsSelected()) {
    return {
      checked: true,
      indeterminate: false
    };
  }

  return {
    checked: false,
    indeterminate: false
  };

};

export const getCheckboxState = <T>(row: Row<T>): CheckBoxState => {
  const hasSubRows = row.getCanExpand();

  if (hasSubRows) {
    const indeterminate = row.getIsSomeSelected();
    return {
      checked: row.getIsAllSubRowsSelected(),
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
        childRows: [...row.subRows]
      };
      result.push(familyGroup);
    }
  });
  return result;
};
