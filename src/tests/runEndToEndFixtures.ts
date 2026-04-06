// src/tests/runEndToEndFixtures.ts
import fs from 'fs';
import path from 'path';
import { convertSurveyToV2Input } from '../adapters/surveyResponsesToV2EvidenceAdapter';
import { useReflectionInferenceV2 } from '../facades/useReflectionInferenceV2';
import { useInterventionFacade } from '../facades/useInterventionFacade';
import { getDictionaryCoverageReport } from '../adapters/surveyOptionEvidenceDictionary';

console.log("=========================================");
console.log("🚀 SMOKE RUNNER END-TO-END V2");
console.log("=========================================\n");

// 1. Dicionário Report
const dictCoverage = getDictionaryCoverageReport();
console.log("📊 COBERTURA DO DICIONÁRIO:");
console.log(`- Opções mapeadas: ${dictCoverage.totalOptionsMapped}`);
console.log(`- Blocos: Superficial (${dictCoverage.blockCoverage.superficial}), Symbolic (${dictCoverage.blockCoverage.symbolic}), Deepening (${dictCoverage.blockCoverage.deepening})\n`);

// 2. Correr Fixtures
const fixturesDir = path.join(__dirname, '../fixtures/cases');
if (fs.existsSync(fixturesDir)) {
  const files = fs.readdirSync(fixturesDir).filter(f => f.endsWith('.json'));

  files.forEach(file => {
    console.log(`\n▶️ EXECUTANDO FIXTURE: ${file}`);
    const raw = fs.readFileSync(path.join(fixturesDir, file), 'utf-8');
    const fixture = JSON.parse(raw);

    const input = convertSurveyToV2Input(fixture.inputs);
    const engineRun = useReflectionInferenceV2(true, input);
    
    if (!engineRun.rawSynthesis) {
        console.log("❌ Falha na pipeline Core.");
        return;
    }

    const planOptions = useInterventionFacade(engineRun.rawSynthesis, true);

    console.log("   [OUTPUT WOW]");
    console.log(`   └─ Confiança: ${engineRun.rawSynthesis.confidence}`);
    console.log(`   └─ Latente: ${engineRun.rawSynthesis.latentTheme}`);
    console.log(`   └─ Núcleo: ${engineRun.rawSynthesis.dominantProblem || 'Nenhum'}`);
    
    console.log("   [INTERVENTION]");
    console.log(`   └─ Teaser: ${planOptions.teaserCard?.immediateAction}`);
    console.log(`   └─ Plano: ${planOptions.fullBoard ? 'Gerado' : 'Bloqueado'}`);
    console.log("-----------------------------------------");
  });
} else {
  console.log("Nenhuma fixture encontrada no diretório", fixturesDir);
}
