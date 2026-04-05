import { ContradictionRule } from './types';

export const ruleCatalog: ContradictionRule[] = [
  {
    id: "RULE_FIN_01",
    targetDomain: "financas_margem",
    contradictionQuestionIds: ["Q_CON_FIN_01", "Q_CON_FIN_02"],
    weakensIf: ["desculpa", "outro_foco"],
    survivesIf: ["muro_real", "condicao_central"],
    notesInternalOnly: "se margem desaparecesse, o vazio central continuava?"
  },
  {
    id: "RULE_FIN_02",
    targetDomain: "financas_margem",
    contradictionQuestionIds: ["Q_CON_FIN_03", "Q_CON_FIN_04"],
    weakensIf: ["nevoeiro_permanece", "nao_saberia_ir"],
    survivesIf: ["plano_claro", "acao_imediata"],
    notesInternalOnly: "havendo margem, a pessoa saberia para onde ir?"
  },
  {
    id: "RULE_HAB_01",
    targetDomain: "habitacao_espaco_autonomia",
    contradictionQuestionIds: ["Q_CON_HAB_01", "Q_CON_HAB_02"],
    weakensIf: ["simbolo", "prisao_interna_mantem"],
    survivesIf: ["cura_imediata", "solucao_absoluta"],
    notesInternalOnly: "o sofrimento vem da casa em si ou da vida adulta suspensa que ela simboliza?"
  },
  {
    id: "RULE_REL_01",
    targetDomain: "relacao_vinculo_formal",
    contradictionQuestionIds: ["Q_CON_REL_01", "Q_CON_REL_02"],
    weakensIf: ["contentor_medo", "contentor_culpa"],
    survivesIf: ["vinculo_central", "amor_real"],
    notesInternalOnly: "a relação está mesmo no centro ou está a servir de contentor para medo, culpa ou dependência?"
  },
  {
    id: "RULE_REL_02",
    targetDomain: "relacao_vinculo_formal",
    contradictionQuestionIds: ["Q_CON_REL_03"],
    weakensIf: ["sairia_sem_custo"],
    survivesIf: ["escolheria_mesmo_assim"],
    notesInternalOnly: "sem custos externos, continuaria a escolha?"
  },
  {
    id: "RULE_CAD_01",
    targetDomain: "centro_afetivo_deslocado",
    contradictionQuestionIds: ["Q_CON_CAD_01", "Q_CON_CAD_02"],
    weakensIf: ["funcao_fuga", "opio", "dependencia_nova"],
    survivesIf: ["amor_real_ancorado"],
    notesInternalOnly: "trata-se de amor real ou função de fuga?"
  },
  {
    id: "RULE_FAM_01",
    targetDomain: "familia_lealdade_papel",
    contradictionQuestionIds: ["Q_CON_FAM_01", "Q_CON_FAM_02"],
    weakensIf: ["habito_papel", "decisao_fuga_clara"],
    survivesIf: ["lealdade_real_base", "responsabilidade_assumida"],
    notesInternalOnly: "há lealdade real ou hábito de papel? sem culpa, a decisão seria mais clara?"
  },
  {
    id: "RULE_TRAB_01",
    targetDomain: "trabalho_desgaste_reconhecimento",
    contradictionQuestionIds: ["Q_CON_TRAB_01", "Q_CON_TRAB_02"],
    weakensIf: ["erosao_geral_vida", "mudanca_nao_resolve"],
    survivesIf: ["problema_trabalho_puro", "cura_com_mudanca"],
    notesInternalOnly: "o problema é o trabalho ou a erosão geral da margem de vida?"
  },
  {
    id: "RULE_FUT_01",
    targetDomain: "futuro_vida_adiada",
    contradictionQuestionIds: ["Q_CON_FUT_01", "Q_CON_FUT_02"],
    weakensIf: ["resultado_bloqueio_material", "condicao_pratica_resolve"],
    survivesIf: ["eixo_central_paralisia", "nevoeiro_absoluto"],
    notesInternalOnly: "a vida adiada é eixo central ou resultado de outros bloqueios materiais?"
  }
];
