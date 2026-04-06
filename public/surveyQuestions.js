// public/surveyQuestions.js
const SURVEY_BLOCKS = {
  1: { id: "block_1", title: "Orientação Inicial do Aperto" },
  2: { id: "block_2", title: "Aprofundamento do Aperto" },
  3: { id: "block_3", title: "Priorização do Núcleo" },
  4: { id: "block_4", title: "Símbolos Concretos e Leitura Existencial" }
};

const SURVEY_QUESTIONS = [
  // ============================================
  // BLOCO 1
  // ============================================
  {
    id: "b1_q1", blockId: "block_1", maxSelections: 3,
    text: "Quando pensas no que te está a travar, sentes mais:",
    options: [
      { id: "opt_meios", text: "falta de meios" },
      { id: "opt_apoio", text: "falta de apoio, ligação ou estrutura afetiva" },
      { id: "opt_liberdade", text: "falta de liberdade" },
      { id: "opt_energia", text: "falta de energia" },
      { id: "opt_direcao", text: "falta de direção" },
      { id: "opt_vida", text: "falta de vida" },
      { id: "opt_nevoa", text: "não consigo identificar bem" }
    ]
  },
  {
    id: "b1_q2", blockId: "block_1", maxSelections: 3,
    text: "Neste momento, o que te pesa mais por dentro ou por fora?",
    options: [
      { id: "opt_meios_peso", text: "não ter margem material suficiente" },
      { id: "opt_apoio_peso", text: "sentir pouco apoio ou pouca base emocional" },
      { id: "opt_liberdade_peso", text: "viver demasiado condicionado/a" },
      { id: "opt_energia_peso", text: "andar cansado/a ou drenado/a" },
      { id: "opt_direcao_peso", text: "não ver um rumo claro" },
      { id: "opt_vida_peso", text: "sentir a vida sem brilho, intensidade ou presença" },
      { id: "opt_nevoa_peso", text: "continua tudo demasiado misturado" }
    ]
  },
  {
    id: "b1_q3", blockId: "block_1", maxSelections: 3,
    text: "Se hoje quisesses mudar a tua vida, o que te dificultaria mais dar passos reais?",
    options: [
      { id: "opt_meios_dif", text: "não ter recursos suficientes" },
      { id: "opt_apoio_dif", text: "não ter retaguarda afetiva ou estabilidade relacional" },
      { id: "opt_liberdade_dif", text: "estar preso/a a demasiadas limitações" },
      { id: "opt_energia_dif", text: "não ter força mental ou física para puxar por mim" },
      { id: "opt_direcao_dif", text: "não saber para onde ir" },
      { id: "opt_vida_dif", text: "sentir que me falta impulso vivo para querer mesmo mexer" },
      { id: "opt_nevoa_dif", text: "nem sei bem por onde começaria" }
    ]
  },
  {
    id: "b1_q4", blockId: "block_1", maxSelections: 3,
    text: "O que sentes mais em falta para te sentires realmente em movimento?",
    options: [
      { id: "opt_meios_falta", text: "meios" },
      { id: "opt_apoio_falta", text: "apoio" },
      { id: "opt_liberdade_falta", text: "liberdade" },
      { id: "opt_energia_falta", text: "energia" },
      { id: "opt_direcao_falta", text: "direção" },
      { id: "opt_vida_falta", text: "vida" },
      { id: "opt_nevoa_falta", text: "clareza" }
    ]
  },
  {
    id: "b1_q5", blockId: "block_1", maxSelections: 3,
    text: "Olhando para o conjunto, o que sentes estar mais no centro disto tudo neste momento?",
    options: [
      { id: "opt_meios_centro", text: "meios" },
      { id: "opt_apoio_centro", text: "apoio / estrutura afetiva" },
      { id: "opt_liberdade_centro", text: "liberdade" },
      { id: "opt_energia_centro", text: "energia" },
      { id: "opt_direcao_centro", text: "direção" },
      { id: "opt_vida_centro", text: "vida" },
      { id: "opt_nevoa_centro", text: "ainda está demasiado misturado para eu reduzir a uma coisa só" }
    ]
  },
  {
    id: "b1_q6", blockId: "block_1", maxSelections: 3,
    text: "Qual destas hipóteses te parece mais verdadeira?",
    options: [
      { id: "opt_meios_causa", text: "o meu problema principal é material: o resto agrava-se a partir daí" },
      { id: "opt_apoio_causa", text: "o meu problema principal é afetivo ou relacional: o resto vem atrás" },
      { id: "opt_liberdade_causa", text: "o meu problema principal é falta de liberdade ou excesso de condicionamento" },
      { id: "opt_energia_causa", text: "o meu problema principal é desgaste: estou sem energia para mudar" },
      { id: "opt_direcao_causa", text: "o meu problema principal é não saber para onde ir" },
      { id: "opt_vida_causa", text: "o meu problema principal é sentir a vida apagada, adiada ou sem chama" },
      { id: "opt_nevoa_causa", text: "ainda não consigo perceber o que é causa e o que é consequência" }
    ]
  },

  // ============================================
  // BLOCO 2
  // ============================================
  {
    id: "b2_q1", blockId: "block_2", maxSelections: 2,
    text: "Quando sentes que não tens margem para mexer na tua vida, o que pesa mais?",
    options: [
      { id: "b2_opt1_1", text: "não ter dinheiro suficiente para decidir ou avançar" },
      { id: "b2_opt1_2", text: "depender demasiado das circunstâncias para conseguir mexer-me" },
      { id: "b2_opt1_3", text: "sentir que qualquer passo tem custo ou risco excessivo" },
      { id: "b2_opt1_4", text: "ter pouca folga para errar, experimentar ou recomeçar" },
      { id: "b2_opt1_5", text: "sentir que a minha vida está demasiado condicionada por limites práticos" },
      { id: "b2_opt1_6", text: "não sei se é mesmo margem material ou outra coisa por baixo" }
    ]
  },
  {
    id: "b2_q2", blockId: "block_2", maxSelections: 2,
    text: "Se te falta base afetiva ou sustentação, isso aparece mais como:",
    options: [
      { id: "b2_opt2_1", text: "sentir-me só com o que carrego" },
      { id: "b2_opt2_2", text: "não ter com quem contar de forma estável" },
      { id: "b2_opt2_3", text: "estar rodeado/a e, mesmo assim, não me sentir acompanhado/a" },
      { id: "b2_opt2_4", text: "sentir falta de proximidade, pertença ou calor humano" },
      { id: "b2_opt2_5", text: "sentir que tenho de aguentar tudo por mim" },
      { id: "b2_opt2_6", text: "não sei se me falta apoio ou se me fechei demasiado" }
    ]
  },
  {
    id: "b2_q3", blockId: "block_2", maxSelections: 2,
    text: "Quando pensas em falta de liberdade, isso tem mais a ver com:",
    options: [
      { id: "b2_opt3_1", text: "depender demasiado de pessoas, contextos ou circunstâncias" },
      { id: "b2_opt3_2", text: "ter responsabilidades que me apertam demasiado" },
      { id: "b2_opt3_3", text: "viver numa vida que não consigo moldar à minha maneira" },
      { id: "b2_opt3_4", text: "sentir que não posso escolher como queria" },
      { id: "b2_opt3_5", text: "estar preso/a a compromissos, hábitos ou estruturas que já me pesam" },
      { id: "b2_opt3_6", text: "não sei se é falta de liberdade ou medo de assumir o que quero" }
    ]
  },
  {
    id: "b2_q4", blockId: "block_2", maxSelections: 2,
    text: "Se o problema for energia, o que reconheces mais em ti?",
    options: [
      { id: "b2_opt4_1", text: "cansaço físico ou mental acumulado" },
      { id: "b2_opt4_2", text: "desgaste prolongado que me tira força para mexer na vida" },
      { id: "b2_opt4_3", text: "dificuldade em começar coisas, mesmo quando quero" },
      { id: "b2_opt4_4", text: "sensação de saturação ou esgotamento interior" },
      { id: "b2_opt4_5", text: "pouca força para sustentar mudanças com continuidade" },
      { id: "b2_opt4_6", text: "não sei se me falta energia ou se me falta motivação real" }
    ]
  },
  {
    id: "b2_q5", blockId: "block_2", maxSelections: 2,
    text: "Se o problema for direção, isso sente-se mais como:",
    options: [
      { id: "b2_opt5_1", text: "não saber qual devia ser o próximo passo" },
      { id: "b2_opt5_2", text: "ver demasiadas hipóteses e não conseguir escolher" },
      { id: "b2_opt5_3", text: "sentir que já não acredito muito em nenhum rumo" },
      { id: "b2_opt5_4", text: "não conseguir transformar vontade em caminho claro" },
      { id: "b2_opt5_5", text: "sentir-me perdido/a entre dever, medo e desejo" },
      { id: "b2_opt5_6", text: "não sei se me falta direção ou coragem para assumir uma direção" }
    ]
  },
  {
    id: "b2_q6", blockId: "block_2", maxSelections: 2,
    text: "Se sentes falta de vida, isso aparece mais como:",
    options: [
      { id: "b2_opt6_1", text: "rotina sem brilho nem presença" },
      { id: "b2_opt6_2", text: "sensação de estar a viver abaixo do que sou ou quero" },
      { id: "b2_opt6_3", text: "falta de entusiasmo, magnetismo ou impulso vivo" },
      { id: "b2_opt6_4", text: "sentir a vida demasiado funcional e pouco sentida" },
      { id: "b2_opt6_5", text: "sensação de vida adiada, apagada ou sem chama" },
      { id: "b2_opt6_6", text: "não sei se me falta vida ou se estou demasiado cansado/a para a sentir" }
    ]
  },
  {
    id: "b2_q7", blockId: "block_2", maxSelections: 2,
    text: "No concreto, o que sentes estar mais sacrificado neste momento?",
    options: [
      { id: "b2_opt7_1", text: "capacidade de decidir com margem" },
      { id: "b2_opt7_2", text: "sensação de pertença ou apoio" },
      { id: "b2_opt7_3", text: "autonomia para viver à minha maneira" },
      { id: "b2_opt7_4", text: "energia para mudar e sustentar mudança" },
      { id: "b2_opt7_5", text: "clareza sobre o rumo" },
      { id: "b2_opt7_6", text: "vitalidade, presença ou vontade de viver mais plenamente" },
      { id: "b2_opt7_7", text: "continua tudo muito misturado" }
    ]
  },
  {
    id: "b2_q8", blockId: "block_2", maxSelections: 2,
    text: "Qual é o custo menos visível disto tudo em ti?",
    options: [
      { id: "b2_opt8_1", text: "andar sempre em contenção ou vigilância" },
      { id: "b2_opt8_2", text: "sentir-me mais sozinho/a do que mostro" },
      { id: "b2_opt8_3", text: "sentir-me diminuído/a ou sem espaço real" },
      { id: "b2_opt8_4", text: "viver cansado/a antes mesmo de começar" },
      { id: "b2_opt8_5", text: "andar às voltas sem conseguir assentar num caminho" },
      { id: "b2_opt8_6", text: "sentir que a vida vai passando sem me apanhar inteiro/a" },
      { id: "b2_opt8_7", text: "não consigo ainda nomear bem esse custo" }
    ]
  },

  // ============================================
  // BLOCO 3 (Só 1 escolha permitida)
  // ============================================
  {
    id: "b3_q1", blockId: "block_3", maxSelections: 1,
    text: "Se tivesses de apontar o centro mais forte do que te está a bloquear neste momento, qual seria?",
    options: [
      { id: "b3_opt1_1", text: "falta de meios" },
      { id: "b3_opt1_2", text: "falta de apoio ou base afetiva" },
      { id: "b3_opt1_3", text: "falta de liberdade" },
      { id: "b3_opt1_4", text: "falta de energia" },
      { id: "b3_opt1_5", text: "falta de direção" },
      { id: "b3_opt1_6", text: "falta de vida" },
      { id: "b3_opt1_7", text: "continua demasiado misturado para eu reduzir a uma coisa só" }
    ]
  },
  {
    id: "b3_q2", blockId: "block_3", maxSelections: 1,
    text: "Se esta semana pudesses resolver só uma dimensão e sentir logo diferença real, qual seria?",
    options: [
      { id: "b3_opt2_1", text: "ganhar margem material" },
      { id: "b3_opt2_2", text: "sentir mais apoio, ligação ou retaguarda" },
      { id: "b3_opt2_3", text: "recuperar liberdade de decisão e movimento" },
      { id: "b3_opt2_4", text: "recuperar energia para agir" },
      { id: "b3_opt2_5", text: "ganhar clareza sobre o rumo" },
      { id: "b3_opt2_6", text: "voltar a sentir mais vida, presença ou chama" },
      { id: "b3_opt2_7", text: "não sei qual destravaria mais" }
    ]
  },
  {
    id: "b3_q3", blockId: "block_3", maxSelections: 1,
    text: "O que te parece mais causa do que consequência?",
    options: [
      { id: "b3_opt3_1", text: "a falta de meios está a contaminar o resto" },
      { id: "b3_opt3_2", text: "a falta de apoio ou sustentação está a contaminar o resto" },
      { id: "b3_opt3_3", text: "o excesso de condicionamento está a contaminar o resto" },
      { id: "b3_opt3_4", text: "o desgaste está a contaminar o resto" },
      { id: "b3_opt3_5", text: "a falta de direção está a contaminar o resto" },
      { id: "b3_opt3_6", text: "a perda de vitalidade está a contaminar o resto" },
      { id: "b3_opt3_7", text: "não consigo ainda distinguir bem causa de consequência" }
    ]
  },
  {
    id: "b3_q4", blockId: "block_3", maxSelections: 1,
    text: "Qual destas sentes mais como resultado de outras coisas, e não como origem?",
    options: [
      { id: "b3_opt4_1", text: "falta de meios" },
      { id: "b3_opt4_2", text: "falta de apoio ou estrutura afetiva" },
      { id: "b3_opt4_3", text: "falta de liberdade" },
      { id: "b3_opt4_4", text: "falta de energia" },
      { id: "b3_opt4_5", text: "falta de direção" },
      { id: "b3_opt4_6", text: "falta de vida" },
      { id: "b3_opt4_7", text: "não sei distinguir" }
    ]
  },
  {
    id: "b3_q5", blockId: "block_3", maxSelections: 1,
    text: "O que te dói mais no concreto da tua vida atual?",
    options: [
      { id: "b3_opt5_1", text: "não conseguir mexer-me por falta de margem" },
      { id: "b3_opt5_2", text: "não me sentir suficientemente acompanhado/a ou sustentado/a" },
      { id: "b3_opt5_3", text: "viver demasiado condicionado/a ou apertado/a" },
      { id: "b3_opt5_4", text: "sentir-me cansado/a demais para mudar" },
      { id: "b3_opt5_5", text: "não conseguir ver um caminho convincente" },
      { id: "b3_opt5_6", text: "sentir que a vida me passa ao lado ou me apanha a meio" },
      { id: "b3_opt5_7", text: "é a combinação disto tudo que mais me dói" }
    ]
  },
  {
    id: "b3_q6", blockId: "block_3", maxSelections: 1,
    text: "O que sentes que estás mais a perder enquanto isto se mantém?",
    options: [
      { id: "b3_opt6_1", text: "oportunidades práticas" },
      { id: "b3_opt6_2", text: "sensação de vínculo, apoio ou pertença" },
      { id: "b3_opt6_3", text: "autonomia para viver à minha maneira" },
      { id: "b3_opt6_4", text: "força e capacidade de ação" },
      { id: "b3_opt6_5", text: "tempo e orientação" },
      { id: "b3_opt6_6", text: "intensidade, presença ou vida" },
      { id: "b3_opt6_7", text: "ainda não sei dizer" }
    ]
  },
  {
    id: "b3_q7", blockId: "block_3", maxSelections: 1,
    text: "Se nada mudar nos próximos tempos, o que mais temes que se agrave?",
    options: [
      { id: "b3_opt7_1", text: "continuar sem base material suficiente" },
      { id: "b3_opt7_2", text: "sentir-me ainda mais só ou sem retaguarda" },
      { id: "b3_opt7_3", text: "ficar ainda mais preso/a a uma vida pouco moldável" },
      { id: "b3_opt7_4", text: "entrar num desgaste mais fundo" },
      { id: "b3_opt7_5", text: "perder ainda mais clareza sobre o rumo" },
      { id: "b3_opt7_6", text: "habituar-me a viver com pouca vida dentro" },
      { id: "b3_opt7_7", text: "nem sei qual destes me assusta mais" }
    ]
  },
  {
    id: "b3_q8", blockId: "block_3", maxSelections: 1,
    text: "Sem pensar demasiado, qual destas palavras te parece mais perto do teu problema nuclear?",
    options: [
      { id: "b3_opt8_1", text: "margem" },
      { id: "b3_opt8_2", text: "apoio" },
      { id: "b3_opt8_3", text: "liberdade" },
      { id: "b3_opt8_4", text: "energia" },
      { id: "b3_opt8_5", text: "rumo" },
      { id: "b3_opt8_6", text: "vida" },
      { id: "b3_opt8_7", text: "névoa" }
    ]
  },
  {
    id: "b3_q9", blockId: "block_3", maxSelections: 1,
    text: "Qual destas frases te soa mais verdadeira neste momento?",
    options: [
      { id: "b3_opt9_1", text: "a minha vida está demasiado limitada por falta de meios" },
      { id: "b3_opt9_2", text: "a minha vida está demasiado exposta por falta de base afetiva" },
      { id: "b3_opt9_3", text: "a minha vida está demasiado condicionada para eu a moldar como queria" },
      { id: "b3_opt9_4", text: "a minha vida está demasiado desgastada para eu conseguir puxar por ela" },
      { id: "b3_opt9_5", text: "a minha vida está demasiado sem rumo para eu conseguir avançar" },
      { id: "b3_opt9_6", text: "a minha vida está demasiado apagada para eu a sentir realmente minha" },
      { id: "b3_opt9_7", text: "a minha vida está demasiado misturada para eu perceber o núcleo" }
    ]
  },
  {
    id: "b3_q10", blockId: "block_3", maxSelections: 1,
    text: "Se tivesses de resumir o teu travão principal numa frase curta, qual destas escolherias?",
    options: [
      { id: "b3_opt10_1", text: "falta-me margem para mexer na vida" },
      { id: "b3_opt10_2", text: "falta-me base para não carregar tudo sozinho/a" },
      { id: "b3_opt10_3", text: "falta-me liberdade para viver mais à minha maneira" },
      { id: "b3_opt10_4", text: "falta-me energia para sair do sítio" },
      { id: "b3_opt10_5", text: "falta-me direção para saber onde investir-me" },
      { id: "b3_opt10_6", text: "falta-me vida para sentir que isto vale mesmo a pena" },
      { id: "b3_opt10_7", text: "falta-me clareza para perceber o centro disto tudo" }
    ]
  },

  // ============================================
  // BLOCO 4
  // ============================================
  {
    id: "b4_q1", blockId: "block_4", maxSelections: 2,
    text: "Quando o dinheiro pesa na tua vida, o que é que ele representa mais para ti?",
    options: [
      { id: "b4_opt1_1", text: "margem para decidir e mexer na vida" },
      { id: "b4_opt1_2", text: "segurança para não viver em contenção" },
      { id: "b4_opt1_3", text: "prova de que consigo construir a minha vida" },
      { id: "b4_opt1_4", text: "liberdade para não depender tanto" },
      { id: "b4_opt1_5", text: "possibilidade de avançar sem me sentir travado/a" },
      { id: "b4_opt1_6", text: "não sei se o problema é o dinheiro ou o que ele simboliza" }
    ]
  },
  {
    id: "b4_q2", blockId: "block_4", maxSelections: 2,
    text: "Quando pensas na tua casa ou no espaço onde vives, o que dói mais se isso não estiver bem?",
    options: [
      { id: "b4_opt2_1", text: "não sentir base nem estabilidade" },
      { id: "b4_opt2_2", text: "não sentir que aquele espaço é realmente meu" },
      { id: "b4_opt2_3", text: "não poder moldar o espaço à minha maneira" },
      { id: "b4_opt2_4", text: "sentir-me provisório/a ou mal instalado/a" },
      { id: "b4_opt2_5", text: "sentir que a minha vida ainda não assentou" },
      { id: "b4_opt2_6", text: "não sei se é sobre casa ou sobre outra coisa por baixo" }
    ]
  },
  {
    id: "b4_q3", blockId: "block_4", maxSelections: 2,
    text: "Quando o trabalho te pesa, o que sentes mais?",
    options: [
      { id: "b4_opt3_1", text: "estou a dar demasiado e a receber pouco" },
      { id: "b4_opt3_2", text: "estou cansado/a de funcionar sem sentir avanço" },
      { id: "b4_opt3_3", text: "o trabalho ocupa-me, mas não me faz sentir mais dono/a da vida" },
      { id: "b4_opt3_4", text: "o que faço não está a abrir caminho suficiente" },
      { id: "b4_opt3_5", text: "sinto-me preso/a ao esforço, sem aceleração real" },
      { id: "b4_opt3_6", text: "não sei se é o trabalho em si ou o que ele me falha em devolver" }
    ]
  },
  {
    id: "b4_q4", blockId: "block_4", maxSelections: 2,
    text: "Quando sentes a rotina a apertar, o que é que ela está a matar mais em ti?",
    options: [
      { id: "b4_opt4_1", text: "tempo para viver com mais margem" },
      { id: "b4_opt4_2", text: "espontaneidade e liberdade" },
      { id: "b4_opt4_3", text: "energia e frescura mental" },
      { id: "b4_opt4_4", text: "entusiasmo e vontade" },
      { id: "b4_opt4_5", text: "presença, intensidade ou brilho" },
      { id: "b4_opt4_6", text: "nem sei se é rotina; é mais uma sensação de vida demasiado funcional" }
    ]
  },
  {
    id: "b4_q5", blockId: "block_4", maxSelections: 2,
    text: "Quando pensas no tempo a passar, o que te inquieta mais?",
    options: [
      { id: "b4_opt5_1", text: "continuar sem consolidar a vida como queria" },
      { id: "b4_opt5_2", text: "adiar demasiado decisões importantes" },
      { id: "b4_opt5_3", text: "perder energia ou força para mudar mais tarde" },
      { id: "b4_opt5_4", text: "sentir que a vida vai andando sem me apanhar inteiro/a" },
      { id: "b4_opt5_5", text: "chegar mais à frente com sensação de desperdício" },
      { id: "b4_opt5_6", text: "não sei se é medo do tempo ou da minha própria inércia" }
    ]
  },
  {
    id: "b4_q6", blockId: "block_4", maxSelections: 2,
    text: "Se te falta apoio, o que sentes mais em falta?",
    options: [
      { id: "b4_opt6_1", text: "alguém com quem realmente contar" },
      { id: "b4_opt6_2", text: "proximidade emocional consistente" },
      { id: "b4_opt6_3", text: "sensação de pertença" },
      { id: "b4_opt6_4", text: "uma base que me ajude a aguentar o peso" },
      { id: "b4_opt6_5", text: "menos solidão por detrás do funcionamento normal" },
      { id: "b4_opt6_6", text: "não sei se me falta apoio ou se já não espero recebê-lo" }
    ]
  },
  {
    id: "b4_q7", blockId: "block_4", maxSelections: 2,
    text: "Quando sentes que há desejo ou vida soterrada em ti, isso aparece mais como:",
    options: [
      { id: "b4_opt7_1", text: "coisas que queria viver e fui adiando" },
      { id: "b4_opt7_2", text: "vontade de sair de um modo de vida demasiado gasto" },
      { id: "b4_opt7_3", text: "necessidade de voltar a sentir magnetismo ou intensidade" },
      { id: "b4_opt7_4", text: "vontade de me sentir mais vivo/a, presente ou desejante" },
      { id: "b4_opt7_5", text: "sensação de que uma parte importante de mim está em exílio" },
      { id: "b4_opt7_6", text: "não sei se é desejo real ou só fuga ao que tenho" }
    ]
  },
  {
    id: "b4_q8", blockId: "block_4", maxSelections: 2,
    text: "No envelhecimento, o que te custa imaginar perder?",
    options: [
      { id: "b4_opt8_1", text: "tempo útil para corrigir rumo" },
      { id: "b4_opt8_2", text: "margem para arriscar e recomeçar" },
      { id: "b4_opt8_3", text: "vitalidade ou presença" },
      { id: "b4_opt8_4", text: "atratividade, magnetismo ou chama" },
      { id: "b4_opt8_5", text: "possibilidade de viver o que ainda ficou por viver" },
      { id: "b4_opt8_6", text: "não sei se me assusta envelhecer ou continuar assim" }
    ]
  },
  {
    id: "b4_q9", blockId: "block_4", maxSelections: 2,
    text: "Se pensas em ‘vida adiada’, qual destas frases te parece mais certa?",
    options: [
      { id: "b4_opt9_1", text: "estou demasiado ocupado/a a aguentar para conseguir viver" },
      { id: "b4_opt9_2", text: "ando a cumprir sem sentir que estou a avançar" },
      { id: "b4_opt9_3", text: "muita coisa em mim ficou para depois e continua lá" },
      { id: "b4_opt9_4", text: "a minha vida exterior existe, mas falta-me ligação interior a ela" },
      { id: "b4_opt9_5", text: "sinto que a vida que vivo está aquém da que sinto que me correspondia" },
      { id: "b4_opt9_6", text: "não sei se é vida adiada ou incapacidade de escolher uma vida" }
    ]
  },
  {
    id: "b4_q10", blockId: "block_4", maxSelections: 2,
    text: "Quando sentes que a vida não está como devia, o que te pesa mais como imagem interior?",
    options: [
      { id: "b4_opt10_1", text: "estou sem base suficiente" },
      { id: "b4_opt10_2", text: "estou sem lugar suficientemente meu" },
      { id: "b4_opt10_3", text: "estou sem avanço suficiente" },
      { id: "b4_opt10_4", text: "estou sem rumo suficientemente claro" },
      { id: "b4_opt10_5", text: "estou sem vida suficiente dentro da vida que tenho" },
      { id: "b4_opt10_6", text: "não consigo ainda traduzir isso numa imagem concreta" }
    ]
  },
  {
    id: "b4_q11", blockId: "block_4", maxSelections: 2,
    text: "Qual destas mudanças teria mais força simbólica para te devolver ar?",
    options: [
      { id: "b4_opt11_1", text: "ganhar margem financeira real" },
      { id: "b4_opt11_2", text: "mudar de casa ou de condições de vida" },
      { id: "b4_opt11_3", text: "sentir mais apoio ou menos solidão estrutural" },
      { id: "b4_opt11_4", text: "encontrar trabalho/caminho com mais avanço" },
      { id: "b4_opt11_5", text: "recuperar energia e presença" },
      { id: "b4_opt11_6", text: "voltar a sentir mais chama, desejo ou vida" },
      { id: "b4_opt11_7", text: "não sei qual destas mexeria mais fundo" }
    ]
  },
  {
    id: "b4_q12", blockId: "block_4", maxSelections: 2,
    text: "No fundo, o que sentes que está mais em risco se nada mudar?",
    options: [
      { id: "b4_opt12_1", text: "a construção concreta da minha vida" },
      { id: "b4_opt12_2", text: "a consolidação da minha base" },
      { id: "b4_opt12_3", text: "a minha autonomia real" },
      { id: "b4_opt12_4", text: "a minha força para agir" },
      { id: "b4_opt12_5", text: "o meu rumo" },
      { id: "b4_opt12_6", text: "a minha parte mais viva" },
      { id: "b4_opt12_7", text: "ainda não sei nomear isso" }
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { SURVEY_BLOCKS, SURVEY_QUESTIONS };
}
