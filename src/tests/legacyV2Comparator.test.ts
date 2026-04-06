// src/tests/legacyV2Comparator.test.ts
import { compareLegacyVsV2, LegacyMockOutput } from '../adapters/legacyV2Comparator';
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { V2UIPayload } from '../presenters/reflectionResultsPresenterV2';

console.log("Testing Integration & Legacy vs V2 Comparison...\n");

const legacyOutput: LegacyMockOutput = {
  dominantIssues: ['Ansiedade', 'Procrastinação', 'Insegurança'],
  secondaryIssues: ['Problemas no trabalho'],
  vagueNarrativeSummary: 'Pareces ansioso e adias muito as coisas que te fazem sentir inseguro no trabalho.'
};

const v2Output: FinalPsychologicalSynthesis = {
  manifestTheme: 'Pressão sentida na área de trabalho_progresso',
  latentTheme: 'Sofrimento ancorado em low_self_worth',
  dominantProblem: 'low_self_worth',
  supportingProblem: null,
  primaryDefense: 'avoidant_procrastination',
  centralConflict: null,
  lifeFieldMostCharged: 'trabalho_progresso',
  likelyVisibleBehaviors: [],
  confidence: 'dominant_strong' as any,
  rivalHypothesisOpen: null,
  unknowns: []
};

const v2UI: V2UIPayload = {
  headline: 'Sofrimento ancorado em low_self_worth',
  subHeadline: 'Pressão sentida na área de trabalho_progresso',
  dynamicBands: [],
  isLowConfidence: false
};

const report = compareLegacyVsV2(legacyOutput, v2Output, v2UI);

if (report.improvedDiscrimination) {
  console.log("✅ Comparação Executada com Sucesso.");
  console.log("-----------------------------------------");
  console.log("🚨 ANTES (Legacy App):", report.legacyReadiness);
  console.log("🎯 DEPOIS (V2 Engine):", report.v2Outcome);
  console.log("-----------------------------------------");
  console.log("A V2 limpou o ruído, colapsando 'Ansiedade' e categorizando Procrastinação como defesa de um núcleo estrutural exato.");
} else {
  console.log("❌ Teste de discriminação falhou.");
}
