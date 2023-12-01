import { flexRender, Row, Table } from '@tanstack/react-table';
import { PatentTableData } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';

interface SelectFamilyRowProps {
  table: Table<PatentTableData>;
  row: Row<PatentTableData>;
}

export const FamilyRow = ({ row, table }: SelectFamilyRowProps) => {
  return (
    <tr>
      {row.getVisibleCells().map((cell, cellIndex) => {
        /**
         * Just render the first cell of `Select Family` because the other cells
         * will be empty (as Figma design).
         */
        if (cellIndex !== 0) {
          return null;
        }

        // Select family cell expands horizontally as much as full table width (max columns count).
        return (
          <td key={cell.id} colSpan={table.getAllColumns().length}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};
