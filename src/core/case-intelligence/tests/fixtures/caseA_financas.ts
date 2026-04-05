import { EvidenceSignal } from '../../types';

export const caseAFinancasLedger: EvidenceSignal[] = [
  {
    id: "f1", sourceQuestionId: "q_fin_1", domain: "financas_margem", signalType: "pain", label: "falta_de_margem_esmagadora", strength: 0.9, polarity: "supporting", objectRef: "dinheiro"
  },
  {
    id: "f2", sourceQuestionId: "q_fin_2", domain: "financas_margem", signalType: "constraint", label: "imobilidade_financeira_pratica", strength: 0.95, polarity: "supporting", objectRef: "conta_margem"
  },
  {
    id: "f3", sourceQuestionId: "q_fin_3", domain: "financas_margem", signalType: "desire", label: "desejo_liberdade_agir", strength: 0.8, polarity: "supporting"
  },
  {
    id: "f4", sourceQuestionId: "q_fut_1", domain: "futuro_vida_adiada", signalType: "pain", label: "sensacao_estagnacao_pura", strength: 0.7, polarity: "supporting"
  },
  // Contradictor answers showing the block is purely material
  {
    id: "f5", sourceQuestionId: "q_cont_fin_1", domain: "financas_margem", signalType: "support", label: "muro_real", strength: 0.9, polarity: "supporting" // Resolvia inteiramente
  },
  {
    id: "f6", sourceQuestionId: "q_cont_fin_2", domain: "financas_margem", signalType: "support", label: "plano_claro", strength: 0.9, polarity: "supporting" // Sabe para onde ir se houver dinheiro
  }
];
