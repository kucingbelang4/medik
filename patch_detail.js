const fs = require('fs');
const file = '/tmp/medik-repo/src/app/drug/[id]/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `  const drug = await getDrugById(drugId);
  
  if (!drug) {
    notFound();
  }

  await setCachedDrug(drugId, drug);`;

const newCode = `  const drug = await getDrugById(drugId);
  
  if (!drug) {
    console.log('[DrugDetail] Drug not found in API, returning 404');
    notFound();
  }

  await setCachedDrug(drugId, drug);`;

if (code.includes(oldCode)) {
  fs.writeFileSync(file, code.replace(oldCode, newCode));
  console.log("Success");
} else {
  console.log("Failed to find old code block");
}
