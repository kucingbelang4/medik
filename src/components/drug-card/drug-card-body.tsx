'use client';

import React from 'react';
import { useDrugCard } from './drug-card';

export function DrugCardBody() {
  const { drug } = useDrugCard();

  if (!drug) return null;

  return (
    <div className="drug-card-body">
      {drug.indications && (
        <div className="drug-card-section">
          <strong>Indikasi:</strong>
          <p>{drug.indications}</p>
        </div>
      )}
      {drug.dosage && (
        <div className="drug-card-section">
          <strong>Dosis:</strong>
          <p>{drug.dosage}</p>
        </div>
      )}
      {drug.warnings && (
        <div className="drug-card-section warnings">
          <strong>⚠️ Peringatan:</strong>
          <p>{drug.warnings}</p>
        </div>
      )}
    </div>
  );
}

export default DrugCardBody;