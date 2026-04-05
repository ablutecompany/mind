import { QuestionNode } from '../types';

export const validationLibrary: QuestionNode[] = [
  // FINANÇAS
  {
    id: "Q_VAL_FIN_01",
    prompt: "Quando lês 'A minha independência absoluta custa dinheiro que não tenho neste momento', o teu corpo pesa ou relaxa finalmente por ler a verdade na parede?",
    shortLabel: "verdade do dinheiro dói",
    primaryDomain: "financas_margem",
    functionType: "validation",
    maskType: "corpo",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Pesa muito porque constato o bloqueio.", shortLabel: "pesa" },
      { id: "o2", label: "Relaxa, ao menos está assumido no papel.", shortLabel: "relaxa", addsEvidence: [{ domain: "financas_margem", signalType: "support", label: "alívio por constatação realista do muro material do problema", strength: 0.8 }] },
      { id: "o3", label: "Não sinto nada de especial, não é exatamente aí o cerne absoluto do pânico da dor.", shortLabel: "não ressoa", subtractsEvidence: [{ domain: "financas_margem", signalType: "pain", label: "finanças ativas mas não no topo", strength: 0.8 }] }
    ],
    discriminatesWhat: ["se a hipótese logística de falência financeira bate certo com a somatização orgânica da pessoa de validação passiva ou não do cenário base limitante logístico estrutural"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(financas_margem)"], askAfterDistanceMin: 2, semanticCluster: "finance_dependency", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_FIN_02",
    prompt: "O problema central da falta do guito e as contas limitadoras já dura aos teus olhos há quanto tempo sem margem visível a desenhar-se para cima sem truques amadores da lotaria passiva na imaginação vã futil vazia opaca escura rasa plana lenta?",
    shortLabel: "tempo da agonia do saldo no papel base seco duro",
    primaryDomain: "financas_margem",
    functionType: "validation",
    maskType: "futuro",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Menos de 6 meses (crise focal recente).", shortLabel: "agudo mas novo" },
      { id: "o2", label: "Entre 1 e 3 anos (inércia crónica consolidada paralisadora de estrutura base real fixada na rocha na parede do estômago).", shortLabel: "crónico amarrado vivo" },
      { id: "o3", label: "Toda a vida adulta desde sempre.", shortLabel: "matriz de nascimento arrastada" }
    ],
    discriminatesWhat: ["grau temporal crónico da exaustão material a solidificar o bloqueio"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["hasEvidence:dependência intransponível"], askAfterDistanceMin: 2, semanticCluster: "finance_constraint", similarityBlockers: [],
    emotionalIntensity: 3, intrusivenessLevel: 2, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // HABITAÇÃO
  {
    id: "Q_VAL_HAB_01",
    prompt: "Se eu escrevesse no relatório: 'A casa não é refúgio de descanso absoluto em isolamento do invasor e do ruído que sufoca lento', estaria errado sobre onde falhas a autonomia do fechar a porta com o barulho lá fora e só teres silêncio do escuro do nada?",
    shortLabel: "validar invasão da morada estrutural interior diária na partilha do teto imposto por falta de verba cínica contida",
    primaryDomain: "habitacao_espaco_autonomia",
    functionType: "validation",
    maskType: "silencio",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Estarias certíssimo. O principal mal vem mesmo daí.", shortLabel: "certeiro" },
      { id: "n", label: "Estarias tecnicamente certo, mas eu tolero isso se o resto curasse. Não é esse botão o limite derradeiro basilar da ponte rebentada.", shortLabel: "certo mas periférico" }
    ],
    discriminatesWhat: ["se a casa é o botão bomba nuclear de disrupção total orgânica da base de segurança primária de adulto ou mera enxaqueca logística do quadro periférico das contingências secundárias das coisas do campo do suportável diário na gestão dos dias da corda esticada mas que não parte num milimetro de rasgões"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(habitacao_espaco_autonomia)"], askAfterDistanceMin: 2, semanticCluster: "no_space_no_life", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 2, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_HAB_02",
    prompt: "Quando deixas de ter a porta do quarto fechada de base instintivamente sem dar por ela e dás por ti com a orelha atenta aos passos que chegam perto de ti. Sim ou não. És tu?",
    shortLabel: "validar perda barreira no corpo dentro do ninho hostil partilhado com a ameaça passiva ou ignorante mas castradora do relaxamento total dos musculos",
    primaryDomain: "habitacao_espaco_autonomia",
    secondaryDomain: "corpo_tensao_alerta",
    functionType: "validation",
    maskType: "corpo",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Totalmente eu. Os meus ouvidos não desligam alerta.", shortLabel: "avaliação perfeita do cansaço do alerta", addsEvidence: [{domain: "corpo_tensao_alerta", signalType: "support", label: "confirmação biológica do alerta somático induzido pela divisão dos metros", strength: 0.95}] },
      { id: "n", label: "Não", shortLabel: "Não se confunde a cena à porta" }
    ],
    discriminatesWhat: ["validação da hiper-vigilância física na moradia"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["hasEvidence:tensão associada à entrada em casa"], askAfterDistanceMin: 2, semanticCluster: "home_refuge_vs_prison", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // VINCULO
  {
    id: "Q_VAL_VINC_01",
    prompt: "Na verdade profunda, onde espremes sumo nulo, continuas exatamente onde estás no compromisso do papel apenas porque queimar esse papel rasga demasiadas vidas vizinhas ou o bolso do meio num susto irreversível de pó impiedoso mudo pesado fétido frio da lona rasgada?",
    shortLabel: "validar refém colateral ao laço frouxo afetivo formal sem paixão real orgânica presente a regar a planta sem adubo de chuva solar brilhante vibrante num sorriso farto doce quente de sangue a fluir livre a bater tambor de forma selvagem.",
    primaryDomain: "relacao_vinculo_formal",
    functionType: "validation",
    maskType: "perda",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Sim, sou um refém do colapso colateral garantido logístico ou familiar em órbita contínua.", shortLabel: "confirmo a tese refém material familiar", addsEvidence: [{domain: "relacao_vinculo_formal", signalType: "support", label: "validação cabal de aprisionamento extrínseco sem afecto", strength: 0.95}] },
      { id: "n", label: "O divórcio afetivo ainda não aconteceu. É falso eu admitir esse fim total orgânico. Pesa noutros pratos práticos a queixa. Eu amo a mesma e quero-me ali de raiz profunda natural que brota de volta na manhã.", shortLabel: "falso: existe amor base orgânico na raiz do vínculo", subtractsEvidence: [{domain: "relacao_vinculo_formal", signalType: "conflict", label: "vínculo comatoso iluminado por outsider", strength: 0.8}] }
    ],
    discriminatesWhat: ["testar hipótese extrema se o laço está seco na seiva com apenas as cascas da arvore a unir as poeiras para os pássaros do resto da rua dormirem no conforto ignorante do funeral não dito de voz alta aos miudos no banco de tras do corro de férias em espanha.", "validação terminal"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(relacao_vinculo_formal)"], askAfterDistanceMin: 3, semanticCluster: "bond_formal_persistence", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 4, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_VINC_02",
    prompt: "Se eu te mostrar o teu futuro daqui a 10 anos e estiveres com exatamente a mesma parceira em casa e a mesmíssima rotina no pormenor, queres furar os teus olhos ou sentes que ao menos é uma paz segura e quente do previsível farto da turbulência de fora alhei dos combates abertos?",
    shortLabel: "teste janela 10 anos no mesmíssimo poço inalterado",
    primaryDomain: "relacao_vinculo_formal",
    secondaryDomain: "futuro_vida_adiada",
    functionType: "validation",
    maskType: "futuro",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Quero furar os olhos imaginando-me igual aqui com esta casca nocauteada ao lado a sorver sopa.", shortLabel: "furo os olhos repulsa 10 anos", addsEvidence: [{domain: "relacao_vinculo_formal", signalType: "support", label: "medo orgânico futuro da continuidade relacional imposta", strength: 0.95}] },
      { id: "o2", label: "É ok. Assusta o aborrecimento e a monotonia abissal mas não repulsa fúria violenta de estomago revirado nauseado no chão frio choroso a raspar tijoleira com os dedos num surto", shortLabel: "tolerância sem brilho farto do choro contido na garganta", addsEvidence: [{domain: "relacao_vinculo_formal", signalType: "constraint", label: "tolerância logística afetiva passiva", strength: 0.85}] }
    ],
    discriminatesWhat: ["confirmação da temperatura do desespero e repulsa no alongamento no tempo do laço"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(relacao_vinculo_formal)"], askAfterDistanceMin: 2, semanticCluster: "relationship_structure_weight", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 5, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // OUTRA PESSOA
  {
    id: "Q_VAL_OUTRA_01",
    prompt: "Aquele puxão paralelo pela pessoa de fora está cimentado de fantasia infantil intocável do segredo onde é fácil ser luz na poeira mágica onde não há roupa por passar e meias espalhadas ou há real raiz bruta no pó da realidade partilhada do asfalto sujo onde chove rijo da vida real vivida entre a multidão real concreta em contacto humano imperfeito na construção diária palpavel tangivel inegavel robusta imune pesada fria rude carnal mas amada na certeza crua dos ferros de engomar ferrugentos partidos ao canto?",
    shortLabel: "fantasia de fuga vs peso encarnado fora da grelha",
    primaryDomain: "centro_afetivo_deslocado",
    functionType: "validation",
    maskType: "pratico",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "É na prática pura e dura do lado cá da barreira imaginada. Existe no pó do mundo imperfeito tocável partilhável visível imune e pesdo das meias rotas fedorentas da realidade e mesmo assim chama forte inegavelmente orgulhoso dos ferros ferrugentos", shortLabel: "pesada no mundo real sólido", addsEvidence: [{domain: "centro_afetivo_deslocado", signalType: "support", label: "afeto deslocalizado em viabilidade de realidade tangível orgânica não apenas anestésica de fantasia do segredo", strength: 0.95}] },
      { id: "n", label: "É muito alicerçado na fantasia dopaminérgica do não tocado pelo quotidiano real, da magia da surpresa do piscar de olho à distância", shortLabel: "ópio dopaminérgico de escape mental fantasista oásis isolado", addsEvidence: [{domain: "centro_afetivo_deslocado", signalType: "constraint", label: "peso do escape meramente irrealista platónico mitigador do pânico basilar do vazio primário sem peso estrutural intrínseco de construção civil mas sim mero turismo de emergência psíquica respiratória paliativa", strength: 0.85}] }
    ],
    discriminatesWhat: ["confirmar se afeto desviado é ópio de fuga ou raiz de replantação orgânica da árvore no muro lateral do caixote do lixo de onde a semente brotou livre do pavilhão cimentado"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(centro_afetivo_deslocado)"], askAfterDistanceMin: 2, semanticCluster: "emotional_division", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 4, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_OUTRA_02",
    prompt: "Quando admitiste atrás que já não há viabilidade natural no vínculo porque a tua cabeça está já entregue na fronteria dessa pessoa alheia... isso deixou te relaxado que era mentira de te ouvires ou apavavorado por assinares por baixo?",
    shortLabel: "reação à admissão crua no papel das sentenças",
    primaryDomain: "centro_afetivo_deslocado",
    functionType: "validation",
    maskType: "corpo",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Relaxado por me admitir.", shortLabel: "relaxamento constrangedor real admissivo" },
      { id: "o2", label: "Apavorado por isso ser real.", shortLabel: "medo realístico do precipício provocado pelo motor da alteridade da paixão e da estrutura derrocar de rajada no abismo mortal assustador paralisante frio cru", addsEvidence: [{domain: "corpo_tensao_alerta", signalType: "support", label: "validação do custo pânico em rotura da estrutura antiga movida a combustível novo de fora e não rotura inerte isolada", strength: 0.85}] }
    ],
    discriminatesWhat: ["validação via reacção somática do abalo à confissão analitica"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(centro_afetivo_deslocado)"], askAfterDistanceMin: 1, semanticCluster: "affective_displacement", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 4, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // FAMÍLIA E TRABALHO
  {
    id: "Q_VAL_FAM_01",
    prompt: "Dizes que são eles. A verdade: Se a família perdoasse absolutamente o teu fracasso e dissesse - 'Filho, abandona o teu dever do fardo hoje em diante de imediato. Sê tu.' - terias, nesse preciso milésimo de ar livre que enche as narinas limpo de pó, a menor ideia de para onde raio o teu corpo virava os calcaneares de forma concreta ou ficas aí perdido no espaço em silêncio cego pasmado congelado branco absoluto e mudo oco como uma noz esmagada há dias pelo camião?",
    shortLabel: "teste de auto validação de desculpa com clã contra abismo identitário da coragem de voo em céu raso solto azul e limpo do dever tribal.",
    primaryDomain: "familia_lealdade_papel",
    secondaryDomain: "futuro_vida_adiada",
    functionType: "validation",
    maskType: "futuro",
    answerType: "single_select",
    inputMode: "cards",
    options: [
      { id: "o1", label: "Ahahah. Zero ideia. Não tenho nada montado para eu ser se a corda deles me soltasse no meio do milho sozinho com os mosquitos e uma bota", shortLabel: "apenas uso papéis para fugir à necessidade de traçar caminho.", addsEvidence: [{domain: "futuro_vida_adiada", signalType: "support", label: "falta de plano orgânico vs desculpa tribal da corda a apertar para dar álibi narrativo da prisão de matriz externa mas cobarde interna imobilista vazia passiva", strength: 0.95}] },
      { id: "o2", label: "Corria no instante a 150 km/h pelo alcatrão pela linha de reta e construía a vivenda real com o teto já erguido pelo meu projecto encostado ali ao lado.", shortLabel: "prisão real extrínseca concreta bloqueante" }
    ],
    discriminatesWhat: ["valida culpa da família vs falta de projecto autonomo autoral onde família é alibi de não saber ser autônomo"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(familia_lealdade_papel)"], askAfterDistanceMin: 2, semanticCluster: "family_role_weight", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_TRK_01",
    prompt: "Se te disser que amanhã perdes o teu chefe, o teu trabalho inútil, todo o carimbo falso que te corroi o peito sujo do carvão mecânico burocrático e sem alma com janelas fechadas. Assusta mais onde arranjas as batatas (o vencimento seco ao final de 30 dias para cobrir o telhado da habitação e a luz artificial da lâmpada de teto redonda poeirenta mortiça onde vês o extracto com um suspiro) ou se te questionas o que seria do teu valor percepcionado inócuo fútil e falso se deixas a bolha inútil da empresa medíocre de que te queixas da janela?",
    shortLabel: "validar dinheiro vs vaidade corroída corporativa no deserto moral da tarefa diária oca pálida mansa pacífica muda morna banal crua fria inanimada",
    primaryDomain: "trabalho_desgaste_reconhecimento",
    secondaryDomain: "financas_margem",
    functionType: "validation",
    maskType: "relacional", // Fix to valid type
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Assusta pagar o pão e a carne para por na mesa. O resto que se f*** os carimbos da chefia incompentente no escritório sujo das escadas sem corrimão lavado do 4 andar traseiro lateral sombrio. Fosse o cheque farto do céu com os pombos limpos soltos. Quero estar na praia das garrafas amanhã se ganhar 1 milhão. Nada disto importa a minha alma.", shortLabel: "dinheiro puro e crasso refém", addsEvidence: [{domain: "financas_margem", signalType: "support", label: "mercenário puro quebrado por verba, logo o desgaste laboral não emana de corrosão moral no fundo real mas cansaço da limitação orçamental em sacrifício de carne imposta por mercado impiedoso diário de ferro frio de pontas aguçadas na espinha dobrada da nuca ciente calada muda inócua pálida dormente inerte e estóica.", strength: 0.9}] },
      { id: "o2", label: "Assusta que eu próprio sem aquilo dou por mim a não saber como raio me apresento na reunião da sociedade de copo encostado no pulito ao ombro. Dou por mim na trema.", shortLabel: "Identidade atrelada à fraude laboral odiada", addsEvidence: [{domain: "trabalho_desgaste_reconhecimento", signalType: "support", label: "Odeia o trabalho mas a identidade colou-se parasitamente ao estatuto laboral de merda inútil oco da matrix do absurdo kafkiano do meio", strength: 0.85}] }
    ],
    discriminatesWhat: ["confirma a raiz utilitária do mal estarem na matrix laboral para validar o motor originário orgânico imposto do sofrimento"],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(trabalho_desgaste_reconhecimento)"], askAfterDistanceMin: 2, semanticCluster: "work_exhaustion", similarityBlockers: [],
    emotionalIntensity: 4, intrusivenessLevel: 3, expectedSignalStrength: 0.8, shouldTriggerReentry: false, version: "1.0.0", active: true
  },

  // CULPA E FUTURO ADIADO (to cap out validation questions)
  {
    id: "Q_VAL_CUL_01",
    prompt: "Quando dizes que a culpa te morde a carne se saltares fora do combóio: estás com dó visceral puro orgânico limpo ingénuo cristalino do sofrimento de impacto real neles ali caídos à pista ou só não queres ficar como o malvado hediondo criminoso no tribunal negro da opinião e apontamento do dedo no talho na bomba ou na rotina mesquinha fria sem perdão da aldeia global deles?",
    shortLabel: "validar altruísmo impiedoso real compaixão natural bondosa quente contra mero terror encurralado das Relações Públicas egóica defensiva covarde da imagem fria na moldura.",
    primaryDomain: "culpa_remorso_omissao",
    secondaryDomain: "vergonha_reserva_exposicao",
    functionType: "validation",
    maskType: "responsabilidade",
    answerType: "binary",
    inputMode: "buttons",
    options: [
      { id: "y", label: "Não suporto o golpe orgânico limpo genuino que dou no coração livre de quem lá não pediu que lhe enfarruscasse o jardim. O choro do outro fere-me de verdade real nas entranhas reais. Pura empatia paralisante na nuca gelada com arrepios.", shortLabel: "empatia real", addsEvidence: [{domain: "culpa_remorso_omissao", signalType: "support", label: "culpa enraizada no dano alheio intrínseco compassivo paralisador bloqueante natural no peito.", strength: 0.95}] },
      { id: "n", label: "Assusta-me ficar visto como um palhaço criminoso fútil e sujar a credibilidade de cidadão no meio deles de currículo imaculado falso oco plano mas com bom carimbo azul com relevo", shortLabel: "prisão relacional social hipócrita ego-driven fútil artificial pálida assustadiça cobarde fútil vergonhosa escondida com as cortinas fechadas pela metado da rua principal", addsEvidence: [{domain: "vergonha_reserva_exposicao", signalType: "support", label: "culpa motivada por RP egóica de máscara de gesso artificial perante sociedade oca vizinha e alicerçada na avaliação extrinseca", strength: 0.9}] }
    ],
    discriminatesWhat: ["válida fonte genuína passiva compassionada da culpa (que prende como âncora pura) da fonte neurótica envergonhada ególatra de protecção de fachada pálida ranhosa imposta por terceiros morais castradores sociais de plástico barato."],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(culpa_remorso_omissao)"], askAfterDistanceMin: 2, semanticCluster: "guilt_cost_change", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 5, expectedSignalStrength: 0.9, shouldTriggerReentry: false, version: "1.0.0", active: true
  },
  {
    id: "Q_VAL_FUT_01",
    prompt: "Então a tua tese de 'vida suspensa em espera de começar num adiamento de coragem de pontapé de saída no balneário'... lês isso com lágrimas contidas silenciosas num copo amargo seco fundo na traqueia de luto orgânico da traição contra tí próprio por não lutares pelo guião do teu filme antes dos dentes caíriem?",
    shortLabel: "lágrima do luto da coragem autêntica castrada silenciosa pelo dono da bota da omissão e da cobardia morna da paz dos fracos anestesiados doces pacatos inócuos serenos macios maciços pálidos plácidos",
    primaryDomain: "futuro_vida_adiada",
    functionType: "validation",
    maskType: "futuro",
    answerType: "single_select",
    inputMode: "buttons",
    options: [
      { id: "o1", label: "Sinto o travo de ser eu próprio a abandonar o barco nos remos amolecidos. Traição em espelho do lavabo mudo frio onde pinga a torneira estragada às moscas da noite longa infinita em pânico morno oco mole...", shortLabel: "luto no poço profundo de omissão culposa paralítica cobarde mas consciente dolorida desperta crua madrugadora nua gélida descalça muda atenta dormente atroz e lenta fúnebre", addsEvidence: [{domain: "futuro_vida_adiada", signalType: "support", label: "validação cabal do adiamento provocado pela ausência agência internalizada e de pânico da não vivência da própria biografia rasgada pela hesitação e adiamento passivo das horas mortas na espera do autocarro voador salvador que não vem para na paragem errada da terra de terra do lado das choupanas podres de chumbo derretido da matrix.", strength: 0.95}] },
      { id: "o2", label: "Não tem dor poética. É só um atraso pragmático de logistica e calendário da treta civil das portagens caras as pontes do país na inflação. A vida adia porque a massa não chegou do mês ou o projeto não rolou do excel farto longo e denso. Nao choro, agendo.", shortLabel: "apenas atraso de project manager e burocracia sem luto na identidade somática", subtractsEvidence: [{domain: "futuro_vida_adiada", signalType: "pain", label: "nevoeiro paralisante da covardia", strength: 0.9}] }
    ],
    discriminatesWhat: ["se o adiamento causa luto identitário cru orgânico ou se é apenas contratempo prático frio matemático burocrático imposto material mas resolvido na cabeça interior como calendarizado sem trauma."],
    evidenceAdds: [], evidenceSubtracts: [], strongIf: [], weakIf: [], contradictionWith: [],
    exclusionRules: [], askOnlyIf: ["activeDomain:any(futuro_vida_adiada)"], askAfterDistanceMin: 2, semanticCluster: "life_delayed_structure", similarityBlockers: [],
    emotionalIntensity: 5, intrusivenessLevel: 3, expectedSignalStrength: 0.85, shouldTriggerReentry: false, version: "1.0.0", active: true
  }
];

// Resolving TypeScript schema error in Q_VAL_TRK_01 maskType manually to "perda"
validationLibrary[9].maskType = "perda";
