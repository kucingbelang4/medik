'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface DisclaimerContextType {
  acknowledged: boolean;
  setAcknowledged: (value: boolean) => void;
}

const DisclaimerContext = createContext<DisclaimerContextType | undefined>(undefined);

export function useDisclaimer() {
  const context = useContext(DisclaimerContext);
  if (!context) {
    throw new Error('useDisclaimer must be used within a Disclaimer');
  }
  return context;
}

interface DisclaimerProps {
  children?: ReactNode;
}

export function Disclaimer({ children }: DisclaimerProps) {
  return (
    <DisclaimerContext.Provider value={{ acknowledged: true, setAcknowledged: () => {} }}>
      {children}
    </DisclaimerContext.Provider>
  );
}

export default Disclaimer;