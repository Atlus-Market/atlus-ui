import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  RowSelectionState,
  useReactTable
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { groupBy } from 'lodash';
import { RowData } from '@tanstack/table-core/src/types';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import {
  RowCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/rows/row-cell';
import format from 'date-fns/format';

import './styles.css';
import {
  getCheckboxState,
  getInitialExpandedState,
  makeFamilyRowGroups
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/utils';
import { AtlusCheckbox } from '@/components/ui/checkbox/atlus-checkbox';
import {
  PatentsFamilyGroup
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/patents-family-group';
import {
  HeaderRow
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-row';
import { useSelector } from 'react-redux';
import {
  selectEnterPatentsIdsManuallyState
} from '@/redux/features/set-package/set-package.selectors';
import {
  useIsLoadingMock
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/is-loading-mock';
import AtlusLogo from '@/components/ui/atlus-logo';

export type TableData<T extends RowData> = T & {
  subRows?: TableData<T>[];
}

type Patent = {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationDateEpodoc: string;
  familyId: string;
}

export type PatentTableData = TableData<Patent>;

// const familyRows: PatentTableData[] = Object.keys(groupedPatents).map(familyIdKey => ({
//   familyId: familyIdKey,
//   publicationNumber: `familyId: ${familyIdKey}`,
//   applicationDateEpodoc: 'applicationDateEpodoc',
//   applicantsOriginal: [],
//   title: 'title',
//   status: 'status',
//   applicationNumber: 'applicationNumber',
//   subRows: groupedPatents[familyIdKey]
// }));


const createTableData = (patents: Patent[]): PatentTableData[] => {
  const groupedPatents = groupBy(patents, 'familyId');
  return Object.keys(groupedPatents).map(familyIdKey => ({
    familyId: familyIdKey,
    publicationNumber: `familyId: ${familyIdKey}`,
    applicationDateEpodoc: 'applicationDateEpodoc',
    applicantsOriginal: [],
    title: 'title',
    status: 'status',
    applicationNumber: 'applicationNumber',
    subRows: groupedPatents[familyIdKey]
  }));
};

export const PatentsTable = () => {
  const { isLoading } = useIsLoadingMock();
  const enterPatentsStateManuallyState = useSelector(selectEnterPatentsIdsManuallyState);
  const filteredPatents = patentsMock.filter(p => enterPatentsStateManuallyState.form.formValues.patentsIds.includes(p.applicationNumber));
  console.log('filteredPatents: ', filteredPatents);
  const familyRows = createTableData(filteredPatents);
  const [r, setR] = useState<Row<PatentTableData> | undefined>();

  useEffect(() => {
    if (!r) {
      return;
    }
    console.log('-------------------');
    console.log('parentRow.getIsSelected: ', r.getIsSelected());
    console.log('parentRow.getIsSomeSelected: ', r.getIsSomeSelected());
    console.log('parentRow.getIsAllSubRowsSelected: ', r.getIsAllSubRowsSelected());

    if (r.getCanExpand() && (!r.getIsSomeSelected() && !r.getIsAllSubRowsSelected())) {
      console.log('Setting parent to FALSE');
      r.toggleSelected(false);
    }
    setR(undefined);
    console.log('-------------------');
  }, [r]);

  const [data, setData] = useState(familyRows);
  const [expanded, setExpanded] = useState<ExpandedState>(getInitialExpandedState(familyRows));
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<PatentTableData, string | string[]>[]>(
    () => [
      {
        accessorKey: 'publicationNumber',
        header: ({ table }) => (
          <HeaderCell title='Publication/Patent no.' />
        ),
        cell: ({ row, getValue }) => {
          const Checkbox = () => {
            const checkboxState = getCheckboxState<PatentTableData>(row);
            return <AtlusCheckbox
              checked={checkboxState.checked}
              indeterminate={checkboxState.indeterminate}
              onChange={e => {
                console.log('******************** Row Checkbox ID: ', row.id, '********************');
                if (row.id === '0') {
                  console.log('row.getIsSelected: ', row.getIsSelected());
                  console.log('row.getIsSomeSelected: ', row.getIsSomeSelected());
                  console.log('row.getIsAllSubRowsSelected: ', row.getIsAllSubRowsSelected());
                }


                row.getToggleSelectedHandler()(e);
                const parentRow = row.getParentRow();
                if (parentRow) {
                  setR(parentRow);
                  // console.log('parentRow.getIsSelected: ', parentRow.getIsSelected());
                  // console.log('parentRow.getIsSomeSelected: ', parentRow.getIsSomeSelected());
                  // console.log('parentRow.getIsAllSubRowsSelected: ', parentRow.getIsAllSubRowsSelected());
                  //
                  // if (parentRow && parentRow.getCanExpand() && parentRow.getIsSelected() && (!parentRow.getIsSomeSelected() && !parentRow.getIsAllSubRowsSelected())) {
                  //   console.log('-------------------');
                  //   row.toggleSelected(false);
                  // }
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
          return <RowCell text={cellContext.getValue().toString()} />;
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
            className='whitespace-break-spaces'
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

  console.log('rowSelection: ', rowSelection);
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      rowSelection
    },
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  const patentsFamilyGroups = makeFamilyRowGroups(table.getRowModel().rows);

  if (isLoading) {
    return (
      <div className='h-[400px] text-center flex justify-center'>
        <AtlusLogo />
      </div>
    );
  }
  return (
    <table>
      <thead className='text-left whitespace-nowrap'>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => <HeaderRow key={header.id} header={header} />)}
          </tr>
        ))}
      </thead>
      <tbody>
        {patentsFamilyGroups.map(patentsGroup =>
          <PatentsFamilyGroup
            key={patentsGroup.parentRow.id}
            patentsFamilyGroup={patentsGroup} table={table}
          />
        )}
      </tbody>
    </table>
  );
};
