import {
  selectImportPatentsSerializedFile
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useAppSelector } from '@/redux/hooks';
import { FileName } from '@/components/common/file/file-name';
import { FileContainer } from '@/components/common/file/file-container';

export const SelectedImportPatentsFile = () => {
  const selectedFile = useAppSelector(selectImportPatentsSerializedFile);

  if (!selectedFile) {
    return null;
  }
  return (
    <FileContainer
      file={<FileName
        fileName={selectedFile.name}
        fileSize={selectedFile.size}
      />}
    />
  );
};
