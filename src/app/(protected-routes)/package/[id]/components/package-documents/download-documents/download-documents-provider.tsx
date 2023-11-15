'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';
import { noop } from '@/utils/noop';

interface SelectDocumentsProviderProps {
  children: ReactNode;
}

interface DownloadDocumentsContextState {
  selectedDocumentsIds: string[];
  addDocument: (documentId: string) => void;
  removeDocument: (documentId: string) => void;
  setDocuments: (documentsIds: string[]) => void;
  clear: () => void;
}

const contextInitialState: DownloadDocumentsContextState = {
  selectedDocumentsIds: [],
  addDocument: noop,
  removeDocument: noop,
  setDocuments: noop,
  clear: noop,
};

export const DownloadDocumentsContext =
  createContext<DownloadDocumentsContextState>(contextInitialState);

export const DownloadDocumentsProvider = ({ children }: SelectDocumentsProviderProps) => {
  const [documentsContextState, setDocumentsContextState] =
    useState<DownloadDocumentsContextState>(contextInitialState);

  const contextValue = useMemo<DownloadDocumentsContextState>(() => {
    return {
      ...documentsContextState,
      addDocument: (documentId: string) => {
        if (!documentsContextState.selectedDocumentsIds.includes(documentId)) {
          setDocumentsContextState({
            ...documentsContextState,
            selectedDocumentsIds: [...documentsContextState.selectedDocumentsIds, documentId],
          });
        }
      },
      removeDocument: (documentId: string) => {
        setDocumentsContextState({
          ...documentsContextState,
          selectedDocumentsIds: documentsContextState.selectedDocumentsIds.filter(
            docId => docId !== documentId
          ),
        });
      },
      setDocuments: (documentsIds: string[]) => {
        setDocumentsContextState({
          ...documentsContextState,
          selectedDocumentsIds: [...documentsIds],
        });
      },
      clear: () => {
        setDocumentsContextState({
          ...documentsContextState,
          selectedDocumentsIds: [],
        });
      },
    };
  }, [documentsContextState]);

  return (
    <DownloadDocumentsContext.Provider value={contextValue}>
      {children}
    </DownloadDocumentsContext.Provider>
  );
};
