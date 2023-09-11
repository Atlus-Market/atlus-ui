import { flexRender, Header } from '@tanstack/react-table';
import { PatentTableData } from '@/app/set-package/(pages)/patents/components/add-patents/select-patents/components/patents-table';

interface HeaderRowProps {
  header: Header<PatentTableData, any>;
}

export const HeaderRow = ({ header }: HeaderRowProps) => {
  return (
    <th colSpan={header.colSpan} className="pl-[30px] pr-4 [&:first-child]:pl-[65px]">
      {header.isPlaceholder ? null : (
        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
      )}
    </th>
  );
};
