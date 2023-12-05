import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';

export type AtlusModalSize = 'medium' | 'large' | 'dialog';

interface AtlusModalContextState {
  size: AtlusModalSize;
  updateContext: (partialContext: Partial<AtlusModalContextState>) => void;
}

const contextInitialState: AtlusModalContextState = {
  size: 'medium',
  updateContext: noop,
};

export const AtlusModalContext = createContext<AtlusModalContextState>(contextInitialState);

export const AtlusModalContextProvider = ({
  children,
  size,
}: {
  children: ReactNode;
  size: AtlusModalSize;
}) => {
  const [context, setContext] = useState<AtlusModalContextState>(contextInitialState);

  const contextValue = useMemo<AtlusModalContextState>(() => {
    return {
      ...context,
      updateContext: (partialContext: Partial<AtlusModalContextState>) => {
        setContext({
          ...context,
          ...partialContext,
        });
      },
    };
  }, [context]);

  const { updateContext, size: contextSize } = contextValue;

  useEffect(() => {
    if (size !== contextSize) {
      updateContext({ size });
    }
  }, [size, contextSize, updateContext]);

  return <AtlusModalContext.Provider value={contextValue}>{children}</AtlusModalContext.Provider>;
};
