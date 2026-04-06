// src/contracts/inferenceTypes.ts
import { CoreProblemId } from './coreProblemOntology';

export interface EvidenceItem {
  sourceId: string; // ID da pergunta ou evento
  signal: string;   // ex: "evita_tarefas_dificeis"
  weight: number;   // 0.0 a 1.0
  polarity: 'for' | 'against';
}

export type CandidateStatus = 'inactive' | 'suspected' | 'deepening' | 'competing' | 'confirmed' | 'rejected';
export type ConfidenceBand = 'low' | 'medium' | 'high';

export interface ProblemCandidate {
  id: CoreProblemId;
  label: string;
  activationScore: number;
  evidenceFor: EvidenceItem[];
  evidenceAgainst: EvidenceItem[];
  rivalIds: CoreProblemId[];
  status: CandidateStatus;
  confidence: ConfidenceBand;
}

export interface WideScanResult {
  topSuspects: ProblemCandidate[];
  rivalSuspects: ProblemCandidate[];
  allCandidates: Record<CoreProblemId, ProblemCandidate>;
  isAmbiguous: boolean; // True se houverem demasiados núcleos ativos simultaneamente
  scanConfidence: ConfidenceBand;
}
