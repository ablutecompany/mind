// src/facades/useInferenceEngineV2.ts
import { wideScanCoreProblems } from '../services/wideScanCoreProblems';
import { symbolicLifeFieldsScan, SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { EvidenceItem } from '../contracts/inferenceTypes';

export interface V2RunnerInput {
  baseA_signals: EvidenceItem[];
  baseB_signals: SymbolicEvidence[];
}

export function useInferenceEngineV2(featureFlagEnabled: boolean, sessionContext: V2RunnerInput) {
  if (!featureFlagEnabled) {
    // Retorna vazio ou passa para a legacy app
    return { isActive: false, results: null };
  }

  // 1. Wide Scan (Base A)
  const wideScanResult = wideScanCoreProblems(sessionContext.baseA_signals);

  // 2. Symbolic Life Fields (Base B) - A app já NÃO salta do geral diretamente para o resultado
  const symbolicResult = symbolicLifeFieldsScan(wideScanResult, sessionContext.baseB_signals);

  // 3. Resultado intermédio devolvido "lado a lado" ao motor antigo
  return {
    isActive: true,
    results: {
      wideScan: wideScanResult,
      symbolicContext: symbolicResult
    }
  };
}
