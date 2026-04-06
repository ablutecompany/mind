// src/services/rivalHypothesisEngine.ts

import { 
  ClusterRivalHypothesisId, 
  DeepeningClusterOutput, 
  EvaluatedHypothesis 
} from '../contracts/clusterDiscriminativeTypes';

export interface RivalEvidence {
  hypothesisId: ClusterRivalHypothesisId;
  signal: string;
  weight: number;
  polarity: 'for' | 'against';
}

export function testRivalHypotheses(evidence: RivalEvidence[]): DeepeningClusterOutput {
  const evalHypo: Record<ClusterRivalHypothesisId, EvaluatedHypothesis> = {
    low_self_worth: { id: 'low_self_worth', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] },
    approval_dependence: { id: 'approval_dependence', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] },
    comparison_driven_fragility: { id: 'comparison_driven_fragility', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] },
    fear_of_failure: { id: 'fear_of_failure', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] },
    avoidant_procrastination: { id: 'avoidant_procrastination', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] },
    inner_conflict: { id: 'inner_conflict', role: 'rejected', activationScore: 0, evidenceFor: [], evidenceAgainst: [] }
  };

  // 1. Acumular Evidência a Favor e Contra
  evidence.forEach(ev => {
    if (ev.polarity === 'for') {
      evalHypo[ev.hypothesisId].activationScore += ev.weight;
      evalHypo[ev.hypothesisId].evidenceFor.push(ev.signal);
    } else {
      evalHypo[ev.hypothesisId].activationScore -= ev.weight;
      evalHypo[ev.hypothesisId].evidenceAgainst.push(ev.signal);
    }
  });

  // Cross-rival logic deductions (Oposição ativa)
  // Se medo de falhar sobe muito e avoidant_procrastination sobe também, medo de falhar anula "fuga difusa" e absorve-o como sintoma
  if (evalHypo.fear_of_failure.activationScore >= 1.0 && evalHypo.avoidant_procrastination.activationScore > 0) {
    evalHypo.avoidant_procrastination.activationScore -= 0.6; // Procrastinação passa de núcleo a sintoma de medo
    evalHypo.fear_of_failure.evidenceFor.push("Procrastinação absorvida como sintoma do medo de falhar");
  }

  // Se comparison sobe muito mas self_worth tb sobe muito, comparação costuma ser agravante de self_worth
  if (evalHypo.low_self_worth.activationScore >= 1.2 && evalHypo.comparison_driven_fragility.activationScore > 0.5) {
    evalHypo.comparison_driven_fragility.activationScore -= 0.5; // Desce a agravante
  }

  // Se aprovação está alta, mas inner_conflict (dever vs querer) tb, aprovação pode ser sintoma do dever
  if (evalHypo.inner_conflict.activationScore > 1.0 && evalHypo.approval_dependence.activationScore > 0.5) {
    evalHypo.approval_dependence.activationScore -= 0.4;
  }

  const active = Object.values(evalHypo)
    .filter(h => h.activationScore > 0)
    .sort((a, b) => b.activationScore - a.activationScore);

  let dominantProblem: ClusterRivalHypothesisId | null = null;
  let supportingProblem: ClusterRivalHypothesisId | null = null;
  let primaryDefense: ClusterRivalHypothesisId | null = null;
  let centralConflict: ClusterRivalHypothesisId | null = null;
  let rivalHypothesisOpen: ClusterRivalHypothesisId[] | null = null;
  let confidence: 'low' | 'medium' | 'high' = 'low';

  const evidenceSummary: string[] = [];
  const counterEvidenceSummary: string[] = [];

  if (active.length === 0) {
    return {
      dominantProblem, supportingProblem, primaryDefense, centralConflict,
      evidenceSummary, counterEvidenceSummary, confidence, rivalHypothesisOpen, evaluatedHypotheses: evalHypo
    };
  }

  // Analisar hierarquia forte
  dominantProblem = active[0].id;
  active[0].role = 'dominant';
  evidenceSummary.push(...active[0].evidenceFor);
  counterEvidenceSummary.push(...active[0].evidenceAgainst);

  confidence = active[0].activationScore > 1.5 ? 'high' : 'medium';

  if (active.length > 1) {
    const diff = active[0].activationScore - active[1].activationScore;
    
    // Teste de Rivalidade irresolúvel (empate horizontal clássico)
    if (diff < 0.3) {
      rivalHypothesisOpen = [active[0].id, active[1].id];
      confidence = 'low';
      active[1].role = 'competing';
      // Invalida dominant claro
      supportingProblem = null; 
    } else {
      // Diferenciação Clara
      if (active[1].id === 'approval_dependence' || active[1].id === 'avoidant_procrastination') {
        primaryDefense = active[1].id;
        active[1].role = 'defense';
      } else if (active[1].id === 'inner_conflict') {
        centralConflict = active[1].id;
        active[1].role = 'symptom';
      } else if (active[1].id === 'comparison_driven_fragility') {
        supportingProblem = active[1].id;
        active[1].role = 'aggravator';
      } else {
        supportingProblem = active[1].id;
        active[1].role = 'supporting';
      }
      evidenceSummary.push(...active[1].evidenceFor);
    }
  }

  if (active.length > 2 && rivalHypothesisOpen === null) {
      if (!centralConflict && active[2].id === 'inner_conflict') {
         centralConflict = active[2].id;
         active[2].role = 'symptom';
      } else if (!primaryDefense && (active[2].id === 'approval_dependence' || active[2].id === 'avoidant_procrastination')) {
         primaryDefense = active[2].id;
         active[2].role = 'defense';
      } else {
         active[2].role = 'symptom';
      }
  }

  return {
    dominantProblem,
    supportingProblem,
    primaryDefense,
    centralConflict,
    evidenceSummary,
    counterEvidenceSummary,
    confidence,
    rivalHypothesisOpen,
    evaluatedHypotheses: evalHypo
  };
}
