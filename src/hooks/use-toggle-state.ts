import { useCallback, useState } from 'react';

export const useToggleState = (initialState = false) => {
  const [isOn, setIsOn] = useState<boolean>(initialState);

  const setOn = useCallback(() => {
    setIsOn(true);
  }, []);

  const setOff = useCallback(() => {
    setIsOn(false);
  }, []);

  return {
    isOn,
    setIsOn,
    setOn,
    setOff,
  };
};
