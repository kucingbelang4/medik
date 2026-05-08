'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface DrugDetailContextType {
  drug: import('../../types/drug').Drug | null;
}

const DrugDetailContext = createContext<DrugDetailContextType | undefined>(undefined);

export function useDrugDetail() {
  const context = useContext(DrugDetailContext);
  if (!context) {
    throw new Error('useDrugDetail must be used within a DrugDetail');
  }
  return context;
}

interface DrugDetailProps {
  drug: import('../../types/drug').Drug;
  children: ReactNode;
}

export function DrugDetail({ drug, children }: DrugDetailProps) {
  return (
    <DrugDetailContext.Provider value={{ drug }}>
      <div className="drug-detail">
        {children}
      </div>
    </DrugDetailContext.Provider>
  );
}

export default DrugDetail;