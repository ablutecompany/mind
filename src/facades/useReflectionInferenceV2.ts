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
  const symCross = runSymmetryCrossing(wideScanResult, sessionContext.blocksAnswered || 0, sessionContext.rawAnswers || []);

  const hasEnoughDepth = symCross.readingDepth >= 3;
  
  // Regras de Matriz de Confiança
  let finalConfidence = 'baixa';
  if (symCross.convergenceSignals.length > 0 && hasEnoughDepth) finalConfidence = 'forte';
  else if (symCross.convergenceSignals.length > 0) finalConfidence = 'boa';
  else if (hasEnoughDepth) finalConfidence = 'moderada';
  if (wideScanResult.isAmbiguous) finalConfidence = 'baixa';

  const engineOutput = {
    dominantAxis: symCross.dominantAxis,
    secondaryAxis: symCross.secondaryAxis,
    confidenceLevel: finalConfidence,
    convergenceSignals: symCross.convergenceSignals,
    lowDifferentiation: wideScanResult.isAmbiguous,
    readingDepth: symCross.readingDepth,
    provisionalSummary: `Tensão primária detetada no eixo ${symCross.dominantAxis || 'misto'}. ${symCross.convergenceSignals.join('. ')}`,
    strongSummary: hasEnoughDepth ? symCross.strongSummary : null,
    symbolicSignals: [synthesis.manifestTheme, synthesis.latentTheme]
  };

  return {
    isActive: true,
    rawSynthesis: synthesis,
    uiPayload: engineOutput
  };
}
