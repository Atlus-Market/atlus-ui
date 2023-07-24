import { Row } from '@tanstack/react-table';
import { ExpandedState } from '@tanstack/table-core/src/features/Expanding';
import {
  PatentTableData,
  TableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/use-group-patents-by-family';


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
  console.log('numberOfRows: ', numberOfRows);
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
  console.log('rows: ', rows);

  let familyGroup: PatentsFamilyRowsGroup;
  rows.forEach(row => {
    console.log('row.id: ', row.original.familyId, row.getCanExpand());
    if (row.original.familyId === NO_FAMILY_GROUP_ID) {
      console.log(row);
    }
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
