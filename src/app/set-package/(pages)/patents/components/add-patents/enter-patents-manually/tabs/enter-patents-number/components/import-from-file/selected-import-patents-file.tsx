import {
  selectImportPatentsSerializedFile
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FileName } from '@/components/common/file/file-name';
import { FileContainer } from '@/components/common/file/file-container';
import { removeImportPatentsFile } from '@/redux/features/set-package/set-package';

export const SelectedImportPatentsFile = () => {
  const dispatch = useAppDispatch();
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
      onCancelUpload={() => dispatch(removeImportPatentsFile())}
    />
  );
};
