import { AtlusButton } from '@/components/ui/button/atlus-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectImportPatentsSerializedFile,
  selectIsActiveTabValid
} from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useQuery } from '@tanstack/react-query';
import { uploadPatentsFile } from '@/api/patents/upload-patents-file';
import { createFileFromSerializedFile } from '@/utils/file';
import {
  patentsFetchedSuccessfully
} from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import { useEffect, useState } from 'react';


export const UploadPatentsFileNextButton = () => {
  const [mounted, setIsMounted] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isActiveFormValid = useAppSelector(selectIsActiveTabValid);
  const serializedFiled = useAppSelector(selectImportPatentsSerializedFile);

  const { refetch, isFetching, data, error } = useQuery({
    queryKey: ['patents/upload/bulk', serializedFiled],
    queryFn: async ({ signal }) => {
      if (!serializedFiled) {
        throw new Error('No Patent file selected');
      }
      const file = await createFileFromSerializedFile(serializedFiled);
      return uploadPatentsFile({
        file
      }, signal);
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running,
    cacheTime: 0
  });

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onNext = async () => {
    const response = await refetch();
    console.log('uploadPatentsFile Response: ', response);
    if (!response.data || !mounted) {
      return;
    }
    dispatch(patentsFetchedSuccessfully(response.data));
  };

  return (
    <AtlusButton
      disabled={!isActiveFormValid || isFetching}
      isLoading={isFetching}
      onClick={onNext}>
      Next
    </AtlusButton>
  );
};
