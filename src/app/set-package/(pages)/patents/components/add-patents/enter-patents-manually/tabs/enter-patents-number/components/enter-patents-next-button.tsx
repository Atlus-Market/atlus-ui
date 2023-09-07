import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectIsActiveTabValid } from '@/redux/features/set-package/selectors/add-patents.selectors';
import { useFetchPatents } from '@/app/set-package/(pages)/patents/components/add-patents/enter-patents-manually/tabs/enter-patents-number/use-fetch-patents';
import { patentsFetchedSuccessfully } from '@/redux/features/set-package/slices/add-patents/slices/enter-patents';
import { AtlusButton } from '@/components/ui/button/atlus-button';

export const EnterPatentsNextButton = () => {
  const [mounted, setIsMounted] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isActiveFormValid = useAppSelector(selectIsActiveTabValid);
  const { refetch, isFetching } = useFetchPatents();

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const onNext = async () => {
    if (!isActiveFormValid) {
      return;
    }

    const response = await refetch();
    console.log('Fetch Patents Response: ', response.data);

    if (!response.data || !mounted) {
      return;
    }

    dispatch(patentsFetchedSuccessfully(response.data));
  };

  return (
    <AtlusButton
      disabled={!isActiveFormValid || isFetching}
      isLoading={isFetching}
      onClick={onNext}
    >
      Next
    </AtlusButton>
  );
};
