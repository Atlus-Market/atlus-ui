import { useMemo } from 'react';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-cell';
import {
  getCheckboxState
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
          console.log(`&&&& cell:rowSelection ${row.id} &&&&`, rowSelection);
          const Checkbox = () => {
            const checkboxState = getCheckboxState<PatentTableData>(row);
            return <AtlusCheckbox
              checked={checkboxState.checked}
              indeterminate={checkboxState.indeterminate}
              onChange={e => {
                console.log('******************** Row Checkbox ID: ', row.id, '********************');

                // @ts-ignore
                const checkboxState = e.target.checked;
                // setRowSelection({ ...rowSelection, [row.id]: checkboxState });
                console.log('--- target value ---', checkboxState);

                if (row.getCanExpand()) {
                  console.log('row.getIsSelected: ', row.getIsSelected());
                  console.log('row.getIsSomeSelected: ', row.getIsSomeSelected());
                  console.log('row.getIsAllSubRowsSelected: ', row.getIsAllSubRowsSelected());
                }

                const parentRow = row.getParentRow();
                if (parentRow) {
                  row.getToggleSelectedHandler()(e);

                  console.log('parentRow.getIsSelected: ', parentRow.getIsSelected());
                  console.log('parentRow.getIsSomeSelected: ', parentRow.getIsSomeSelected());
                  console.log('parentRow.getIsAllSubRowsSelected: ', parentRow.getIsAllSubRowsSelected());
                  // if (parentRow.getIsAllSubRowsSelected()) {
                  //   parentRow.toggleSelected(true);
                  // } else if (!parentRow.getIsSomeSelected() && !parentRow.getIsAllSubRowsSelected()) {
                  //   parentRow.toggleSelected(false);
                  // }
                } else {
                  if (!checkboxState && row.getIsAllSubRowsSelected()) {
                    row.toggleSelected(false);
                  }
                  // row.toggleSelected(checkboxState);
                }
              }}
            />;
          };

          if (row.getCanExpand()) {
            const selectedRowsCount = row.subRows.filter(r => r.getIsSelected()).length;
            return (
              <div className='select-family-cell'>
                <Checkbox />
                {/*<button*/}
                {/*  {...{*/}
                {/*    onClick: row.getToggleExpandedHandler(),*/}
                {/*    style: { cursor: 'pointer' }*/}
                {/*  }}>*/}
                {/*  {row.getIsExpanded() ? '👇' : '👉'}*/}
                {/*</button>*/}
                {/*<button onClick={() => {*/}
                {/*  row.toggleSelected(false);*/}
                {/*}}>unSelect*/}
                {/*</button>*/}
                <span
                  className='text-dark-grey text-sm font-normal leading-[17px] inline-block ml-5'>
                   <span
                     className='text-soft-black'>Select Family</span>
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
        header: () => <HeaderCell title='Assignee' />,
        cell: (cellContext) => {
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell
            className='whitespace-break-spaces inline-block !w-[187px]'
            text={(cellContext.getValue() as string[]).join(' &\n')}
          />;
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
        accessorKey: 'applicationDateEpodoc',
        header: () => <HeaderCell title='Application date' />,
        cell: (cellContext) => {
          const date = Date.parse(cellContext.getValue().toString());
          if (cellContext.row.getCanExpand()) {
            return null;
          }
          return <RowCell text={format(date, 'dd  MMM yyyy')} />;
        }
      }
    ],
    [rowSelection]
  );
};
