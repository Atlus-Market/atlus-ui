import { useAppSelector } from '@/redux/hooks';
import {
  selectActivePatentsIds,
  selectAddPatentsActiveTab,
  selectImportPatentsSerializedFile,
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useQuery } from '@tanstack/react-query';
import { createFileFromSerializedFile } from '@/utils/file';
import { uploadPatentsFile } from '@/api/patents/upload-patents-file';
import { EnterPatentsNumberTab } from '@/app/(main)/set-package/[id]/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/components/tabs/enter-patents-number-tab';
import { getPatentsSimpleBulk } from '@/api/patents/get-patents-simple-bulk';

export const useFetchPatents = () => {
  const addPatentsActiveTab = useAppSelector(selectAddPatentsActiveTab);
  const serializedFiled = useAppSelector(selectImportPatentsSerializedFile);
  const selectedPatentsId = useAppSelector(selectActivePatentsIds);

  return useQuery({
    queryKey: ['patents/search/bulk', serializedFiled, selectedPatentsId, addPatentsActiveTab],
    queryFn: async ({ signal }) => {
      if (addPatentsActiveTab === EnterPatentsNumberTab.EnterManually) {
        return getPatentsSimpleBulk(
          {
            ids: selectedPatentsId,
          },
          signal
        );
      }

      if (addPatentsActiveTab === EnterPatentsNumberTab.ImportFromFile) {
        if (!serializedFiled) {
          throw new Error('No Patent file selected');
        }
        const file = await createFileFromSerializedFile(serializedFiled);
        return uploadPatentsFile(
          {
            file,
          },
          signal
        );
      }

      throw new Error('Invalid active tab');
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running,
    cacheTime: 0,
  });
};
