'use client';

import React from 'react';
import { useDrugDetail } from './drug-detail';

export function DrugDetailHero() {
  const { drug } = useDrugDetail();

  if (!drug) return null;

  return (
    <div className="drug-detail-hero">
      <h1 className="drug-detail-brand-name">{drug.brandNames[0] || ''}</h1>
      <h2 className="drug-detail-generic-name">{drug.genericName}</h2>
      <span className={`drug-detail-source-badge source-${drug.source.toLowerCase()}`}>
        {drug.source}
      </span>
    </div>
  );
}

export default DrugDetailHero;