import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  Column,
  ColumnDef,
  createColumnHelper, ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel, getFilteredRowModel,
  getGroupedRowModel, getPaginationRowModel,
  GroupingState, Table,
  useReactTable
} from '@tanstack/react-table';
import { HTMLProps, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import './styles.css';
import {
  HeaderCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header-cell';
import { CellContext } from '@tanstack/table-core/src/core/cell';
import {
  RowCell
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/row-cell';
import { AtlusTag } from '@/components/ui/tag/atlus-tag';
import format from 'date-fns/format';
import {
  makeData,
  Person
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/make-data';

type Patent = {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationDateEpodoc: string;
  familyId: string;
}

const defaultData: Patent[] = patentsMock;

const columnHelper = createColumnHelper<Patent>();

const columns: ColumnDef<Patent, any>[] = [
  columnHelper.group({
      header: 'Family',
      id: 'familyId',
      enableGrouping: true,
      columns: [
        columnHelper.accessor('publicationNumber', {
          id: 'publicationNumber',
          header: () => <HeaderCell title='Publication/Patent no.' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell
            text={cellContext.getValue()} />
        }),
        columnHelper.accessor('title', {
          id: 'title',
          header: () => <HeaderCell title='Title' />,
          cell: (cellContext: CellContext<Patent, string>) =>
            <RowCell
              className='!font-medium'
              text={cellContext.getValue()}
            />
        }),
        columnHelper.accessor('status', {
          id: 'status',
          header: () => <HeaderCell title='Status' />,
          cell: (cellContext: CellContext<Patent, string>) =>
            <AtlusTag
              className='!text-xs !px-2 !py-[6px]'
              text={cellContext.getValue()}
            />
        }),
        columnHelper.accessor('applicantsOriginal', {
          id: 'applicantsOriginal',
          header: () => <HeaderCell title='Assignee' />,
          cell: (cellContext: CellContext<Patent, string[]>) => {
            return <RowCell
              className='whitespace-break-spaces'
              text={cellContext.getValue().join(' &\n')}
            />;
          }
        }),
        columnHelper.accessor('applicationNumber', {
          id: 'applicationNumber',
          header: () => <HeaderCell title='Application No.' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell
            text={cellContext.getValue()} />
        }),
        columnHelper.accessor('applicationDateEpodoc', {
          id: 'applicationDateEpodoc',
          header: () => <HeaderCell title='Application date' />,
          cell: (cellContext: CellContext<Patent, string>) => {
            const date = Date.parse(cellContext.getValue());
            return <RowCell text={format(date, 'dd  MMM yyyy')} />;
          }
        }),
        columnHelper.accessor('familyId', {
          header: () => <HeaderCell title='Family ID' />,
          cell: (cellContext: CellContext<Patent, string>) => <RowCell text={cellContext.getValue()} />
        })
      ]
    }
  )
];

export const PatentsTable = () => {
  const rerender = useReducer(() => ({}), {})[1]

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'firstName',
            header: ({ table }) => (
              <>
                <IndeterminateCheckbox
                  {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                  }}
                />{' '}
                <button
                  {...{
                    onClick: table.getToggleAllRowsExpandedHandler(),
                  }}
                >
                  {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                </button>{' '}
                First Name
              </>
            ),
            cell: ({ row, getValue }) => (
              <div
                style={{
                  // Since rows are flattened by default,
                  // we can use the row.depth property
                  // and paddingLeft to visually indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`,
                }}
              >
                <>
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler(),
                    }}
                  />{' '}
                  {row.getCanExpand() ? (
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
                      }}
                    >
                      {row.getIsExpanded() ? '👇' : '👉'}
                    </button>
                  ) : (
                    '🔵'
                  )}{' '}
                  {getValue()}
                </>
              </div>
            ),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: props => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  )

  const [data, setData] = useState(() => makeData(100, 5, 3))
  const refreshData = () => setData(() => makeData(100, 5, 3))

  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(expanded, null, 2)}</pre>
    </div>
  )
}

function Filter({
                  column,
                  table,
                }: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}

function IndeterminateCheckbox({
                                 indeterminate,
                                 className = '',
                                 ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}
