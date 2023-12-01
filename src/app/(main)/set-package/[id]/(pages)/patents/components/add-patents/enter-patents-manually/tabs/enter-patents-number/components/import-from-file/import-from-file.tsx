import { DownloadFileSample } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/import-from-file/download-file-sample';
import { SelectPatentsFile } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/import-from-file/select-patents-file';
import { SelectedImportPatentsFile } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/import-from-file/selected-import-patents-file';

export const ImportFromFile = () => {
  return (
    <div className="[&>*:first-child]:mb-6">
      <DownloadFileSample />
      <SelectPatentsFile />
      <div className="my-6 text-center">
        <span className="text-dark-grey text-xs font-normal">XLS, XLSX, or CSV (max. 25 MB)</span>
      </div>
      <SelectedImportPatentsFile />
    </div>
  );
};
