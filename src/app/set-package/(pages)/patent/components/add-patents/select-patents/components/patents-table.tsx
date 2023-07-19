import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { HTMLProps, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import './styles.css';
import { groupBy } from 'lodash';

type Patent = {
  publicationNumber: string; // also patent id
  title: string;
  status: string;
  applicantsOriginal: string[];
  applicationNumber: string;
  applicationDateEpodoc: string;
  familyId: string;
  subRows?: Patent[]
}

const defaultData: Patent[] = patentsMock;

const groupedPatents = groupBy(patentsMock, 'familyId');

const familyRows: Patent[] = Object.keys(groupedPatents).map(familyIdKey => ({
  id: familyIdKey,
  isParent: true,
  familyId: familyIdKey,
  publicationNumber: 'Select Family',
  applicationDateEpodoc: 'Select Family',
  applicantsOriginal: [],
  title: 'Select Family',
  status: 'Select Family',
  applicationNumber: 'Select Family',
  subRows: groupedPatents[familyIdKey]
}));

console.log(familyRows);


export const PatentsTable = () => {
  const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo<ColumnDef<Patent>[]>(
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
                    onChange: table.getToggleAllRowsSelectedHandler()
                  }}
                />{' '}
                <button
                  {...{
                    onClick: table.getToggleAllRowsExpandedHandler()
                  }}
                >
                  {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                </button>
                {' '}
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
                  paddingLeft: `${row.depth * 2}rem`
                }}
              >
                <>
                  <IndeterminateCheckbox
                    {...{
                      checked: row.getIsSelected(),
                      indeterminate: row.getIsSomeSelected(),
                      onChange: row.getToggleSelectedHandler()
                    }}
                  />{' '}
                  {row.getCanExpand() ? (
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' }
                      }}
                    >
                      {row.getIsExpanded() ? '👇' : '👉'}
                    </button>
                  ) : (
                    '🔵'
                  )}{' '}
                  {getValue() || 'NNN'}
                </>
              </div>
            ),
            footer: props => props.column.id
          },
          {
            accessorFn: row => row.publicationNumber,
            id: 'publicationNumber',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: props => props.column.id
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState(familyRows);
  console.log('data: ', data);

  const [expanded, setExpanded] = useState<ExpandedState>({});

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
    debugTable: true
  });

  return (
    <div className='p-2'>
      <div className='h-2' />
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
                      </div>
                    )}
                  </th>
                );
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
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(expanded, null, 2)}</pre>
    </div>
  );
};

function IndeterminateCheckbox({
                                 indeterminate,
                                 className = '',
                                 ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
