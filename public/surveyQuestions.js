// public/surveyQuestions.js

/**
 * FASE 2B: ARQUITETURA 10 BLOCOS - VERSÃO SÓBRIA E DENSA (24 PERGUNTAS)
 * Linguagem limpa de excessos teatrais. Foco em clareza, inteligência e reconhecimento profundo.
 * Inclui ramificação auditável baseada em "dependsOnSignals".
 */

const SURVEY_BLOCKS = {
  1: { id: "block_1", title: "Triagem Inicial" },
  2: { id: "block_2", title: "Contexto Concreto" },
  3: { id: "block_3", title: "Mecânica do Bloqueio" },
  4: { id: "block_4", title: "Custos e Danos" },
  5: { id: "block_5", title: "Significado e Símbolo" },
  6: { id: "block_6", title: "Cenário Temido" },
  7: { id: "block_7", title: "Desempate e Eixos Rivais" },
  8: { id: "block_8", title: "Vida Desejada" },
  9: { id: "block_9", title: "Prontidão para Agir" },
  10: { id: "block_10", title: "Fecho e Validação" }
};

const SURVEY_QUESTIONS = [
  // ==========================================
  // BLOCO 1: TRIAGEM INICIAL
  // ==========================================
  {
    questionId: "Q_V3_0101",
    blockId: "block_1",
    order: 1,
    prompt: "Neste momento, onde sentes que está o centro do teu bloqueio?",
    helperText: "Tenta não focar nas consequências, mas na causa que parece não ter solução evidente hoje.",
    inferentialPurpose: "Identificação da raiz declarativa do impasse.",
    targetSignals: ["meios", "apoio", "liberdade", "energia", "direcao", "vida"],
    validationRole: "Abertura de cenário",
    legacySourceIds: ["Q_TRI_01"],
    active: true,
    options: [
      { optionId: "opt_0101_meios", label: "Não tenho margem financeira ou logística para mudar o que preciso.", description: "", signalWeights: { meios: 1.0 }, signalTags: ["falta_meios", "logistica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0101_apoio", label: "Sinto-me isolado; não tenho uma rede segura que me ampare.", description: "", signalWeights: { apoio: 1.2 }, signalTags: ["falta_apoio", "relacional"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0101_liberdade", label: "Estou demasiado preso a obrigações e expectativas de outras pessoas.", description: "", signalWeights: { liberdade: 1.0 }, signalTags: ["excesso_responsabilidade", "restricao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0101_energia", label: "Esgotamento crónico. Não tenho vitalidade suficiente para iniciar uma mudança.", description: "", signalWeights: { energia: 1.0 }, signalTags: ["exaustao", "biologico"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0101_vida", label: "Falta de sentido. Uma sensação de que a vida está suspensa ou no automático.", description: "", signalWeights: { vida: 1.5, baixa_diferenciacao: 0.5 }, signalTags: ["vida_suspensa"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0102",
    blockId: "block_1",
    order: 2,
    prompt: "Se pudesses resolver instantaneamente uma destas áreas, qual escolherias?",
    helperText: "Uma escolha hipotética para testar o que valorizas primeiro como saída de emergência.",
    inferentialPurpose: "Testar o eixo de dor através do desejo de compensação.",
    targetSignals: ["meios", "liberdade", "direcao"],
    validationRole: "Valida triagem 1",
    legacySourceIds: ["Q_TRI_05"],
    active: true,
    options: [
      { optionId: "opt_0102_grana", label: "A segurança estrutural e as preocupações financeiras imediatas.", description: "", signalWeights: { meios: 1.1 }, signalTags: ["deseja_meios"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0102_obrig", label: "O peso das responsabilidades e da necessidade de justificar as minhas escolhas.", description: "", signalWeights: { liberdade: 1.5 }, signalTags: ["deseja_liberdade"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0102_direcao", label: "A sensação profunda de apatia e de não saber que direção tomar a seguir.", description: "", signalWeights: { direcao: 1.0, vida: 0.5 }, signalTags: ["deseja_sentido"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 2: CONTEXTO CONCRETO
  // ==========================================
  {
    questionId: "Q_V3_0201",
    blockId: "block_2",
    order: 3,
    prompt: "Face a este problema, sentes que ainda consegues ditar as regras do teu dia a dia, ou perdeste de certa forma o controlo das tuas próprias decisões?",
    helperText: "Avalia a tua autonomia atual.",
    inferentialPurpose: "Discriminação entre desconforto transitório e castração humilhante.",
    targetSignals: ["meios", "vida", "baixa_diferenciacao"],
    validationRole: "Teste de autonomia base",
    legacySourceIds: ["Q_DIS_FIN_02"],
    active: true,
    options: [
      { optionId: "opt_0201_hum", label: "Sinto que engulo opções por dependência aos outros ou ao ordenado.", description: "", signalWeights: { meios: 1.5, vida: -0.5 }, signalTags: ["perda_dignidade"], disambiguatesWhat: ["peso_ontologico_material"], allowsBranchingTo: [] },
      { optionId: "opt_0201_prat", label: "Apesar do sacrifício, as grandes decisões continuam a estar na minha mão.", description: "", signalWeights: { meios: 0.4 }, signalTags: ["independencia_mantida"], disambiguatesWhat: ["desconforto"], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0202",
    blockId: "block_2",
    order: 4,
    prompt: "Quando entras no espaço onde passas a maior parte do teu dia, como reage o teu corpo?",
    helperText: "Dá atenção ao estado físico autónomo, antes de qualquer racionalização.",
    inferentialPurpose: "Acesso ao reflexo neurológico primitivo (espaço familiar/laboral).",
    targetSignals: ["apoio", "liberdade", "energia"],
    validationRole: "Contexto espacial",
    legacySourceIds: ["Q_DIS_HAB_02"],
    active: true,
    options: [
      { optionId: "opt_0202_relax", label: "Descontrai de certa forma, continua a ser uma base onde posso respirar.", description: "", signalWeights: { apoio: 0.8 }, signalTags: ["amparo_espacial"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0202_tenso", label: "Fica imediatamente hipervigilante ou defensivo.", description: "", signalWeights: { liberdade: -1.0, energia: -1.0 }, signalTags: ["tensao_ambiente"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0202_cemiterio", label: "Simplesmente desliga as baterias, entrando num modo automático e opaco.", description: "", signalWeights: { baixa_diferenciacao: 1.0, vida: -1.0 }, signalTags: ["apatia_ambiente"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    // RAMIFICAÇÃO: Apenas perguntada se sinalizou "falta_meios" no B1.
    questionId: "Q_V3_0203_BRANCH",
    blockId: "block_2",
    order: 5,
    dependsOnSignals: ["falta_meios", "deseja_meios"],
    prompt: "Em relação ao teu dinheiro ou margem logística mensal, a barreira existe na ausência real de fundos ou no controlo restritivo de terceiro?",
    helperText: "Importante para separar falta funcional de privação imposta.",
    inferentialPurpose: "Apurar origem da falta de meios.",
    targetSignals: ["meios", "liberdade"],
    validationRole: "Branch Means",
    legacySourceIds: ["Q_BLK_FIN_01"],
    active: true,
    options: [
      { optionId: "opt_0203_mat", label: "Ausência real de dinheiro. Os números não chegam para pagar o necessário para mudar.", description: "", signalWeights: { meios: 1.5 }, signalTags: ["barreira_matematica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0203_rel", label: "Os bens existem, mas estou sujeito à permissão, avaliação ou controlo de alguém.", description: "", signalWeights: { liberdade: 1.5 }, signalTags: ["barreira_controlo"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    // RAMIFICAÇÃO: Apenas perguntada se sinalizou "falta_apoio" no B1.
    questionId: "Q_V3_0204_BRANCH",
    blockId: "block_2",
    order: 6,
    dependsOnSignals: ["falta_apoio", "excesso_responsabilidade"],
    prompt: "Qual sentes que é o teu principal papel atual no teu círculo próximo?",
    helperText: "Tenta definir de forma pragmática como interages nos bastidores familiares.",
    inferentialPurpose: "Apurar assimetria relacional familiar.",
    targetSignals: ["apoio"],
    validationRole: "Branch Relationship",
    legacySourceIds: ["Q_DIS_FAM_02"],
    active: true,
    options: [
      { optionId: "opt_0204_pilar", label: "Sou a fundação estrutural; os problemas recaem totalmente sobre a minha capacidade de resolver e suportar o peso.", description: "", signalWeights: { liberdade: 1.0, energia: -1.0 }, signalTags: ["pilar_excessivo"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0204_invisivel", label: "Sinto-me utilitário; considero que o que sinto ou preciso não é uma prioridade legítima em casa.", description: "", signalWeights: { apoio: 1.5, vida: -0.5 }, signalTags: ["invisibilidade_afetiva"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 3: MECÂNICA DO BLOQUEIO
  // ==========================================
  {
    questionId: "Q_V3_0301",
    blockId: "block_3",
    order: 7,
    prompt: "Quando sentes que devias mudar de vida mas não sabes como, qual costuma ser a tua primeira defesa?",
    helperText: "",
    inferentialPurpose: "Avaliação da resposta de coping (defesa do psiquismo).",
    targetSignals: ["energia", "direcao", "baixa_diferenciacao"],
    validationRole: "Gauge de inércia",
    legacySourceIds: ["Q_DIS_FAM_01"],
    active: true,
    options: [
      { optionId: "opt_0301_distratores", label: "Encho-me de trabalho e distrações para não ter tempo para pensar à noite.", description: "", signalWeights: { baixa_diferenciacao: 0.8 }, signalTags: ["coping_fuga"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0301_justifica", label: "Foco-me intensamente nos obstáculos práticos (como o dinheiro ou a família) como justificação natural de inércia.", description: "", signalWeights: { energia: -0.5 }, signalTags: ["coping_racionalizacao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0301_isolamento", label: "Simplesmente desligo. Faço apenas o mínimo obrigatório e evito gastar mais energia.", description: "", signalWeights: { energia: 1.0, vida: -0.5 }, signalTags: ["coping_apatia"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0302",
    blockId: "block_3",
    order: 8,
    prompt: "Acreditas que, secretamente, alguma parte tua encontra conforto ou segurança no facto de ainda não conseguires mudar?",
    helperText: "O conhecido, mesmo em sofrimento crónico, costuma ser preferível à mudança vertiginosa.",
    inferentialPurpose: "Avaliação do benefício secundário do bloqueio.",
    targetSignals: ["liberdade", "vida"],
    validationRole: "Benefícios ocultos",
    legacySourceIds: ["Q_BLK_03"],
    active: true,
    options: [
      { optionId: "opt_0302_conforto", label: "Sim, há um porto seguro previsível; enfrentar o desconhecido exige uma energia brutal que eu prefiro não testar agora.", description: "", signalWeights: { liberdade: -0.5, energia: -0.5 }, signalTags: ["ganho_secundario_inercia"], disambiguatesWhat: ["resistência_genuina_vs_tática"], allowsBranchingTo: [] },
      { optionId: "opt_0302_repulsa", label: "Não há o mínimo de segurança nisto, é puramente parede insuperável limpa e logística; detesto todas as partes do facto de estar parado.", description: "", signalWeights: { meios: 1.0 }, signalTags: ["parede_logistica_exclusiva"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0303",
    blockId: "block_3",
    order: 9,
    prompt: "Olhando para os teus impasses do último ano, o que tem impedido que dês passos estruturais em frente?",
    helperText: "",
    inferentialPurpose: "Entender locus externo da autoridade percepcionada.",
    targetSignals: ["liberdade", "apoio", "energia"],
    validationRole: "Autoridade percepcionada",
    legacySourceIds: ["Q_BLK_02"],
    active: true,
    options: [
      { optionId: "opt_0303_outro", label: "O medo contínuo de desiludir os que estão mais próximos.", description: "", signalWeights: { liberdade: 1.2, apoio: 0.5 }, signalTags: ["locus_relacional"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0303_logistica", label: "A mecânica fria das contas e da incerteza logística que não permite o abanão.", description: "", signalWeights: { meios: 1.2 }, signalTags: ["locus_meios"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0303_medo", label: "O meu próprio calculismo defensivo face ao risco provável de as coisas darem errado.", description: "", signalWeights: { direcao: 1.0 }, signalTags: ["locus_interno_medo"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0303_nenhum", label: "Na verdade, costumo travar-me sozinho antes sequer de ter um motivo concreto.", description: "", signalWeights: { energia: 1.0, baixa_diferenciacao: 0.5 }, signalTags: ["locus_interno_inercia"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 4: CUSTOS E DANOS
  // ==========================================
  {
    questionId: "Q_V3_0401",
    blockId: "block_4",
    order: 10,
    prompt: "Qual área está invisivelmente a pagar o preço diário deste teu compasso de espera?",
    helperText: "A inércia debita fatura numa dimensão específica; escolhe a que sangra mais no silêncio.",
    inferentialPurpose: "Evidência somática e relacional dos danos acumulados.",
    targetSignals: ["vida", "direcao", "energia", "apoio"],
    validationRole: "Custo irreversível prático",
    legacySourceIds: ["Q_COS_01"],
    active: true,
    options: [
      { optionId: "opt_0401_identidade", label: "O distanciamento de mim mesmo: não me reconheço na apatia com que deixo os dias escorrerem.", description: "", signalWeights: { vida: 1.5, baixa_diferenciacao: 0.8 }, signalTags: ["perda_identidade"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0401_corpo", label: "O corpo: a fadiga está cronificada, a ansiedade estruturou-se na minha postura e o sono já não repara.", description: "", signalWeights: { energia: 1.5, meios: 0.5 }, signalTags: ["perda_somatica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0401_relacional", label: "A paciência e o afeto: acumulo um cinismo latente com todos, diminuindo a empatia verdadeira pelas pessoas que me rodeiam.", description: "", signalWeights: { apoio: -1.0, liberdade: 0.5 }, signalTags: ["perda_afetiva"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0402",
    blockId: "block_4",
    order: 11,
    prompt: "Se o cenário em que passaste a semana se mantiver intocável por mais três ou cinco anos, o teu maior receio é acabar:",
    helperText: "Identifica a consequência a longo prazo",
    inferentialPurpose: "Testar receio ontológico.",
    targetSignals: ["vida", "direcao", "energia"],
    validationRole: "Validação do abismo",
    legacySourceIds: ["Q_COS_02"],
    active: true,
    options: [
      { optionId: "opt_0402_funcional", label: "Assegurado funcionalmente, mas totalmente ausente e esvaziado de curiosidade pela vida.", description: "", signalWeights: { vida: 1.5, direcao: 1.0 }, signalTags: ["futuro_zombie"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0402_falho", label: "Na fase final das minhas janelas de oportunidade produtivas, lamentando acriticamente a estrutura de dependência em que decidi morar.", description: "", signalWeights: { meios: 0.8, liberdade: 1.0 }, signalTags: ["futuro_dependente"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  {
    questionId: "Q_V3_0403",
    blockId: "block_4",
    order: 12,
    prompt: "Se avançasses amanhã para a decisão mais difícil que imaginas, qual seria o teu maior receio no dia seguinte?",
    helperText: "",
    inferentialPurpose: "Evidência da erosão da margem psicológica de manobra.",
    targetSignals: ["energia", "apoio"],
    validationRole: "Validação somática 2",
    legacySourceIds: ["Q_COS_03"],
    active: true,
    options: [
      { optionId: "opt_0403_impaciente", label: "Arrepender-me num ápice por as coisas se desorganizarem materialmente.", description: "", signalWeights: { meios: 1.0, liberdade: -1.0 }, signalTags: ["medo_desestruturacao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0403_dissociado", label: "Acabar a magoar as pessoas próximas que nunca iriam perceber a minha decisão.", description: "", signalWeights: { apoio: 1.0 }, signalTags: ["medo_culpabilizacao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0403_exaustao", label: "Esgotar a pouca energia que já tenho e acabar numa situação pior do que estou agora.", description: "", signalWeights: { energia: 1.5, baixa_diferenciacao: 0.5 }, signalTags: ["medo_fundo_tacho"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 5: SIGNIFICADO E SÍMBOLO
  // ==========================================
  {
    questionId: "Q_V3_0501",
    blockId: "block_5",
    order: 12,
    prompt: "Quando pensas neste problema a longo prazo, qual é a sensação de fundo que prevalece?",
    helperText: "",
    inferentialPurpose: "Associação latente psicanalítica das dores da base.",
    targetSignals: ["baixa_diferenciacao"],
    validationRole: "Symbolic bridge",
    legacySourceIds: ["Q_VAL_FIN_01"],
    active: true,
    options: [
      { optionId: "opt_0501_correntes", label: "O sentimento de sufoco; estar preso num trajeto demasiadamente desenhado ou pautado pelos outros.", description: "", signalWeights: { liberdade: 1.5 }, signalTags: ["simbologia_sufoco"], disambiguatesWhat: ["liberdade vs. meios"], allowsBranchingTo: [] },
      { optionId: "opt_0501_abismo", label: "A falta de direção e de entusiasmo generalizado.", description: "", signalWeights: { direcao: 1.5, vida: -0.5 }, signalTags: ["simbologia_extravio"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0501_tenda", label: "Sinto-me apenas cronicamente só. Sem cobertura emocional séria de segurança e com todo o peso às costas.", description: "", signalWeights: { apoio: 1.5 }, signalTags: ["simbologia_orfandade"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0501_confuso", label: "Há uma mistura disto tudo e não consigo distinguir bem.", description: "", signalWeights: { baixa_diferenciacao: 1.0 }, signalTags: ["simbologia_mista"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0502",
    blockId: "block_5",
    order: 13,
    prompt: "A manutenção passiva deste conflito diário ataca principalmente a tua convicção sobre o teu próprio valor, a tua sorte, ou a perspetiva de capacidade de esforço?",
    helperText: "Verificamos como o problema tem moldado a tua auto-avaliação psíquica.",
    inferentialPurpose: "Mapeamento subcortical.",
    targetSignals: ["liberdade", "vida"],
    validationRole: "Symbolic evaluation",
    legacySourceIds: ["Q_DIS_GEN_01"],
    active: true,
    options: [
      { optionId: "opt_0502_valor", label: "Sinto que, se tolero isto tanto tempo, no fundo interiorizei que não tenho força interior para exigir nada superior a esta norma.", description: "", signalWeights: { vida: 1.0, liberdade: 1.0 }, signalTags: ["auto_desvalorizacao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0502_esquecimento", label: "Sinto um cinismo cravado contra a própria ideia de 'mérito'. Acredito cada vez menos na arquitetura de promessas onde outrora quis investir.", description: "", signalWeights: { apoio: -1.0, energia: 0.5 }, signalTags: ["ressentimento_geral"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  {
    questionId: "Q_V3_0503",
    blockId: "block_5",
    order: 15,
    prompt: "Quando visualizas mentalmente a linha temporal do teu futuro a partir das amarras do problema atual, o quadro é um muro cego, um espelho circular ou uma neblina infinita?",
    helperText: "Configuração subconsciente da perceção do tempo.",
    inferentialPurpose: "Interpretação do bloqueio futuro (Fechado vs Desorientado).",
    targetSignals: ["direcao", "liberdade"],
    validationRole: "Time perception symbol",
    legacySourceIds: ["Q_BLK_11"],
    active: true,
    options: [
      { optionId: "opt_0503_muro", label: "Muro de cimento fechado. O espaço futuro está rígido, definido por impossibilidades práticas incontornáveis.", description: "", signalWeights: { meios: 1.0, liberdade: 1.0 }, signalTags: ["simbologia_muro_logistico"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0503_nevoa", label: "Neblina circular sem fim. Trata-se de uma desorientação estrutural onde faltam os pontos de ancoragem lógicos para decidir o próximo passo.", description: "", signalWeights: { baixa_diferenciacao: 1.0, direcao: 1.0 }, signalTags: ["simbologia_neblina_direccional"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0503_descarte", label: "Prateleira num quarto escuro. Sinto um receio fundo latente de vir simplesmente a perder o lugar de relevância ou ser lentamente descartado pelos outros.", description: "", signalWeights: { vida: 1.5, apoio: 1.5 }, signalTags: ["simbologia_descartabilidade", "medo_perder_lugar"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 6: CENÁRIO TEMIDO
  // ==========================================
  {
    questionId: "Q_V3_0601",
    blockId: "block_6",
    order: 14,
    prompt: "Se avançasses a fundo na resolução definitiva disto hoje, a catástrofe que imediatamente antecipas é dominada por que consequência?",
    helperText: "O que diz o advogado de defesa do medo?",
    inferentialPurpose: "Identificar eixo limitativo na hora da tomada de risco.",
    targetSignals: ["liberdade", "direcao"],
    validationRole: "Stress testing medo",
    legacySourceIds: ["Q_COC_01"],
    active: true,
    options: [
      { optionId: "opt_0601_culpa", label: "O peso de falhar o compromisso com quem dependia de mim, e ter de conviver diariamente com essa culpa na forma como os outros me vão olhar.", description: "", signalWeights: { liberdade: 1.5, apoio: 0.5 }, signalTags: ["culpa_social", "traicao"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0601_falha", label: "A possibilidade real de fracassar logisticamente e acabar desamparado numa dependência funcional pior do que a inicial.", description: "", signalWeights: { meios: 1.5, energia: -0.5 }, signalTags: ["ruina_logistica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0601_substituicao", label: "No fundo, o medo de ser eventualmente trocado, substituído de forma indiferente ou de vir a perder de vez a base relacional com o meu parceiro.", description: "", signalWeights: { apoio: 2.0, vida: 1.0 }, signalTags: ["temor_substituicao", "medo_perder_parceiro"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0601_solidão", label: "Errar a avaliação do meu suporte social e constatar que poderei ficar absolutamente só após atuar.", description: "", signalWeights: { apoio: 1.5 }, signalTags: ["temor_abandono"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0602",
    blockId: "block_6",
    order: 15,
    prompt: "Neste balanço diário, o que te assombra estruturalmente mais?",
    helperText: "Medo crónico do isolamento vs esgotamento pragmático.",
    inferentialPurpose: "Verificar a dominância do cansaço.",
    targetSignals: ["direcao", "energia"],
    validationRole: "Choice constraint",
    legacySourceIds: ["Q_BLK_08"],
    active: true,
    options: [
      { optionId: "opt_0602_esgotar", label: "A progressão cega para a exaustão física total onde depois já não existam recursos do esqueleto orgânico para manter a linha e nada resista.", description: "", signalWeights: { energia: 1.5 }, signalTags: ["medo_exaustao_extrema"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0602_errar", label: "O risco instável severo do fracasso exterior e de entrar num processo longo de colapso irreversível caso solte as defesas atuais.", description: "", signalWeights: { meios: 1.0, liberdade: 1.0 }, signalTags: ["medo_colapso_imprevisivel"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 7: DESEMPATE E EIXOS RIVAIS
  // ==========================================
  {
    questionId: "Q_V3_0701",
    blockId: "block_7",
    order: 16,
    prompt: "Se tivesses de optar cirurgicamente entre o sacrifício de uma ou outra segurança, qual caminho escolherias?",
    helperText: "Confronto analítico direto: Onde cedes mais depressa?",
    inferentialPurpose: "Testar Tolerância a risco vital (Vida vs Segurança).",
    targetSignals: ["vida", "energia", "meios"],
    validationRole: "Rival Hypothesis Testing",
    legacySourceIds: ["Q_DIS_GEN_02"],
    active: true,
    options: [
      { optionId: "opt_0701_vida", label: "Tolerar forte risco logístico em desvantagem, se isso me entregar autonomia vital profunda e me forçar a agir sem redes artificiais de amortecimento.", description: "", signalWeights: { vida: 2.0, meios: -1.0 }, signalTags: ["prioriza_vitalidade"], disambiguatesWhat: ["vida vs meios"], allowsBranchingTo: [] },
      { optionId: "opt_0701_paz", label: "Manter o sacrifício da curiosidade vital e de algumas liberdades, garantindo assim que a estabilidade base funcional minha e dos diretos nunca é estilhaçada.", description: "", signalWeights: { energia: 1.0, vida: -2.0 }, signalTags: ["prioriza_contencao_passiva"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0702",
    blockId: "block_7",
    order: 17,
    prompt: "Acreditas que, com mais de meio percurso feito, a serenidade funcional que deténs já é suficiente face ao vazio desnecessário e fútil de estar sempre a mudar de direção?",
    helperText: "Procura distinguir a paz amadurecida do cinismo derrotista.",
    inferentialPurpose: "Desempatar inércia de aceitação saudável vs apatia depressiva.",
    targetSignals: ["direcao", "energia", "apoio"],
    validationRole: "Teste de Conformato",
    legacySourceIds: ["Q_BLK_10"],
    active: true,
    options: [
      { optionId: "opt_0702_amadurecido", label: "Sim, é uma leitura pacífica e aceite sem amargura. Geri as minhas perdas de forma adulta e priorizei uma tranquilidade constante estruturante e sustentável.", description: "", signalWeights: { energia: 0.5, direcao: 1.0 }, signalTags: ["resignacao_pacifica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0702_cinico", label: "Sinceramente, não é paz; é apenas um hábito instalacionista cínico para me esquivar às falhas e fingir que já não espero mais nada das perspetivas estruturais originais.", description: "", signalWeights: { vida: 1.5, baixa_diferenciacao: 1.0 }, signalTags: ["resignacao_cinica"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 8: VIDA DESEJADA
  // ==========================================
  {
    questionId: "Q_V3_0801",
    blockId: "block_8",
    order: 18,
    prompt: "Se, num cenário perfeito, conseguisses curar os estragos atuais, a tua maior vontade acabava por ser:",
    helperText: "",
    inferentialPurpose: "Alinhamento construtivo positivo - eixo redentor.",
    targetSignals: ["vida", "direcao", "liberdade"],
    validationRole: "Projeção construtiva",
    legacySourceIds: ["Q_COS_02"],
    active: true,
    options: [
      { optionId: "opt_0801_auto", label: "Resgatar a plena soberania sobre as minhas escolhas diárias.", description: "", signalWeights: { liberdade: 1.0 }, signalTags: ["ambicao_soberania"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0801_amor", label: "Ser capaz de confiar numa relação que me apoiasse sem que eu tivesse de aguentar o pilar.", description: "", signalWeights: { apoio: 1.0 }, signalTags: ["ambicao_vinculo"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0801_paz", label: "Simplesmente parar. Abrandar radicalmente e curar o cansaço do meu corpo.", description: "", signalWeights: { energia: 1.5 }, signalTags: ["ambicao_quietude"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  {
    questionId: "Q_V3_0802",
    blockId: "block_8",
    order: 22,
    prompt: "No instante imaginário após toda esta logística se desenlear perfeitamente a teu favor, a primeira reação genuína do teu corpo seria:",
    helperText: "Diz-nos como o corpo assimila a resolução tática.",
    inferentialPurpose: "Identificar privação primária do sistema.",
    targetSignals: ["energia", "liberdade"],
    validationRole: "Projeção imediata de relax",
    legacySourceIds: ["Q_COS_04"],
    active: true,
    options: [
      { optionId: "opt_0802_sono", label: "Dormir profundamente e parar totalmente as operações numa desconexão curativa de exigências externas.", description: "", signalWeights: { energia: 2.0 }, signalTags: ["ambicao_recuperacao_sono"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0802_acao", label: "Avançar imediatamente para reconstruir a minha rotina e exercer finalmente controlo limpo sobre o meu espaço e tempo.", description: "", signalWeights: { vida: 1.5, liberdade: 1.0 }, signalTags: ["ambicao_criativa_vital"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 9: PRONTIDÃO PARA AGIR
  // ==========================================
  {
    questionId: "Q_V3_0901",
    blockId: "block_9",
    order: 19,
    prompt: "Como avalias objetivamente os teus recursos para enfrentar incerteza significativa hoje?",
    helperText: "Sinceridade analítica da disposição atual a gerar energia própria no pó.",
    inferentialPurpose: "Determinar tração e estamina base.",
    targetSignals: ["baixa_diferenciacao"],
    validationRole: "Readiness Assessment",
    legacySourceIds: ["N/A"],
    active: true,
    options: [
      { optionId: "opt_0901_bruto", label: "Estou desgastado, mas disposto a atravessar esse desconforto prático limpo se o modelo no fim for robustamente recompensador na liberdade base do que restará a longo prazo.", description: "", signalWeights: { energia: 1.0 }, signalTags: ["pronto_dor_curativa"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0901_suave", label: "Tenciono ser honesto, não possuo hoje energia tampão excedentária fisiológica de suporte suficiente para aterrarem crises novas estruturais na minha base sem quebrar de vez...", description: "", signalWeights: { baixa_diferenciacao: 1.5, energia: -1.0 }, signalTags: ["sem_estamina_risco"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },
  {
    questionId: "Q_V3_0902",
    blockId: "block_9",
    order: 20,
    prompt: "Qual exigência tens quanto à clareza do relatório subjacente gerado a seguir?",
    helperText: "Define o nível de conforto ou crueza narrativa desejado no resultado. Só para calibrar o tom.",
    inferentialPurpose: "Avaliação do Modo de Intervenção preferencial.",
    targetSignals: ["liberdade"],
    validationRole: "Tone Setup",
    legacySourceIds: ["N/A"],
    active: true,
    options: [
      { optionId: "opt_0902_corte", label: "Quero uma avaliação clínica fria e direta, capaz de expor contradições das armadilhas habituais que uso como desculpa logóstica na inércia tática.", description: "", signalWeights: { liberdade: 1.0 }, signalTags: ["pede_diagnostico_frio"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_0902_moderado", label: "Procuro sínteses seguras de entendimento sólido sereno, necessito que a validação ressalve o peso óbvio das desvantagens e o meu direito focado à contenção amadurecida dos tempos.", description: "", signalWeights: { energia: 0.5 }, signalTags: ["pede_perspectiva_moderada"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  },

  // ==========================================
  // BLOCO 10: FECHO
  // ==========================================
  {
    questionId: "Q_V3_1001",
    blockId: "block_10",
    order: 21,
    prompt: "Validando tudo o que preencheste, qual identificas ser objetiva e imperdoavelmente o elemento chave do compasso atual de espera final?",
    helperText: "Conclusão e fixação formal.",
    inferentialPurpose: "Sinal Forte de Finalização",
    targetSignals: ["logistica", "afeto", "vitalidade"],
    validationRole: "Closing anchor",
    legacySourceIds: ["Q_VAL_FIN_02"],
    active: true,
    options: [
      { optionId: "opt_1001_log", label: "A arquitetura limitativa e dependência material pragmática dos pressupostos logísticos imediatos reais inadiáveis e utilitários limitantes.", description: "", signalWeights: { meios: 1.0 }, signalTags: ["conclui_logistica"], disambiguatesWhat: [], allowsBranchingTo: [] },
      { optionId: "opt_1001_emo", label: "Falta absoluta de força relacional ou clareza interna de propósitos; uma desvitalização profunda que já deixou de justificar as movimentações dos cenários possíveis passivos logísticos irreais.", description: "", signalWeights: { liberdade: 1.0, vida: 1.0 }, signalTags: ["conclui_subjetivo"], disambiguatesWhat: [], allowsBranchingTo: [] }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { SURVEY_BLOCKS, SURVEY_QUESTIONS };
}
