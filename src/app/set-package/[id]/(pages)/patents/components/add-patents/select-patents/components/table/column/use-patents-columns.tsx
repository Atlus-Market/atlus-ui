import { useCallback, useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { HeaderCell } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/header/header-cell';
import {
  getCheckboxState,
  getUpdatedSelectedRowsState,
} from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/utils';
import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import { RowCell } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/rows/row-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import format from 'date-fns/format';
import { PatentTableData } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { NO_FAMILY_GROUP_ID } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/use-table-group-patents-by-family';
import { pluralize } from '@/utils/words';
import { RowSelectionState } from '@tanstack/table-core/src/features/RowSelection';
import { parseGMTDate } from '@/utils/date';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditingPatent, showSetPatentModal } from '@/redux/features/set-package/set-package';
import { selectEditedPatentsIds } from '@/redux/features/set-package/selectors/add-patents.selectors';
import { EditingPatent } from '@/redux/features/set-package/slices/add-patents/slices/select-patents';
import { getPatentId, getPatentReadableAssignees } from '@/utils/patents';

interface UsePatentsColumnsProps {
  rowSelectionState: RowSelectionState;
  setRowSelection: (rowSelection: RowSelectionState) => void;
}

const rowHasFamilyId = (row: Row<PatentTableData>): boolean => {
  return row.original.familyId !== NO_FAMILY_GROUP_ID;
};

const hasRowBeenEdited = (row: Row<PatentTableData>, editedPatentsIds: string[]): boolean => {
  return editedPatentsIds.includes(getPatentId(row.original));
};

export const usePatentsColumns = ({
  rowSelectionState,
  setRowSelection,
}: UsePatentsColumnsProps) => {
  const dispatch = useAppDispatch();
  const editedPatents = useAppSelector(selectEditedPatentsIds);

  const editPatent = useCallback(
    (editingPatent: EditingPatent) => {
      dispatch(setEditingPatent(editingPatent));
      dispatch(showSetPatentModal());
    },
    [dispatch]
  );

  return useMemo<ColumnDef<PatentTableData, string | string[]>[]>(
    () => [
      {
        accessorKey: 'publicationNumber',
        accessorFn: row => getPatentId(row),
        header: ({ table }) => <HeaderCell title="Publication/Patent no." />,
        cell: ({ row, getValue }) => {
          const Checkbox = () => {
            const checkboxState = getCheckboxState<PatentTableData>(row, rowSelectionState);
            return (
              <AtlusCheckbox
                checked={checkboxState.checked}
                indeterminate={checkboxState.indeterminate}
                onChange={e => {
                  row.getToggleSelectedHandler()(e);
                  setRowSelection(getUpdatedSelectedRowsState(row, rowSelectionState));
                }}
              />
            );
          };

          const hasFamilyId = rowHasFamilyId(row);

          if (row.getCanExpand()) {
            if (!hasFamilyId) {
              const noPatentsCount = row.subRows.length;
              return (
                <div className="select-family-cell">
                  <span className="text-dark-grey text-sm font-normal leading-[17px] inline-block">
                    {noPatentsCount} {pluralize('assets', noPatentsCount)} not found in the public
                    patent database
                  </span>
                </div>
              );
            }

            const selectedRowsCount = row.subRows.filter(
              childRow => rowSelectionState[childRow.id]
            ).length;
            return (
              <div className="select-family-cell">
                <Checkbox />
                <span className="text-dark-grey text-sm font-normal leading-[17px] inline-block ml-5">
                  <span className="text-soft-black">Select Family {row.original.familyId}</span>
                  {selectedRowsCount > 0 && (
                    <span className="inline-block ml-1">
                      ({selectedRowsCount} out of {row.subRows.length} selected)
                    </span>
                  )}
                </span>
              </div>
            );
          }

          const isEditedRow = hasRowBeenEdited(row, editedPatents);
          return (
            <div className="flex items-start gap-5">
              {(hasFamilyId || isEditedRow) && <Checkbox />}
              <div className="flex flex-col items-start">
                <RowCell text={getValue()} />
                {isEditedRow && (
                  <AtlusButton
                    variant="clear"
                    color="orange"
                    className="text-xs mt-2 font-medium"
                    onClick={() =>
                      editPatent({
                        publicationNumber: getPatentId(row.original),
                        rowId: row.id,
                      })
                    }
                  >
                    Edit details
                  </AtlusButton>
                )}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'title',
        cell: ({ row, getValue }) => {
          if (row.getCanExpand()) {
            return <div className="select-family-cell" />;
          }

          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);
          if (hasNoFamilyId && !isEditedRow) {
            return (
              <div>
                <AtlusButton
                  variant="outline"
                  size="small"
                  onClick={() =>
                    editPatent({
                      publicationNumber: getPatentId(row.original),
                      rowId: row.id,
                    })
                  }
                >
                  Add Details
                </AtlusButton>
              </div>
            );
          }

          return <RowCell text={getValue()} className="inline-block !w-[248px]" />;
        },
        header: () => <HeaderCell title="Title" />,
      },
      {
        accessorKey: 'status',
        header: () => <HeaderCell title="Status" />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          return <AtlusTag className="!text-xs !px-2 !py-[6px]" text={getValue() as string} />;
        },
      },
      {
        accessorKey: 'assignees',
        accessorFn: row => row.applicants ?? [],
        header: () => <HeaderCell title="Assignee" />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          return (
            <RowCell
              className="whitespace-break-spaces inline-block !w-[187px]"
              text={getPatentReadableAssignees({ assignees: getValue() as string[] }, ' &\n')}
            />
          );
        },
      },
      {
        accessorKey: 'applicationNumber',
        header: () => <HeaderCell title="Application No." />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          return <RowCell text={getValue()} />;
        },
      },
      {
        accessorKey: 'applicationDate',
        accessorFn: row => row?.applicationDate,
        header: () => <HeaderCell title="Application date" />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          let dateStr = '-';
          const cellValue = getValue() as string;
          try {
            const date = parseGMTDate(cellValue);
            if (date) {
              dateStr = format(date, 'dd  MMM yyyy');
            }
          } catch (e) {
            console.error(`Error parsing date: ${getValue().toString()}`);
            console.error(e);
          }

          return <RowCell text={dateStr} />;
        },
      },
    ],
    [rowSelectionState, setRowSelection, editedPatents, editPatent]
  );
};
