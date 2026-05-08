'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface DrugCardContextType {
  drug: import('../../types/drug').Drug | null;
}

const DrugCardContext = createContext<DrugCardContextType | undefined>(undefined);

export function useDrugCard() {
  const context = useContext(DrugCardContext);
  if (!context) {
    throw new Error('useDrugCard must be used within a DrugCard');
  }
  return context;
}

interface DrugCardProps {
  drug: import('../../types/drug').Drug;
  children: ReactNode;
}

export function DrugCard({ drug, children }: DrugCardProps) {
  return (
    <DrugCardContext.Provider value={{ drug }}>
      <div className="drug-card">
        {children}
      </div>
    </DrugCardContext.Provider>
  );
}

export default DrugCard;