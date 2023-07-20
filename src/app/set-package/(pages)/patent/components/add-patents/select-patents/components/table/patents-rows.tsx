import { flexRender, Row } from '@tanstack/react-table';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';
import clsx from 'clsx';

interface PatentsRowsProps {
  rows: Row<PatentTableData>[];
}

export const PatentsRows = ({ rows }: PatentsRowsProps) => {
  return rows.map(row => {
    const rowCanExpand = row.getCanExpand();
    return (
      <tr key={row.id} className={clsx({
        'row': !rowCanExpand,
        'selected-row': !rowCanExpand && row.getIsSelected()
      })}>
        {row.getVisibleCells().map((cell, index) => {
          // Render regular cell with data
          return (
            <td key={cell.id} className='pt-5 pb-8 px-4'>
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </td>
          );
        })}
      </tr>
    );
  });
};
