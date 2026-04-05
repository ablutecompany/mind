import { ReportGenerationInput } from '../report/types';
import { DomainKey } from '../types';

export interface RecognitionCandidate {
  id: string;
  text: string;
  targetDomain: DomainKey;
  evidenceSupportScore: number;
  domainAnchoringScore: number;
  abstractionScore: number; // Lower is better
  duplicationRisk: number; // Lower is better
  rejected?: boolean;
  rejectionReasons?: string[];
}

export interface RecognitionPack {
  candidatesEval: RecognitionCandidate[]; // Internal record of all generated attempts
  finalLines: string[]; // Only the approved items (2 to 4 max)
}

export interface RecognitionRule {
  id: string;
  domain: DomainKey;
  template: string;
  minEvidenceScore: number;
  requiresConstraint?: boolean;
  requiresPain?: boolean;
}
