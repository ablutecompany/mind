export type QuestionFunctionType =
  | 'anchor'
  | 'screening'
  | 'discriminator'
  | 'validation'
  | 'causality'
  | 'functioning'
  | 'blocker'
  | 'cost_of_change'
  | 'cost_of_staying'
  | 'contradictor'
  | 'reentry'
  | 'narrowing'
  | 'confidence_boost'
  | 'uncertainty_probe';

export type QuestionMaskType =
  | 'quotidiano'
  | 'pratico'
  | 'organizacional'
  | 'relacional'
  | 'escolha'
  | 'perda'
  | 'rotina'
  | 'futuro'
  | 'responsabilidade'
  | 'espaco'
  | 'margem'
  | 'corpo'
  | 'silencio';

export type AnswerType =
  | 'single_select'
  | 'multi_select'
  | 'scale'
  | 'short_text'
  | 'long_text'
  | 'ranked_choice'
  | 'binary'
  | 'tri_state'
  | 'pass_allowed';

export type InputMode =
  | 'buttons'
  | 'cards'
  | 'slider'
  | 'chips'
  | 'text'
  | 'textarea'
  | 'ranker';

export type SignalTarget =
  | 'dominant_domain'
  | 'pain'
  | 'constraint'
  | 'desire'
  | 'conflict'
  | 'blocker'
  | 'cost_of_change'
  | 'cost_of_staying'
  | 'contradiction'
  | 'confidence'
  | 'uncertainty';

export interface QuestionOption {
  id: string;
  label: string;
  shortLabel: string;
  addsEvidence?: Array<{
    domain: string;
    signalType: string;
    label: string;
    strength: number; // 0..1
    objectRef?: string;
  }>;
  subtractsEvidence?: Array<{
    domain: string;
    signalType: string;
    label: string;
    strength: number; // 0..1
    objectRef?: string;
  }>;
  tags?: string[];
  optionFingerprint?: string;
}

export interface QuestionNode {
  id: string;
  prompt: string;
  shortLabel: string;
  primaryDomain: string;
  secondaryDomain?: string | null;
  functionType: QuestionFunctionType;
  maskType: QuestionMaskType;
  answerType: AnswerType;
  options?: QuestionOption[];
  inputMode?: InputMode;
  discriminatesWhat: string[];
  evidenceAdds: string[];
  evidenceSubtracts: string[];
  strongIf: string[];
  weakIf: string[];
  contradictionWith: string[];
  exclusionRules: string[];
  askOnlyIf: string[];
  askAfterDistanceMin: number;
  semanticCluster: string;
  similarityBlockers: string[];
  emotionalIntensity: number;     // 1..5
  intrusivenessLevel: number;     // 1..5
  expectedSignalStrength: number; // 0..1
  shouldTriggerReentry: boolean;
  notesInternalOnly?: string;
  version: string;
  active: boolean;
}

export interface QuestionAskContext {
  round: number;
  askedQuestionIds: string[];
  askedSemanticClusters: string[];
  askedPromptFingerprints: string[];
  shownOptionSetFingerprints: string[];
  activeDomains: string[];
  rejectedDomains: string[];
  currentDominantDomain?: string | null;
  currentTopDomains: string[];
  currentConfidenceLevel: 'low' | 'medium' | 'high';
  uncertaintyFlags: string[];
  evidenceLedgerSummary: string[];
  lastQuestions: Array<{
    id: string;
    semanticCluster: string;
    round: number;
  }>;
}

export interface QuestionSelectionResult {
  eligible: QuestionNode[];
  blocked: Array<{
    questionId: string;
    reasons: string[];
  }>;
}
