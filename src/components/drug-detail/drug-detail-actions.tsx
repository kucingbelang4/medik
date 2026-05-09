'use client';

import React from 'react';
import { useDrugDetail } from './drug-detail';
import { Disclaimer } from '../../components/disclaimer';

interface DrugDetailActionsProps {
  onShare?: () => void;
}

export function DrugDetailActions({ onShare }: DrugDetailActionsProps) {
  const { drug } = useDrugDetail();

  if (!drug) return null;

  return (
    <div className="drug-detail-actions">
      <button
        className="drug-detail-action"
        onClick={onShare}
      >
        Share
      </button>
      <button
        className="drug-detail-action"
        // In a real app, this would open a compare modal
        onClick={() => alert('Compare feature coming soon')}
      >
        Compare
      </button>
      {/* Disclaimer at the bottom of detail */}
      <Disclaimer />
    </div>
  );
}

export default DrugDetailActions;