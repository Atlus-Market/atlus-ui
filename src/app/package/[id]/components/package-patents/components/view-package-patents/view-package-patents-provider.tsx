'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';
import { Patent } from '@/models/patent';

interface ViewPackagePatentsProviderProps {
  children: ReactNode;
}

export type PatentsFamily = {
  patents: Patent[];
  familyNumber: number | null;
};

interface ViewPackagePatentsContextState {
  patentsFamily: PatentsFamily;
  setPatents: (patentsFamily: PatentsFamily) => void;
  clear: () => void;
}

const contextInitialState: ViewPackagePatentsContextState = {
  patentsFamily: {
    patents: [],
    familyNumber: null,
  },
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
      setPatents: (patentsFamily: PatentsFamily) => {
        setViewPackagePatentsContextState({
          ...viewPackagePatentsContextState,
          patentsFamily,
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
