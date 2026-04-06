// src/tests/finalPsychologicalSynthesis.test.ts
import { synthesizePsychologicalProfile } from '../services/finalPsychologicalSynthesis';
import { reflectionResultsPresenterV2 } from '../presenters/reflectionResultsPresenterV2';
import { WideScanResult } from '../contracts/inferenceTypes';
import { SymbolicScanResult } from '../contracts/symbolicLifeFieldTypes';
import { DeepeningClusterOutput } from '../contracts/clusterDiscriminativeTypes';

console.log("Testing Final Synthesis and UI Presenter...\n");

// Dummy results from Phase 1 and 2
const mockWideScan: WideScanResult = {
  topSuspects: [], rivalSuspects: [], allCandidates: {} as any, isAmbiguous: false, scanConfidence: 'high'
};
const mockSymbolicScan: SymbolicScanResult = {
  activeFields: [], dominantField: 'trabalho_progresso', dominantAxes: [], coreProblemReinforcements: {}
};

// Teste 1: Resultado com dominante claro e defesa
const deep1: DeepeningClusterOutput = {
  dominantProblem: 'fear_of_failure',
  supportingProblem: null,
  primaryDefense: 'avoidant_procrastination',
  centralConflict: null,
  evidenceSummary: [], counterEvidenceSummary: [], confidence: 'high', rivalHypothesisOpen: null, evaluatedHypotheses: {} as any
};

const synth1 = synthesizePsychologicalProfile(mockWideScan, mockSymbolicScan, deep1);
const ui1 = reflectionResultsPresenterV2(synth1);

if (ui1.dynamicBands.some(b => b.type === 'core' && b.value === 'fear_of_failure') &&
    ui1.dynamicBands.some(b => b.type === 'defense' && b.value === 'avoidant_procrastination') &&
    ui1.isLowConfidence === false) {
  console.log("✅ Teste 1 (Dominante + Defesa): Passou. Payload gerado perfeitamente hierárquico.");
} else {
  console.log("❌ Teste 1 Falhou.");
}


// Teste 2: Tema latente vs Tema manifesto
const mockSymbolicScan2: SymbolicScanResult = {
  activeFields: [], dominantField: 'desejo_paixao', dominantAxes: [], coreProblemReinforcements: {}
};
const deep2: DeepeningClusterOutput = {
  dominantProblem: 'low_self_worth',
  supportingProblem: null,
  primaryDefense: null,
  centralConflict: null,
  evidenceSummary: [], counterEvidenceSummary: [], confidence: 'dominant_strong' as any, rivalHypothesisOpen: null, evaluatedHypotheses: {} as any
};

const synth2 = synthesizePsychologicalProfile(mockWideScan, mockSymbolicScan2, deep2);
const ui2 = reflectionResultsPresenterV2(synth2);
if (ui2.headline.includes("low self_worth") && ui2.subHeadline.includes("desejo paixao")) {
  console.log("✅ Teste 2 (Latente vs Manifesto): Passou. Distinguida clivagem entre o que dói (insegurança) e onde atua (paixão).");
} else {
  console.log("❌ Teste 2 Falhou.", ui2);
}

// Teste 3: Ambiguidade / Confiança Baixa
const deep3: DeepeningClusterOutput = {
  dominantProblem: null,
  supportingProblem: null,
  primaryDefense: null,
  centralConflict: null,
  evidenceSummary: [], counterEvidenceSummary: [], confidence: 'insufficient_to_close' as any, 
  rivalHypothesisOpen: ['comparison_driven_fragility', 'low_self_worth'], 
  evaluatedHypotheses: {} as any
};

const synth3 = synthesizePsychologicalProfile(mockWideScan, mockSymbolicScan, deep3);
const ui3 = reflectionResultsPresenterV2(synth3);
if (ui3.isLowConfidence === true && ui3.ambiguityDisclaimer?.includes('comparison_driven_fragility')) {
  console.log("✅ Teste 3 (Rival não resolvida): Passou. O report acusa transparência de dados rasos (não inventa conclusões horizontais).");
} else {
  console.log("❌ Teste 3 Falhou.", ui3);
}
