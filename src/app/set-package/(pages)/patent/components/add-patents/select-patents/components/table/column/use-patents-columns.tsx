import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
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


interface UsePatentsColumnsProps {
  rowSelection: RowSelectionState;
  setRowSelection: (rowSelection: RowSelectionState) => void;
}

export const usePatentsColumns = ({ rowSelection, setRowSelection }: UsePatentsColumnsProps) => {
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

          if (row.getCanExpand()) {
            const isNoFamilyGroup = row.original.familyId === NO_FAMILY_GROUP_ID;
            if (isNoFamilyGroup) {
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

          return (
            <div className='flex items-center gap-5'>
              <Checkbox />
              <RowCell text={getValue().toString()} />
            </div>
          );
        }
      },
      {
        accessorKey: 'title',
        cell: cellContext => {
          if (cellContext.row.getCanExpand()) {
            return <div className='select-family-cell' />;
          }
          return <RowCell text={cellContext.getValue().toString()}
                          className='inline-block !w-[248px]' />;
        },
        header: () => <HeaderCell title='Title' />
      },
      {
        accessorKey: 'status',
        header: () => <HeaderCell title='Status' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }

          return <AtlusTag
            className='!text-xs !px-2 !py-[6px]'
            text={cellContext.getValue().toString()}
          />;
        }
      },
      {
        accessorKey: 'applicantsOriginal',
        accessorFn: row => row.applicantsOriginal ?? [],
        header: () => <HeaderCell title='Assignee' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }

          const applicants = (cellContext.getValue() as string[]) ?? [];
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
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell text={cellContext.getValue().toString()} />;
        }
      },
      {
        accessorKey: 'applicationReferenceEpodoc',
        accessorFn: row => row?.applicationReferenceEpodoc?.date,
        header: () => <HeaderCell title='Application date' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }

          let dateStr = '-';
          const cellValue = cellContext.getValue() as string;
          try {
            const date = parseGMTDate(cellValue);
            if (date) {
              dateStr = format(date, 'dd  MMM yyyy');
            }
          } catch (e) {
            console.error(`Error parsing date: ${cellContext.getValue().toString()}`);
            console.error(e);
          }

          return <RowCell text={dateStr} />;
        }
      }
    ],
    [rowSelection, setRowSelection]
  );
};
