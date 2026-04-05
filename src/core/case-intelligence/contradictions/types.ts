export interface ContradictionRule {
  id: string;
  targetDomain: string;
  targetSignal?: string;
  contradictionQuestionIds: string[];
  weakensIf: string[]; // Options or signal keys that weaken the hypothesis
  survivesIf: string[]; // Options or signal keys that strengthen the hypothesis
  notesInternalOnly?: string;
}

export interface ContradictionResult {
  targetDomain: string;
  targetSignal?: string;
  tested: boolean;
  survived: boolean;
  weakened: boolean;
  unresolved: boolean;
  evidenceFor: string[];
  evidenceAgainst: string[];
  confidenceDelta: number;
}
