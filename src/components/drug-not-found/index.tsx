'use client';

import React from 'react';
import Link from 'next/link';

export function DrugNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
        <span className="text-2xl" aria-hidden="true">💊</span>
      </div>
      
      <h1 className="font-h1 text-on-surface mb-4">
        Medication Not Found
      </h1>
      
      <p className="font-body-md text-on-surface-variant max-w-md mb-8">
        We couldn't find the medication you're looking for. It might be misspelled, 
        unavailable in our current databases (BPOM/FDA), or recently removed.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/" 
          className="medik-button medik-button--primary medik-button--md"
        >
          Back to Search
        </Link>
        <Link 
          href="/medicines" 
          className="medik-button medik-button--ghost medik-button--md"
        >
          Browse Medicines
        </Link>
      </div>
    </div>
  );
}