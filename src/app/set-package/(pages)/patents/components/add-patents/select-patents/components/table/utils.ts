import { Row, RowSelectionState } from '@tanstack/react-table';
import { ExpandedState } from '@tanstack/table-core/src/features/Expanding';
import {
  PatentTableData,
  TableData,
} from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/patents-table';

export interface CheckBoxState {
  checked: boolean;
  indeterminate: boolean;
}

const isNullOrUndefined = (value: unknown): boolean => value === undefined || value === null;

export const getUpdatedSelectedRowsState = <T>(
  row: Row<T>,
  rowSelectionState: RowSelectionState
): RowSelectionState => {
  const parentRow = row.getParentRow();
  const isParentRow = !parentRow;
  const id = row.id;
  const currentCheckedState = rowSelectionState[id];
  const checkedStateToSet = isNullOrUndefined(currentCheckedState) ? true : !currentCheckedState;
  const clonedRowSelectionState = {
    ...rowSelectionState,
    [id]: checkedStateToSet,
  };

  if (isParentRow) {
    row.subRows.forEach(childRow => {
      clonedRowSelectionState[childRow.id] = checkedStateToSet;
    });
    return clonedRowSelectionState;
  }

  if (!parentRow) {
    return rowSelectionState;
  }

  const allChildrenHaveTheSameValue = parentRow.subRows.every(
    childRow => clonedRowSelectionState[childRow.id] === checkedStateToSet
  );

  if (allChildrenHaveTheSameValue) {
    // if all children have the same value, then the parent must have the same value too
    clonedRowSelectionState[parentRow.id] = checkedStateToSet;
  } else {
    // If some children are selected, then the parent row is selected
    clonedRowSelectionState[parentRow.id] = true;
  }

  return clonedRowSelectionState;
};

export const getCheckboxState = <T>(
  row: Row<T>,
  rowSelectionState: RowSelectionState
): CheckBoxState => {
  const { id } = row;
  const parentRow = row.getParentRow();
  const isParentRow = !parentRow;

  if (isParentRow) {
    const checked = row.subRows.every(childRow => rowSelectionState[childRow.id]);
    const indeterminate = !checked && row.subRows.some(childRow => rowSelectionState[childRow.id]);
    return {
      checked,
      indeterminate,
    };
  }

  // is a subRow
  return {
    indeterminate: false,
    checked: rowSelectionState[id],
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
  console.log('makeFamilyRowGroups:rows: ', rows);
  let result: PatentsFamilyRowsGroup[] = [];
  let familyGroup: PatentsFamilyRowsGroup;
  rows.forEach(row => {
    if (row.getCanExpand()) {
      familyGroup = {
        parentRow: row,
        childRows: [...row.subRows],
      };
      result.push(familyGroup);
    }
  });
  return result;
};
