import { EvidenceSignal, DomainKey, EvidencePolarity } from '../types';

export interface RawInputAnswer {
  questionId?: string;
  round?: number;
  domainHint?: DomainKey;
  text?: string;
  polarity?: EvidencePolarity;
  signalType?: EvidenceSignal['signalType'];
  strength?: number;
  objectRef?: string;
}

/**
 * Aggregates raw answers into a normalized evidence ledger.
 * This ensures every piece of evidence points to a concrete domain.
 */
export function aggregateEvidence(rawAnswers: RawInputAnswer[]): EvidenceSignal[] {
  const ledger: EvidenceSignal[] = [];

  rawAnswers.forEach((answer, index) => {
    // Note: integration_pending
    // In a real flow, we map unstructured text/raw answers to a concrete domain and signal.
    // For now, we perform a direct mapping if hints are present, ensuring everything is normalized.
    if (!answer.domainHint) return;

    ledger.push({
      id: `ev_${Date.now()}_${index}`,
      sourceQuestionId: answer.questionId,
      sourceRound: answer.round,
      domain: answer.domainHint,
      signalType: answer.signalType || 'support',
      label: answer.text || 'Unlabeled evidence',
      strength: answer.strength ?? 0.5,
      polarity: answer.polarity || 'supporting',
      objectRef: answer.objectRef,
    });
  });

  return ledger;
}
