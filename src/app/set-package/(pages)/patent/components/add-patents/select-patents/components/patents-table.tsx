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
  useReactTable
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { groupBy } from 'lodash';
import { RowData } from '@tanstack/table-core/src/types';
import { Dictionary } from '@reduxjs/toolkit';
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

const groupedPatents: Dictionary<Patent[]> = groupBy(patentsMock, 'familyId');

const familyRows: PatentTableData[] = Object.keys(groupedPatents).map(familyIdKey => ({
  familyId: familyIdKey,
  publicationNumber: `familyId: ${familyIdKey}`,
  applicationDateEpodoc: 'applicationDateEpodoc',
  applicantsOriginal: [],
  title: 'title',
  status: 'status',
  applicationNumber: 'applicationNumber',
  subRows: groupedPatents[familyIdKey]
}));

export const PatentsTable = () => {
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
              onChange={row.getToggleSelectedHandler()}
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
    []
  );

  const [data, setData] = useState(familyRows);
  const [expanded, setExpanded] = useState<ExpandedState>(getInitialExpandedState(familyRows));

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const patentsFamilyGroups = makeFamilyRowGroups(table.getRowModel().rows);
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
