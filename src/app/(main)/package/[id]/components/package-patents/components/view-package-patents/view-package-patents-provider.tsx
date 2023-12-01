'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';
import { FamilyPatentGroup } from '@/app/(main)/set-package/[id]/(pages)/patents/components/patents-family-list/use-group-patents-by-family-id';

interface ViewPackagePatentsProviderProps {
  children: ReactNode;
}

interface ViewPackagePatentsContextState {
  familyPatentsGroup: FamilyPatentGroup;
  setPatents: (patentsFamilies: FamilyPatentGroup) => void;
  clear: () => void;
}

const contextInitialState: ViewPackagePatentsContextState = {
  familyPatentsGroup: {},
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
      setPatents: (familyPatentsGroup: FamilyPatentGroup) => {
        setViewPackagePatentsContextState({
          ...viewPackagePatentsContextState,
          familyPatentsGroup,
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
