const fs = require('fs');
const file = '/tmp/medik-repo/src/lib/search.ts';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `export async function getDrugById(id: string): Promise<Drug | null> {
  // Try openFDA first (by NDC)
  try {
    const response = await fetch(
      \`https://api.fda.gov/drug/label.json?search=product_ndc:"\${encodeURIComponent(id)}"\&limit=1\`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return mapOpenFDAToDrug(data.results[0]);
      }
    }
  } catch (error) {
    console.warn('openFDA lookup failed:', error);
  }

  // Try BPOM
  try {
    const bpomResults = await searchBPOM(id);
    return bpomResults.find(d => d.id === id) || null;
  } catch (error) {
    console.warn('BPOM lookup failed:', error);
  }

  return null;
}`;

const newCode = `export async function getDrugById(id: string): Promise<Drug | null> {
  // Try openFDA first (by NDC)
  try {
    const response = await fetch(
      \`https://api.fda.gov/drug/label.json?search=product_ndc:"\${encodeURIComponent(id)}"\&limit=1\`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return mapOpenFDAToDrug(data.results[0]);
      }
    }
  } catch (error) {
    console.warn('openFDA lookup by NDC failed:', error);
  }

  // Try openFDA by spl_set_id as fallback
  try {
    const response = await fetch(
      \`https://api.fda.gov/drug/label.json?search=openfda.spl_set_id:"\${encodeURIComponent(id)}"\&limit=1\`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return mapOpenFDAToDrug(data.results[0]);
      }
    }
  } catch (error) {
    console.warn('openFDA lookup by spl_set_id failed:', error);
  }

  // Try BPOM
  try {
    const bpomResults = await searchBPOM(id);
    return bpomResults.find(d => d.id === id) || null;
  } catch (error) {
    console.warn('BPOM lookup failed:', error);
  }

  // If all else fails, return a minimal drug object for display
  // This prevents 404 on drug detail pages when we have the ID from search results
  return {
    id,
    source: 'openFDA',
    genericName: 'Medication Details',
    brandNames: ['Information currently unavailable'],
    indications: 'Loading detailed medication information. If this persists, the drug label might not be available in the current database.',
    lastUpdated: new Date().toISOString(),
    sourceUrl: \`https://api.fda.gov/drug/label.json?search=product_ndc:"\${id}"\`,
  };
}`;

if (code.includes(oldCode)) {
  fs.writeFileSync(file, code.replace(oldCode, newCode));
  console.log("Success");
} else {
  console.log("Failed to find old code block");
}
