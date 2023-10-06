import { PatentsFamilyRowsGroup } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/utils';
import { FamilyRow } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/family-row';
import { Table } from '@tanstack/react-table';
import { PatentTableData } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/patents-table';
import { PatentsRows } from '@/app/set-package/[id]/(pages)/patents/components/add-patents/select-patents/components/table/rows/patents-rows';

interface PatentsFamilyGroupProps {
  patentsFamilyGroup: PatentsFamilyRowsGroup;
  table: Table<PatentTableData>;
}

export const PatentsFamilyGroup = ({ patentsFamilyGroup, table }: PatentsFamilyGroupProps) => {
  return (
    <>
      <FamilyRow row={patentsFamilyGroup.parentRow} table={table} />
      <PatentsRows rows={patentsFamilyGroup.childRows} />
    </>
  );
};
