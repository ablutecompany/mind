import { EvidenceSignal } from '../../types';

export const caseFFuturoAdiadoLedger: EvidenceSignal[] = [
  {
    id: "f1", domain: "futuro_vida_adiada", signalType: "pain", label: "sensacao_de_atraso_cronico", strength: 0.9, polarity: "supporting"
  },
  {
    id: "f2", domain: "futuro_vida_adiada", signalType: "constraint", label: "ausencia_de_passo_adulto", strength: 0.85, polarity: "supporting"
  },
  {
    id: "f3", domain: "futuro_vida_adiada", signalType: "conflict", label: "quer_mas_nao_arranca", strength: 0.8, polarity: "supporting"
  },
  // Contradictor: Proves this is the core axis
  {
    id: "f4", domain: "futuro_vida_adiada", signalType: "support", label: "eixo_central_paralisia", strength: 0.9, polarity: "supporting"
  },
  {
    id: "f5", domain: "futuro_vida_adiada", signalType: "support", label: "nevoeiro_absoluto", strength: 0.8, polarity: "supporting"
  }
];
