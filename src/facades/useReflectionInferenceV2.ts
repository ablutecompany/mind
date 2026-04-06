// src/facades/useReflectionInferenceV2.ts
import { wideScanCoreProblems } from '../services/wideScanCoreProblems';
import { symbolicLifeFieldsScan, SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { checkCluster1Eligibility } from '../services/branchDeepeningEngine';
import { testRivalHypotheses, RivalEvidence } from '../services/rivalHypothesisEngine';
import { synthesizePsychologicalProfile } from '../services/finalPsychologicalSynthesis';
import { reflectionResultsPresenterV2, V2UIPayload } from '../presenters/reflectionResultsPresenterV2';
import { EvidenceItem } from '../contracts/inferenceTypes';

import { V2RunnerInputFull } from '../adapters/surveyResponsesToV2EvidenceAdapter';
import { runSymmetryCrossing } from '../services/crossSymmetryEngine';

export function useReflectionInferenceV2(featureFlagEnabled: boolean, sessionContext: V2RunnerInputFull) {
  if (!featureFlagEnabled) {
    return { isActive: false, payload: null };
  }

  // 1. Wide Scan
  const wideScanResult = wideScanCoreProblems(sessionContext.baseA_signals);

  // 2. Symbolic Scan
  const symbolicResult = symbolicLifeFieldsScan(wideScanResult, sessionContext.baseB_signals);

  // 3. Branch Deepening (Cluster 1)
  let clusterDeepeningOutput = testRivalHypotheses([]); // Vazio por default

  if (checkCluster1Eligibility(wideScanResult, symbolicResult)) {
    // Se o cluster abriu, injeta as respostas específicas recolhidas
    clusterDeepeningOutput = testRivalHypotheses(sessionContext.deepening_signals);
  }

  // 4. Final Synthesis
  const synthesis = synthesizePsychologicalProfile(
    wideScanResult,
    symbolicResult,
    clusterDeepeningOutput
  );

  // 5. Novo Motor de Cruzamento de Eixos Intermédios Neutros (Symmetry Engine)
  const symbolicSignalsPresent = synthesis.manifestTheme !== "Temas práticos difusos" || sessionContext.baseB_signals.length > 0;
  const symCross = runSymmetryCrossing(wideScanResult, sessionContext.blocksAnswered || 0, sessionContext.rawAnswers || [], symbolicSignalsPresent);

  const depth = symCross.readingDepth;
  const metrics = symCross.dispersionMetrics;
  
  // Regras Novas Matriz de Confiança
  let finalConfidence = 'baixa';
  let isNebula = wideScanResult.isAmbiguous || metrics.hasDispersal || metrics.hasContradiction;

  if (depth <= 1 || isNebula) {
    finalConfidence = 'baixa';
  } else if (depth === 2 && !isNebula) {
    finalConfidence = 'moderada';
  } else if (depth === 3 && metrics.hasConvergence && !metrics.hasDispersal) {
    finalConfidence = 'boa';
  } else if (depth >= 4 && metrics.hasConvergence && !isNebula && symbolicSignalsPresent) {
    finalConfidence = 'forte';
  } else if (depth >= 3) {
    finalConfidence = 'moderada'; // Fallback if 3 or 4 but dispersed
  }

  const engineOutput = {
    dominantAxis: symCross.dominantAxis,
    secondaryAxis: symCross.secondaryAxis,
    confidenceLevel: finalConfidence,
    intermediatePatterns: symCross.intermediatePatterns,
    convergenceSignals: symCross.convergenceSignals,
    dispersionAlert: symCross.dispersionDesc,
    lowDifferentiation: isNebula,
    readingDepth: depth,
    provisionalSummary: `Tensão no eixo ${symCross.dominantAxis || 'misto'}. ${symCross.dispersionDesc || ''}`,
    strongSummary: finalConfidence === 'forte' ? symCross.strongSummary : null,
    symbolicSignals: [synthesis.manifestTheme, synthesis.latentTheme]
  };

  return {
    isActive: true,
    rawSynthesis: synthesis,
    uiPayload: engineOutput
  };
}
