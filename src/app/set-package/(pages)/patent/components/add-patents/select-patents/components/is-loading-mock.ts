import { useEffect, useState } from 'react';

export const useIsLoadingMock = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 900);
  }, []);

  return {
    isLoading
  };
};
