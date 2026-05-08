'use client';

import React from 'react';
import { useDrugDetail } from './drug-detail';

export function DrugDetailClinical() {
  const { drug } = useDrugDetail();

  if (!drug) return null;

  return (
    <div className="drug-detail-clinical">
      {drug.indications && (
        <details className="clinical-section">
          <summary>Indikasi</summary>
          <p>{drug.indications}</p>
        </details>
      )}
      {drug.dosage && (
        <details className="clinical-section">
          <summary>Dosis</summary>
          <p>{drug.dosage}</p>
        </details>
      )}
      {drug.warnings && (
        <details className="clinical-section warnings">
          <summary>⚠️ Peringatan</summary>
          <p>{drug.warnings}</p>
        </details>
      )}
      {drug.contraindications && (
        <details className="clinical-section">
          <summary>Kontraindikasi</summary>
          <p>{drug.contraindications}</p>
        </details>
      )}
    </div>
  );
}

export default DrugDetailClinical;