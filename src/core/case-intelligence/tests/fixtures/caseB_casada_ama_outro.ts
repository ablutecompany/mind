import { EvidenceSignal } from '../../types';

export const caseBCasadaAmaOutroLedger: EvidenceSignal[] = [
  {
    id: "f1", sourceQuestionId: "q_rel_1", domain: "relacao_vinculo_formal", signalType: "constraint", label: "permanencia_por_estrutura", strength: 0.9, polarity: "supporting", objectRef: "casamento_formal"
  },
  {
    id: "f2", sourceQuestionId: "q_cad_1", domain: "centro_afetivo_deslocado", signalType: "pain", label: "centro_emocional_divido", strength: 0.95, polarity: "supporting", objectRef: "outra_pessoa"
  },
  {
    id: "f3", sourceQuestionId: "q_culpa_1", domain: "culpa_remorso_omissao", signalType: "cost_of_change", label: "custo_filhos_e_culpa", strength: 0.85, polarity: "supporting"
  },
  {
    id: "f4", sourceQuestionId: "q_rel_2", domain: "relacao_vinculo_formal", signalType: "pain", label: "vazio_e_distancia", strength: 0.7, polarity: "supporting"
  },
  // Contradictor logic showing structure constraints
  {
    id: "f5", sourceQuestionId: "q_cont_rel_1", domain: "relacao_vinculo_formal", signalType: "support", label: "sairia_sem_custo", strength: 0.85, polarity: "supporting" 
  },
  {
    id: "f6", sourceQuestionId: "q_cont_cad_1", domain: "centro_afetivo_deslocado", signalType: "support", label: "amor_real_ancorado", strength: 0.9, polarity: "supporting" // not an alibi
  }
];
