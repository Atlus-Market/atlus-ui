import { flexRender, Row } from '@tanstack/react-table';
import clsx from 'clsx';

interface PatentRowProps {
  row: Row<any>;
}

export const PatentRow = ({ row }: PatentRowProps) => {
  const rowCanExpand = row.getCanExpand();
  return (
    <tr key={row.id} className={clsx({
      'row': !rowCanExpand,
      'selected-row': !rowCanExpand && row.getIsSelected()
    })}>
      {row.getVisibleCells().map((cell, index) => {
        // Render regular cell with data
        return (
          <td key={cell.id} className='pt-5 pb-8 pl-[30px] pr-4'>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </td>
        );
      })}
    </tr>
  );
};
