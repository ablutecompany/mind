// src/facades/useReflectionInferenceV2.ts
import { wideScanCoreProblems } from '../services/wideScanCoreProblems';
import { symbolicLifeFieldsScan, SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { checkCluster1Eligibility } from '../services/branchDeepeningEngine';
import { testRivalHypotheses, RivalEvidence } from '../services/rivalHypothesisEngine';
import { synthesizePsychologicalProfile } from '../services/finalPsychologicalSynthesis';
import { reflectionResultsPresenterV2, V2UIPayload } from '../presenters/reflectionResultsPresenterV2';
import { EvidenceItem } from '../contracts/inferenceTypes';

export interface V2RunnerInputFull {
  baseA_signals: EvidenceItem[];
  baseB_signals: SymbolicEvidence[];
  deepening_signals: RivalEvidence[];
}

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

  // 5. Transform in visual UI payload that will run transparently side-by-side with Legacy UI
  const uiPayload: V2UIPayload = reflectionResultsPresenterV2(synthesis);

  return {
    isActive: true,
    rawSynthesis: synthesis,
    uiPayload
  };
}
