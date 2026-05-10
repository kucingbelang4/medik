const fs = require('fs');
const file = '/tmp/medik-repo/src/lib/search.ts';
let code = fs.readFileSync(file, 'utf8');

// Replace the fallback to return a placeholder instead of null
const oldFallback = `  // If all else fails, return a minimal drug object for display
  // This prevents 404 on drug detail pages when we have the ID from search results
  return {
    id,
    source: 'openFDA',
    genericName: 'Medication Details',
    brandNames: ['Information currently unavailable'],
    indications: 'Loading detailed medication information. If this persists, the drug label might not be available in the current database.',
    lastUpdated: new Date().toISOString(),
    sourceUrl: \`https://api.fda.gov/drug/label.json?search=product_ndc:"\${id}"\`,
  };`;

const newFallback = `  // If all else fails, return a placeholder drug object for display
  // This prevents 404 on drug detail pages when we have the ID from search results
  // The placeholder will show "Information unavailable" message to users
  console.log('[getDrugById] All lookups failed for ID:', id, '- returning placeholder');
  return {
    id,
    source: 'openFDA' as const,
    genericName: 'Medication Information',
    brandNames: ['Details unavailable'],
    indications: 'Detailed medication information is currently unavailable for this product. This may occur if the drug is not registered with the openFDA database or uses a different identification system. Please consult the product packaging or contact the manufacturer for more information.',
    dosage: 'Please refer to the product label or consult a healthcare professional.',
    warnings: 'Read all warnings and instructions before use.',
    lastUpdated: new Date().toISOString(),
    sourceUrl: \`https://api.fda.gov/drug/label.json?search=product_ndc:"\${id}"\`,
  };`;

if (code.includes(oldFallback)) {
  fs.writeFileSync(file, code.replace(oldFallback, newFallback));
  console.log("Success");
} else {
  console.log("Failed to find old code block");
  // Try to show what we have
  if (code.includes('return {')) {
    console.log("Found 'return {' - checking nearby code...");
    const idx = code.indexOf('return {');
    console.log(code.substring(idx, idx + 300));
  }
}
