import { flexRender, Header } from '@tanstack/react-table';
import {
  PatentTableData
} from '@/app/set-package/(pages)/patent/components/add-patents/select-patents/components/patents-table';

interface HeaderRowProps {
  header: Header<PatentTableData, any>;
}

export const HeaderRow = ({ header }: HeaderRowProps) => {
  return (
    <th colSpan={header.colSpan} className='px-4'>
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
};
