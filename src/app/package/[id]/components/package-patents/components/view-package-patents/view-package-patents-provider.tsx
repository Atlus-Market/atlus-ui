'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';
import { Patent } from '@/models/patent';

interface ViewPackagePatentsProviderProps {
  children: ReactNode;
}

interface ViewPackagePatentsContextState {
  patents: Patent[];
  setPatents: (patents: Patent[]) => void;
  clear: () => void;
}

const contextInitialState: ViewPackagePatentsContextState = {
  patents: [],
  setPatents: noop,
  clear: noop,
};

export const ViewPackagePatentsContext =
  createContext<ViewPackagePatentsContextState>(contextInitialState);

export const ViewPackagePatentsProvider = ({ children }: ViewPackagePatentsProviderProps) => {
  const [viewPackagePatentsContextState, setViewPackagePatentsContextState] =
    useState<ViewPackagePatentsContextState>(contextInitialState);

  const contextValue = useMemo<ViewPackagePatentsContextState>(() => {
    return {
      ...viewPackagePatentsContextState,
      setPatents: (patents: Patent[]) => {
        setViewPackagePatentsContextState({
          ...viewPackagePatentsContextState,
          patents,
        });
      },
      clear: () => {
        setViewPackagePatentsContextState({
          ...contextInitialState,
        });
      },
    };
  }, [viewPackagePatentsContextState]);

  return (
    <ViewPackagePatentsContext.Provider value={contextValue}>
      {children}
    </ViewPackagePatentsContext.Provider>
  );
};
