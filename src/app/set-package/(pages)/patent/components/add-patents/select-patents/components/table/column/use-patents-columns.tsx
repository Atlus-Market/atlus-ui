import { useCallback, useMemo } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-cell';
import {
  getCheckboxState,
  getUpdatedSelectedRowsState
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/utils';
import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import {
  RowCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/rows/row-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import format from 'date-fns/format';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import {
  NO_FAMILY_GROUP_ID
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/use-group-patents-by-family';
import { pluralize } from '@/utils/words';
import { RowSelectionState } from '@tanstack/table-core/src/features/RowSelection';
import { parseGMTDate } from '@/utils/date';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setEditingPatent, showSetPatentModal } from '@/redux/features/set-package/set-package';
import {
  selectEditedPatentsIds
} from '@/redux/features/set-package/selectors/add-patents-selectors';


interface UsePatentsColumnsProps {
  rowSelection: RowSelectionState;
  setRowSelection: (rowSelection: RowSelectionState) => void;
}

const rowHasFamilyId = (row: Row<PatentTableData>): boolean => {
  return row.original.familyId !== NO_FAMILY_GROUP_ID;
};

const hasRowBeenEdited = (row: Row<PatentTableData>, editedPatentsIds: string[]): boolean => {
  return editedPatentsIds.includes(row.original.publicationNumber);
};

export const usePatentsColumns = ({ rowSelection, setRowSelection }: UsePatentsColumnsProps) => {
  const dispatch = useAppDispatch();
  const editedPatents = useAppSelector(selectEditedPatentsIds);

  const editPatent = useCallback((patentId: string) => {
    dispatch(setEditingPatent({ publicationNumber: patentId }));
    dispatch(showSetPatentModal());
  }, []);

  return useMemo<ColumnDef<PatentTableData, string | string[]>[]>(
    () => [
      {
        accessorKey: 'publicationNumber',
        header: ({ table }) => (
          <HeaderCell title='Publication/Patent no.' />
        ),
        cell: ({ row, getValue }) => {
          const Checkbox = () => {
            const checkboxState = getCheckboxState<PatentTableData>(row, rowSelection);
            return <AtlusCheckbox
              checked={checkboxState.checked}
              indeterminate={checkboxState.indeterminate}
              onChange={e => {
                row.getToggleSelectedHandler()(e);
                setRowSelection(getUpdatedSelectedRowsState(row, rowSelection));
              }}
            />;
          };

          const hasFamilyId = rowHasFamilyId(row);

          if (row.getCanExpand()) {
            if (!hasFamilyId) {
              const noPatentsCount = row.subRows.length;
              return (
                <div className='select-family-cell'>
                  <span className='text-dark-grey text-sm font-normal leading-[17px] inline-block'>
                    {noPatentsCount} {pluralize('assets', noPatentsCount)} not found in the public patent database
                  </span>
                </div>
              );
            }

            const selectedRowsCount = row.subRows.filter(childRow => rowSelection[childRow.id]).length;
            return (
              <div className='select-family-cell'>
                <Checkbox />
                <span
                  className='text-dark-grey text-sm font-normal leading-[17px] inline-block ml-5'>
                   <span className='text-soft-black'>Select Family</span>
                  {selectedRowsCount > 0 &&
                    <span
                      className='inline-block ml-1'>
                      ({selectedRowsCount} out of {row.subRows.length} selected)
                    </span>
                  }
                </span>
              </div>
            );
          }

          const isEditedRow = hasRowBeenEdited(row, editedPatents);
          return (
            <div className='flex items-center gap-5'>
              {(hasFamilyId || isEditedRow) && <Checkbox />}
              <div className='flex flex-col items-start'>
                <RowCell text={getValue().toString()} />
                {isEditedRow &&
                  <AtlusButton
                    variant='clear'
                    color='orange'
                    className='text-xs mt-2 font-medium'
                    onClick={() => editPatent(row.original.publicationNumber)}>
                    Edit details
                  </AtlusButton>}
              </div>
            </div>
          );
        }
      },
      {
        accessorKey: 'title',
        cell: ({ row, getValue }) => {
          if (row.getCanExpand()) {
            return <div className='select-family-cell' />;
          }

          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);
          if (hasNoFamilyId && !isEditedRow) {
            return (
              <div>
                <AtlusButton
                  variant='outline'
                  size='medium'
                  onClick={() => editPatent(row.original.publicationNumber)}>
                  Add Details
                </AtlusButton>
              </div>
            );
          }

          return <RowCell text={getValue().toString()}
                          className='inline-block !w-[248px]' />;
        },
        header: () => <HeaderCell title='Title' />
      },
      {
        accessorKey: 'status',
        header: () => <HeaderCell title='Status' />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          return <AtlusTag
            className='!text-xs !px-2 !py-[6px]'
            text={getValue().toString()}
          />;
        }
      },
      {
        accessorKey: 'applicantsOriginal',
        accessorFn: row => row.applicantsOriginal ?? [],
        header: () => <HeaderCell title='Assignee' />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          const applicants = (getValue() as string[]) ?? [];
          return (
            <RowCell
              className='whitespace-break-spaces inline-block !w-[187px]'
              text={applicants.join(' &\n')}
            />
          );
        }
      },
      {
        accessorKey: 'applicationNumber',
        header: () => <HeaderCell title='Application No.' />,
        cell: ({ row, getValue }) => {
          const hasNoFamilyId = !rowHasFamilyId(row);
          const isEditedRow = hasRowBeenEdited(row, editedPatents);

          if (row.getCanExpand() || (hasNoFamilyId && !isEditedRow)) {
            return null;
          }

          return <RowCell text={getValue().toString()} />;
        }
      },
      {
        accessorKey: 'applicationReferenceEpodoc',
        accessorFn: row => row?.applicationReferenceEpodoc?.date,
        header: () => <HeaderCell title='Application date' />,
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
        }
      }
    ],
    [rowSelection, setRowSelection, editedPatents, editPatent]
  );
};
