import { EvidenceSignal } from '../../types';

export const caseCEspacoNaoEmancipadaLedger: EvidenceSignal[] = [
  {
    id: "f1", sourceQuestionId: "q_hab_1", domain: "habitacao_espaco_autonomia", signalType: "pain", label: "falta_espaco_vida_suspensa", strength: 0.95, polarity: "supporting", objectRef: "casa"
  },
  {
    id: "f2", sourceQuestionId: "q_hab_2", domain: "habitacao_espaco_autonomia", signalType: "constraint", label: "nao_emancipacao_fisica", strength: 0.9, polarity: "supporting"
  },
  {
    id: "f3", sourceQuestionId: "q_fam_1", domain: "familia_lealdade_papel", signalType: "pain", label: "peso_convivencia_imposta", strength: 0.8, polarity: "supporting"
  },
  {
    id: "f4", sourceQuestionId: "q_fut_1", domain: "futuro_vida_adiada", signalType: "pain", label: "adulto_em_espera", strength: 0.85, polarity: "supporting"
  },
  // Contradictor logic showing real physical restriction
  {
    id: "f5", sourceQuestionId: "q_cont_hab_1", domain: "habitacao_espaco_autonomia", signalType: "support", label: "cura_imediata", strength: 0.9, polarity: "supporting" 
  },
  {
    id: "f6", sourceQuestionId: "q_cont_hab_2", domain: "habitacao_espaco_autonomia", signalType: "support", label: "solucao_absoluta", strength: 0.9, polarity: "supporting" 
  }
];
