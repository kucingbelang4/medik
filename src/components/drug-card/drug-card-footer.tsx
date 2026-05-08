'use client';

import React from 'react';
import { useDrugCard } from './drug-card';

interface DrugCardFooterProps {
  onViewDetails?: () => void;
}

export function DrugCardFooter({ onViewDetails }: DrugCardFooterProps) {
  const { drug } = useDrugCard();

  if (!drug) return null;

  return (
    <div className="drug-card-footer">
      {drug.lastUpdated && (
        <span className="drug-card-last-updated">
          Updated: {drug.lastUpdated}
        </span>
      )}
      <button
        className="drug-card-action"
        onClick={onViewDetails}
      >
        View Details →
      </button>
    </div>
  );
}

export default DrugCardFooter;