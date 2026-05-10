import React from 'react';
import { notFound } from 'next/navigation';
import { DrugDetail, DrugDetailHero, DrugDetailClinical, DrugDetailActions } from '@/components/drug-detail';
import { getCachedDrug, setCachedDrug } from '@/lib/cache';
import { getDrugById } from '@/lib/search';
import { Drug } from '@/types/drug';

export const dynamic = 'force-dynamic';

export default async function DrugDetailPage({ params }: { params: { id: string } }) {
  const drugId = params.id;

  const cached = await getCachedDrug(drugId);
  if (cached) {
    return <DrugDetailPageContent drug={cached} />;
  }

  const drug = await getDrugById(drugId);
  
  if (!drug) {
    console.log('[DrugDetail] Drug not found in API, returning 404');
    notFound();
  }

  await setCachedDrug(drugId, drug);

  return <DrugDetailPageContent drug={drug} />;
}

function DrugDetailPageContent({ drug }: { drug: Drug }) {
  return (
    <section className="px-margin py-24 max-w-4xl mx-auto">
      <DrugDetail drug={drug}>
        <DrugDetailHero />
        <DrugDetailClinical />
        <DrugDetailActions />
      </DrugDetail>
    </section>
  );
}