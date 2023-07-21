import {
  patentsMock
} from '@/app/set-package/(pages)/patent/components/add-patents/enter-patents-manually/tabs/enter-patents-number/get-patents-mock';
import {
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  RowSelectionState,
  useReactTable
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { groupBy } from 'lodash';
import { RowData } from '@tanstack/table-core/src/types';

import './styles.css';
import {
  getInitialExpandedState,
  makeFamilyRowGroups
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/utils';
import {
  PatentsFamilyGroup
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/patents-family-group';
import {
  HeaderRow
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/header/header-row';
import {
  usePatentsColumns
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/column/use-patents-columns';

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
  const enterPatentsStateManuallyState = patentsMock.map(p => p.applicationNumber);//useSelector(selectEnterPatentsIdsManuallyState);
  const filteredPatents = patentsMock.filter(p => enterPatentsStateManuallyState.includes(p.applicationNumber));
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
  const columns = usePatentsColumns();

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
