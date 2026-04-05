export type DomainKey = 
  | 'financas_margem'
  | 'habitacao_espaco_autonomia'
  | 'relacao_vinculo_formal'
  | 'centro_afetivo_deslocado'
  | 'familia_lealdade_papel'
  | 'trabalho_desgaste_reconhecimento'
  | 'futuro_vida_adiada'
  | 'culpa_remorso_omissao'
  | 'vergonha_reserva_exposicao'
  | 'controlo_humilhacao_injustica'
  | 'corpo_tensao_alerta'
  | 'casa_refugio_vs_prisao'
  | 'liberdade_vs_estabilidade'
  | 'paz_vs_chama'
  | 'autonomia_vs_pertenca';

export type PainKey = string;
export type BlockerKey = string;
export type DesireKey = string;
export type ConflictKey = string;
export type NarrativeShapeKey = string;

export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type EvidencePolarity = 'supporting' | 'contradictory';
export type UncertaintyFlag = string;

export interface EvidenceSignal {
  id: string;
  sourceQuestionId?: string;
  sourceRound?: number;
  domain: DomainKey;
  signalType: 'pain' | 'constraint' | 'desire' | 'conflict' | 'cost_of_change' | 'cost_of_staying' | 'contradiction' | 'support';
  label: string;
  strength: number;            // 0..1
  polarity: EvidencePolarity;
  objectRef?: string;          // ex: dinheiro, casa, casamento, outra pessoa, família, trabalho
  notesInternalOnly?: string;
}

export interface CaseRealityMap {
  dominantDomain: DomainKey | null;
  secondaryDomains: DomainKey[];
  dominantProblem: string | null;
  dominantPain: string | null;
  dominantConstraint: string | null;
  dominantDesire: string | null;
  dominantConflict: string | null;
  dominantBlockers: string[];
  dominantCostsOfChange: string[];
  dominantCostsOfStaying: string[];
  supportingEvidence: EvidenceSignal[];
  contradictoryEvidence: EvidenceSignal[];
  likelyInternalDrivers: string[];
  uncertaintyFlags: UncertaintyFlag[];
  confidenceLevel: ConfidenceLevel;
  caseFingerprint: CaseFingerprint | null;
  reportableInsights: ReportableInsight[];
  recognitionLines: RecognitionLine[];
  rejectedGenericInsights: RejectedInsight[];
}

export interface CaseFingerprint {
  topDomains: DomainKey[];
  topPains: string[];
  topBlockers: string[];
  topDesires: string[];
  topConflicts: string[];
  topEvidenceSignals: string[];
  dominantNarrativeShape: NarrativeShapeKey | null;
  rejectionProfile: string[];
  uncertaintyProfile: string[];
}

export interface ReportableInsight {
  id: string;
  title: string;
  body: string;
  anchoredDomains: DomainKey[];
  anchoredObjects: string[];
  evidenceSupportScore: number;
  specificityScore: number;
  recognizabilityScore: number;
  abstractionScore: number;
  domainAnchoringScore: number;
  realityLinkScore: number;
  contradictionTestScore: number;
  duplicationRiskScore: number;
  validated: boolean;
  probable: boolean;
  inconclusive: boolean;
  rejectionReasons?: string[];
}

export interface RecognitionLine {
  id: string;
  text: string;
  anchoredDomain: DomainKey;
  anchoredObjects: string[];
  specificityScore: number;
  recognizabilityScore: number;
  evidenceSupportScore: number;
  abstractionScore: number;
  duplicationRiskScore: number;
  rejected?: boolean;
  rejectionReasons?: string[];
}

export interface RejectedInsight {
  id: string;
  text: string;
  rejectedBecause: string[];
}
