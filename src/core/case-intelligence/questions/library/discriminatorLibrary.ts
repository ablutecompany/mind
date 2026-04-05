import { QuestionNode } from '../types';

export const discriminatorLibrary: QuestionNode[] = [
  // FINANÇAS
  {
    id: "Q_DIS_FIN_01",
    prompt: "Há decisões que não tomas estritamente porque não tens margem real para as pagar?",
    shortLabel: "muralha do dinheiro",
    primaryDomain: "financas_margem",
    functionType: "discriminator",
    maskType: "margem",
    answerType: "tri_state",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Sim, fico porque não me posso sustentar fora daqui.", shortLabel: "trava central", addsEvidence: [{ domain: "financas_margem", signalType: "constraint", label: "dependência intransponível", strength: 0.95 }] },
      { id: "o2", label: "É uma desculpa que me dou, na verdade o medo é outro.", shortLabel: "desculpa", subtractsEvidence: [{ domain: "financas_margem", signalType: "constraint", label: "dependência monetária", strength: 0.8 }] },
      { id: "o3", label: "Isso é um agravante mas não é o motivo principal.", shortLabel: "fator agravante", addsEvidence: [{ domain: "financas_margem", signalType: "pain", label: "tensão partilhada", strength: 0.4 }] }
    ],
    discriminatesWhat: ["se o dinheiro é a alínea realística do bloqueio ou fita adesiva para o verdadeiro medo"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:financas_margem"], askAfterDistanceMin: 1, semanticCluster: "finance_constraint", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_FIN_02",
    prompt: "A escassez atual corta a tua dignidade ou apenas os teus planos de futuro?",
    shortLabel: "dignidade vs plano",
    primaryDomain: "financas_margem",
    functionType: "discriminator",
    maskType: "pratico",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Ambos. Tenho de engolir coisas que destroem a minha dignidade hoje.", shortLabel: "dignidade cortada", addsEvidence: [{ domain: "controlo_humilhacao_injustica", signalType: "pain", label: "humilhação associada às finanças", strength: 0.85 }] },
      { id: "o2", label: "Consigo viver o dia-a-dia bem, mas estou impedido de saltar para o meu próprio trilho.", shortLabel: "futuro suspenso", addsEvidence: [{ domain: "futuro_vida_adiada", signalType: "constraint", label: "futuro parado por verba", strength: 0.85 }] }
    ],
    discriminatesWhat: ["tensão basal de sobrevivência/humilhação versus restrição de expansão e autonomia"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:financas_margem"], askAfterDistanceMin: 2, semanticCluster: "no_margin_to_move", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // HABITAÇÃO
  {
    id: "Q_DIS_HAB_01",
    prompt: "Viver sem espaço próprio faz-te sentir apenas desconforto ou atraso adulto real?",
    shortLabel: "desconforto vs regresso adolescente",
    primaryDomain: "habitacao_espaco_autonomia",
    functionType: "discriminator",
    maskType: "espaco",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Sinto-me regredido a alguém que não tem leme.", shortLabel: "atraso adulto", addsEvidence: [{ domain: "futuro_vida_adiada", signalType: "pain", label: "sensação de regressão", strength: 0.9, objectRef: "casa" }] },
      { id: "n", label: "É apenas logístico da fase atual, sou muito adulto no resto.", shortLabel: "apenas logística", subtractsEvidence: [{ domain: "futuro_vida_adiada", signalType: "pain", label: "sensação de regressão", strength: 0.9 }] }
    ],
    discriminatesWhat: ["peso ontológico do espaço não conquistado"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:habitacao_espaco_autonomia"], askAfterDistanceMin: 1, semanticCluster: "housing_adult_delay", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_HAB_02",
    prompt: "Se entrares agora na tua casa, o corpo descontrai ou entra em modo de defesa?",
    shortLabel: "corpo na casa",
    primaryDomain: "habitacao_espaco_autonomia",
    secondaryDomain: "corpo_tensao_alerta",
    functionType: "discriminator",
    maskType: "corpo",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Descontrai. É lá o meu sítio seguro, apesar das falhas.", shortLabel: "descontrai", addsEvidence: [{ domain: "casa_refugio_vs_prisao", signalType: "support", label: "casa amparo", strength: 0.85 }] },
      { id: "o2", label: "Fica em hiper-vigilância, como de quem entra no palco do inimigo.", shortLabel: "vigilância", addsEvidence: [{ domain: "corpo_tensao_alerta", signalType: "pain", label: "tensão associada à entrada em casa", strength: 0.9 }] },
      { id: "o3", label: "Não me aquece nem arrefece, durmo e saio.", shortLabel: "tenda dormitório"}
    ],
    discriminatesWhat: ["toxidade estrutural no ambiente da casa versus insuficiência estrutural pacífica"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:habitacao_espaco_autonomia"], askAfterDistanceMin: 2, semanticCluster: "house_as_wound", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 2, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // VÍNCULO
  {
    id: "Q_DIS_VINC_01",
    prompt: "Se não existissem consequências práticas ou logísticas nenhumas amanhã, continuarias a escolher esta relação?",
    shortLabel: "testar livre arbítrio da relação",
    primaryDomain: "relacao_vinculo_formal",
    functionType: "discriminator",
    maskType: "escolha",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Sim, o meu coração está aqui de livre vontade.", shortLabel: "escolho de novo", addsEvidence: [{ domain: "relacao_vinculo_formal", signalType: "support", label: "vínculo afetivo vivo", strength: 1.0 }] },
      { id: "n", label: "Não, sem o peso da família e da margem, eu já cá não estava.", shortLabel: "apenas âncora", addsEvidence: [{ domain: "relacao_vinculo_formal", signalType: "constraint", label: "peso estrutural sem afeto de base", strength: 0.95 }] }
    ],
    discriminatesWhat: ["o divórcio interno face ao parceiro sem o ruído do divórcio logístico no mundo físico"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:relacao_vinculo_formal"], askAfterDistanceMin: 2, semanticCluster: "stay_vs_leave_structure", similarityBlockers: ["bond_formal_persistence"],
    emotionalIntensity: 5, intrusivenessLevel: 4, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_VINC_02",
    prompt: "O que te impede mais de quebrar o vínculo: perder o outro parceiro ou arrebentar com a estrutura (casa, logística, status)?",
    shortLabel: "medo motor do vínculo",
    primaryDomain: "relacao_vinculo_formal",
    functionType: "discriminator",
    maskType: "perda",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "A perda da pessoa amada. Sou louco por ela.", shortLabel: "dependência afetiva base" },
      { id: "o2", label: "Estou aterrorizado com a explosão da nossa vida construída e partilha de bens/filhos.", shortLabel: "terror de dinamitar ecossistema", addsEvidence: [{ domain: "familia_lealdade_papel", signalType: "constraint", label: "receio pelo ecossistema construído", strength: 0.85 }] }
    ],
    discriminatesWhat: ["onde reside de verdade a inércia central afetiva vs instrumental"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:relacao_vinculo_formal"], askAfterDistanceMin: 2, semanticCluster: "relationship_structure_weight", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // OUTRA PESSOA
  {
    id: "Q_DIS_OUTRA_01",
    prompt: "Sentes divisão direta entre o vínculo formal e aquilo que afetivamente a outra pessoa te puxa?",
    shortLabel: "divisão binária clara",
    primaryDomain: "centro_afetivo_deslocado",
    functionType: "discriminator",
    maskType: "relacional",
    answerType: "tri_state",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Sim, são duas faixas totalmente rasgadas. Corpo num, cabeça no outro.", shortLabel: "rasgada ao meio", addsEvidence: [{ domain: "centro_afetivo_deslocado", signalType: "conflict", label: "cisão vertical semântica", strength: 0.95 }] },
      { id: "o2", label: "Não chega a tanto, é só um escape lateral à realidade dura.", shortLabel: "apenas ópio lateral" },
      { id: "o3", label: "Na verdade amo os dois sem querer abdicar de nada.", shortLabel: "amor não exclusivo conflitual", addsEvidence: [{ domain: "centro_afetivo_deslocado", signalType: "conflict", label: "relutância na exclusividade", strength: 0.8 }] }
    ],
    discriminatesWhat: ["se é um conflito vertical (substituição estrutural) ou muleta relacional transitória"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:centro_afetivo_deslocado"], askAfterDistanceMin: 2, semanticCluster: "emotional_division", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 4, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_OUTRA_02",
    prompt: "O problema central existe na tua relação original, e a nova pessoa é o isqueiro disso, ou o problema é quereres ativamente consumar essa nova vida?",
    shortLabel: "causa vs catalisador",
    primaryDomain: "centro_afetivo_deslocado",
    functionType: "discriminator",
    maskType: "escolha",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "A relação original já morreu há anos. O novo puxão só atirou lume à fogueira inerte.", shortLabel: "catalisador do funeral", addsEvidence: [{ domain: "relacao_vinculo_formal", signalType: "conflict", label: "vínculo comatoso iluminado por outsider", strength: 0.9 }] },
      { id: "o2", label: "Estava relativamente bem no núcleo base, mas fui apanhado de surpresa numa onda destrutiva imparável.", shortLabel: "interrupção violenta", addsEvidence: [{ domain: "centro_afetivo_deslocado", signalType: "pain", label: "disrupção afetiva aguda do repouso", strength: 0.85 }] }
    ],
    discriminatesWhat: ["isolamento de variáveis: é um divórcio orgânico que levou tempo, com trigger recente, ou abalo num eixo estável"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:centro_afetivo_deslocado"], askAfterDistanceMin: 2, semanticCluster: "bond_elsewhere_pull", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // FAMÍLIA
  {
    id: "Q_DIS_FAM_01",
    prompt: "Sair dessa obrigação de \"bom membro da família\" e tratar de ti pareceria na tua cabeça... uma traição gravíssima?",
    shortLabel: "autocuidado como traição",
    primaryDomain: "familia_lealdade_papel",
    functionType: "discriminator",
    maskType: "responsabilidade",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Absolutamente, como egoísmo inaceitável aos olhos deles e meus.", shortLabel: "traição e egoísmo", addsEvidence: [{ domain: "culpa_remorso_omissao", signalType: "pain", label: "traição ao ecossistema base familiar", strength: 0.9 }] },
      { id: "n", label: "Eles até me apoiavam. Eu é que não rompo.", shortLabel: "prisão internalizada", addsEvidence: [{ domain: "familia_lealdade_papel", signalType: "constraint", label: "auto-bloqueio e projeção de deveres neles não requeridos", strength: 0.85 }] }
    ],
    discriminatesWhat: ["se a lealdade é imposta por toxidade externa na tribo, ou por hiper-responsabilização neurotizada internalizada"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:familia_lealdade_papel"], askAfterDistanceMin: 2, semanticCluster: "inherited_loyalty", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_FAM_02",
    prompt: "O bloqueio face ao núcleo familiar é físico (falta de estrutura para sair ou ter independência financeira realística deles) ou é apenas culpa por desagradar?",
    shortLabel: "muro físico vs culpa tribal",
    primaryDomain: "familia_lealdade_papel",
    functionType: "discriminator",
    maskType: "margem",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Físico e financeiro. Sem eles durmo debaixo da ponte.", shortLabel: "dependência crassa externa real" },
      { id: "o2", label: "Apenas culpa e chantagem emocional brutal, consigo sair fisicamente ileso amanhã.", shortLabel: "prisão de culpa" },
      { id: "o3", label: "As duas misturadas num bolo asfixiante.", shortLabel: "físico e mental" }
    ],
    discriminatesWhat: ["vetor logístico em tensão com vetor afectivo da herança sistêmica"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:familia_lealdade_papel"], askAfterDistanceMin: 2, semanticCluster: "family_expectation_block", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // TRABALHO
  {
    id: "Q_DIS_TRAB_01",
    prompt: "Se o teu emprego atual sumisse, passavas mal pela falta do dinheiro vital ou pelo colapso de quem és?",
    shortLabel: "dinheiro vs vácuo utilitário",
    primaryDomain: "trabalho_desgaste_reconhecimento",
    functionType: "discriminator",
    maskType: "pratico",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Puramente pelo caos financeiro, eu dou zero valor identitário àquilo.", shortLabel: "apenas mercenário logístico", addsEvidence: [{ domain: "financas_margem", signalType: "pain", label: "trabalho=fonte singular de oxigénio", strength: 0.9 }] },
      { id: "o2", label: "Eu perco o meu valor no mundo, aquele título consome quem me tornei.", shortLabel: "dependência de validação ou estrutura oca de auto-engano", addsEvidence: [{ domain: "trabalho_desgaste_reconhecimento", signalType: "pain", label: "vazio identitário sem ocupação", strength: 0.85 }] }
    ],
    discriminatesWhat: ["se o vínculo laboral é refém financeiro (mercânico) ou estruturante de sentido interno vazio a derrocar"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:trabalho_desgaste_reconhecimento"], askAfterDistanceMin: 2, semanticCluster: "utility_identity_fatigue", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_TRAB_02",
    prompt: "Sentes que esgotaste a pista? Já bateste na barreira do desgaste irreparável na carreira atual onde mais nenhum passo para a frente apetece?",
    shortLabel: "fim de pista",
    primaryDomain: "trabalho_desgaste_reconhecimento",
    functionType: "discriminator",
    maskType: "futuro",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Estou num esgotamento cínico irreversível perante a área. Acabou.", shortLabel: "fim motor", addsEvidence: [{ domain: "trabalho_desgaste_reconhecimento", signalType: "pain", label: "corrosão brutal", strength: 0.95 }] },
      { id: "n", label: "Não, só odeio o sítio. Continuo com alma para a coisa em si.", shortLabel: "repulsa circunscrita ao ambiente", addsEvidence: [{ domain: "trabalho_desgaste_reconhecimento", signalType: "constraint", label: "toxidade meramente ambiental local", strength: 0.8 }] }
    ],
    discriminatesWhat: ["fuga ao ambiente laboral vs burnout integral à disciplina base"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:trabalho_desgaste_reconhecimento"], askAfterDistanceMin: 2, semanticCluster: "job_as_trap", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 2, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // VIDA ADIADA
  {
    id: "Q_DIS_FUT_01",
    prompt: "No adiamento perpétuo que descreves, o que falta mais ativar internamente em ti: coragem de queimar barcos logísticos ou claridade do que raio queres?",
    shortLabel: "desenhar coragem vs nevoeiro central",
    primaryDomain: "futuro_vida_adiada",
    functionType: "discriminator",
    maskType: "escolha",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Eu sei exatamente o que quero. Falta é arcabouço ou coragem para queimar as pontes de onde me fixei na sobrevivência.", shortLabel: "frivolidade estruturada", addsEvidence: [{ domain: "futuro_vida_adiada", signalType: "cost_of_change", label: "conhecimento do caminho ocultado por falta de margem para dor estrutural", strength: 0.8 }] },
      { id: "o2", label: "Sou dominado inteiramente pelo nevoeiro. Não tenho guião do abismo ou da glória. Não sei quem seria.", shortLabel: "dissonância de bússola clara", addsEvidence: [{ domain: "futuro_vida_adiada", signalType: "conflict", label: "névoa sem objeto de fuga nítido", strength: 0.9 }] }
    ],
    discriminatesWhat: ["claro foco refém de bloqueios práticos/medo vs névoa profunda paralítica de objectivo"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:futuro_vida_adiada"], askAfterDistanceMin: 2, semanticCluster: "courage_vs_structure", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_FUT_02",
    prompt: "Olhar para pessoas com vidas práticas idênticas à tua traz-te paz ou pavor instintivo de que já morreste um bocadinho?",
    shortLabel: "comparação com reflexo rotineiro do próprio eco",
    primaryDomain: "futuro_vida_adiada",
    functionType: "discriminator",
    maskType: "rotina",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Traz pavor. É o espelho vivo da minha fraude onde me enterrei vivo num sofá.", shortLabel: "pavor reflexo vivo", addsEvidence: [{ domain: "futuro_vida_adiada", signalType: "pain", label: "vida estagnada como horror", strength: 0.95 }] },
      { id: "o2", label: "Não me atormenta. A minha dor aqui não se compadece com as escolhas práticas banais alheias dos outros. O meu buraco é individual.", shortLabel: "buraco individual" }
    ],
    discriminatesWhat: ["presença cristalizada da rotina mortal sentida e visualizada"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:futuro_vida_adiada"], askAfterDistanceMin: 2, semanticCluster: "adult_life_suspended", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 4, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // CULPA E PRUDÊNCIA
  {
    id: "Q_DIS_CUL_01",
    prompt: "Quando traças limites ou falhas deveres não escritos num grupo base (família ou trabalho) sentes-te malvado e ingrato, a pedir mil desculpas no coração?",
    shortLabel: "complexo salvador ou omisso culpado instintivo",
    primaryDomain: "culpa_remorso_omissao",
    functionType: "discriminator",
    maskType: "responsabilidade",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Sim, odeio as repercussões e sentir que traí algo ou que sou péssima pessoa.", shortLabel: "vítima das repercussões dos seus limites paralisantes", addsEvidence: [{ domain: "culpa_remorso_omissao", signalType: "pain", label: "necessidade de aprovação", strength: 0.9 }] },
      { id: "o2", label: "Não. A minha questão não tem a mínima tração pelo agradar ou pedir licença mas pelas pontes partidas reais num formato físico, puro silêncio da minha via.", shortLabel: "impotência estritamente logística mecânica ou de ausência de trilhos tangíveis" }
    ],
    discriminatesWhat: ["presença da auto culpa como força repressiva paralisadora sobre escolhas objectivas"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:culpa_remorso_omissao"], askAfterDistanceMin: 2, semanticCluster: "omission_as_self_protection", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_CUL_02",
    prompt: "As decisões arriscadas são bloqueadas por cálculos excessivos do desastre que os outros não parecem fazer?",
    shortLabel: "antecipar o desastre exaustivamente",
    primaryDomain: "culpa_remorso_omissao",
    functionType: "discriminator",
    maskType: "futuro",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Sem dúvida, vejo o risco pior antes do momento real.", shortLabel: "sim, congelo", addsEvidence: [{ domain: "corpo_tensao_alerta", signalType: "pain", label: "overthinking paralisante estrutural e imobilizador de via", strength: 0.85 }] },
      { id: "o2", label: "Não caio nisso frequentemente, por regra não sou medricas antecipadamente.", shortLabel: "não é prudência extrema" }
    ],
    discriminatesWhat: ["se a imobilidade se ancora numa neurose de sobreatenção de ameaça de via"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(culpa_remorso_omissao)"], askAfterDistanceMin: 2, semanticCluster: "prudence_freeze", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // EXTRA/GENERIC (to make 18 total)
  {
    id: "Q_DIS_GEN_01",
    prompt: "Pensando na queixa base: tu queres revolução (partir) ou apenas reformar a tua estadia, para deixares de ser oprimido aí ou teres paz na ausência disso ser ideal?",
    shortLabel: "reformar matriz vs revolução cabal",
    primaryDomain: "autonomia_vs_pertenca",
    functionType: "discriminator",
    maskType: "escolha",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Esquece. Quero partir. Sair.", shortLabel: "via da cisão absoluta de ecossistema de pertença local." },
      { id: "o2", label: "Preferia manter tudo, ter apenas regulação interna na bolha da situação e encontrar paz de modo menos estridente noutro pormenor, sem deitar a casa abaixo real.", shortLabel: "busca reguladora de manutenção do silêncio contido" }
    ],
    discriminatesWhat: ["perceção do utilizador sobre o tamanho do abismo real que deseja saltar (fuga vs gestão contida de danos de manutenção da pertenca local)"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: [], askAfterDistanceMin: 2, semanticCluster: "autonomy_vs_belonging", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_DIS_GEN_02",
    prompt: "Quando traças o teu perfil contra as outras pessoas, tu escondes a realidade negra real ou falas demasiado disso publicamente vitimizando-te mas não avançando de igual modo?",
    shortLabel: "receptaculo privado de dor no omisso mudo vs palco repetitivo sem avanço tangível na exposição",
    primaryDomain: "vergonha_reserva_exposicao",
    functionType: "discriminator",
    maskType: "relacional",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Guardo estritamente para mim para suportar figura. Ninguém que não devesse aliás me pergunta disso e eu finjo que o telhado na verdade é bem isolado aos perigos do relampago mental.", shortLabel: "vergonha resguarda" },
      { id: "o2", label: "Queixo e refilo abundantemente exteriormente a ponto de chateá-los de volta sem os resultados que na base me permitissem nunca mais regressar de braços na testa à sua orelha de queixume de loop diário na minha repetição cínica constante passiva onde nado de olhos rasos a queimar à luz na lama do fim da autoestrada abandonada...", shortLabel: "vítima em altofalante circular estanhos." }
    ],
    discriminatesWhat: ["nível de externalização orgulhosa e auto-validação passiva da estagnação, vis a vis vergonha oculta interna isolante da inação contida impenetrável à vida base de mudança por medo visceral que o ar lhes bata na cara se fugissem do seu caixão de chumbo"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: [], askAfterDistanceMin: 3, semanticCluster: "fear_irreversible_error", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  }
];
