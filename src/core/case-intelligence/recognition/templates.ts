import { RecognitionRule } from './types';

export const RECOGNITION_TEMPLATES: RecognitionRule[] = [
  // FINANÇAS E MARGEM
  {
    id: "REC_FIN_01",
    domain: "financas_margem",
    template: "O dinheiro aparece aqui menos como detalhe e mais como limite real à tua autonomia.",
    minEvidenceScore: 0.8,
    requiresConstraint: true
  },
  {
    id: "REC_FIN_02",
    domain: "financas_margem",
    template: "Parte do bloqueio parece estrutural e logístico: há falta de margem material para alterar a rotina.",
    minEvidenceScore: 0.7
  },
  {
    id: "REC_FIN_03",
    domain: "financas_margem",
    template: "O que te trava pode não ser falta de vontade. Pode ser falta de margem para mexer na vida.",
    minEvidenceScore: 0.85,
    requiresConstraint: true
  },

  // HABITAÇÃO E ESPAÇO
  {
    id: "REC_HAB_01",
    domain: "habitacao_espaco_autonomia",
    template: "A ausência de espaço afeta diretamente o teu sentido de independência funcional.",
    minEvidenceScore: 0.8,
    requiresPain: true
  },
  {
    id: "REC_HAB_02",
    domain: "habitacao_espaco_autonomia",
    template: "A questão da casa pode estar a pesar menos como conforto e mais como condição de vida adulta.",
    minEvidenceScore: 0.75
  },
  {
    id: "REC_HAB_03",
    domain: "habitacao_espaco_autonomia",
    template: "A questão de não teres a tua própria porta agrava o desgaste dos teus dias.",
    minEvidenceScore: 0.8,
    requiresPain: true
  },

  // RELAÇÃO E CENTRO AFETIVO DESLOCADO
  {
    id: "REC_REL_01",
    domain: "relacao_vinculo_formal",
    template: "O vínculo que manténs pode continuar por estrutura, mesmo que vitalidade relacional pura esteja ausente.",
    minEvidenceScore: 0.85,
    requiresConstraint: true
  },
  {
    id: "REC_REL_02",
    domain: "relacao_vinculo_formal",
    template: "O passo parece menos suspenso por sentimento e mais pelo custo logístico e prático da separação.",
    minEvidenceScore: 0.8,
    requiresConstraint: true
  },
  {
    id: "REC_CAD_01",
    domain: "centro_afetivo_deslocado",
    template: "Há sinais de divisão entre a vida formal que continua e o centro emocional que parece já não coincidir por inteiro.",
    minEvidenceScore: 0.85,
    requiresPain: true
  },

  // FUTURO E VIDA ADIADA
  {
    id: "REC_FUT_01",
    domain: "futuro_vida_adiada",
    template: "Aquilo que mais pesa pode não ser apenas o presente difícil; pode ser a sensação de vida adiada.",
    minEvidenceScore: 0.8,
    requiresPain: true
  },
  {
    id: "REC_FUT_02",
    domain: "futuro_vida_adiada",
    template: "O bloqueio aqui parece menos pontual e mais estrutural.",
    minEvidenceScore: 0.75,
    requiresConstraint: true
  },
  {
    id: "REC_FUT_03",
    domain: "futuro_vida_adiada",
    template: "A paralisia resulta num congelamento prático que impede que arranques decisões com impacto visível.",
    minEvidenceScore: 0.85,
    requiresPain: true
  }
];
