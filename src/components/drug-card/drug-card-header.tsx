'use client';

import React from 'react';
import { useDrugCard } from './drug-card';

export function DrugCardHeader() {
  const { drug } = useDrugCard();

  if (!drug) return null;

  return (
    <div className="drug-card-header">
      <div className="drug-card-brand-name">{drug.brandNames[0]}</div>
      <div className="drug-card-generic-name">{drug.genericName}</div>
      <span className={`drug-card-source-badge source-${drug.source.toLowerCase()}`}>
        {drug.source}
      </span>
    </div>
  );
}

export default DrugCardHeader;