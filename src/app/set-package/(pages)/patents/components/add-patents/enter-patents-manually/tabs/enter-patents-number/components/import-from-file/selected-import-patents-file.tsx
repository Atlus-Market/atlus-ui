import { selectImportPatentsSerializedFile } from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useAppSelector } from '@/redux/hooks';

export const SelectedImportPatentsFile = () => {
  const selectedFile = useAppSelector(selectImportPatentsSerializedFile);

  if (!selectedFile) {
    return null;
  }
  return <div>{selectedFile.name}</div>;
};
