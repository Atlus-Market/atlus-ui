import { Row } from '@tanstack/react-table';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import { useState } from 'react';
import {
  PatentRow
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/table/rows/patent-row';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

interface PatentsRowsProps {
  rows: Row<PatentTableData>[];
}

export const PatentsRows = ({ rows }: PatentsRowsProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const rowsToShow = rows.slice(0, expanded ? rows.length : 1);
  const jsxRows = rowsToShow.map(row => <PatentRow key={row.id} row={row} />);
  return (
    <>
      {jsxRows}
      {rows.length > 1 &&
        <tr>
          <td className='pt-3 pb-6 pl-7'>
            <button
              className='text-orange text-xs font-medium leading-5 flex items-center'
              onClick={() => setExpanded(!expanded)}>
              See all {rows.length} patents
              {!expanded ?
                <HiChevronDown size={16} className='ml-[3px]' /> :
                <HiChevronUp size={16} className='ml-[3px]' />
              }
            </button>
          </td>
        </tr>}
    </>
  );
};
