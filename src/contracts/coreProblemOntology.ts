// src/contracts/coreProblemOntology.ts
export type CoreProblemId = 
  | 'medo'
  | 'ansiedade'
  | 'solidao'
  | 'baixa_autoestima'
  | 'falta_sentido'
  | 'dificuldade_emocoes'
  | 'necessidade_aprovacao'
  | 'comparacao_constante'
  | 'procrastinacao'
  | 'falta_autocontrolo'
  | 'conflitos_internos'
  | 'dificuldade_aceitar_realidade'
  | 'relacoes_dificeis'
  | 'sofrimento_incerteza'
  | 'consciencia_mortalidade';

export interface CoreProblemDefinition {
  id: CoreProblemId;
  label: string;
  derivatives: string[];
  visibleSignals: string[];
  rivalIds: CoreProblemId[];
  questionFamilies: string[]; // for future use
}

export const CORE_PROBLEM_ONTOLOGY: Record<CoreProblemId, CoreProblemDefinition> = {
  medo: {
    id: 'medo',
    label: 'Medo',
    derivatives: ['evitamento', 'controlo', 'indecisao', 'ciume', 'rigidez'],
    visibleSignals: ['adia decisões', 'foge de conversas difíceis', 'precisa de confirmação constante', 'quer controlar detalhes', 'evita arriscar'],
    rivalIds: ['ansiedade', 'sofrimento_incerteza'],
    questionFamilies: []
  },
  ansiedade: {
    id: 'ansiedade',
    label: 'Ansiedade',
    derivatives: ['ruminacao', 'insonia', 'tensao_fisica', 'irritabilidade', 'panico'],
    visibleSignals: ['pensa demais antes de agir', 'está sempre em alerta', 'dorme mal', 'fala depressa', 'mexe-se muito', 'tem dificuldade em descansar'],
    rivalIds: ['medo', 'conflitos_internos'],
    questionFamilies: []
  },
  solidao: {
    id: 'solidao',
    label: 'Solidão',
    derivatives: ['vazio', 'carencia', 'dependencia_emocional', 'tristeza', 'isolamento'],
    visibleSignals: ['procura atenção com frequência', 'sente-se esquecida facilmente', 'agarra-se a relações fracas', 'afasta-se de toda a gente'],
    rivalIds: ['necessidade_aprovacao', 'baixa_autoestima'],
    questionFamilies: []
  },
  baixa_autoestima: {
    id: 'baixa_autoestima',
    label: 'Baixa autoestima',
    derivatives: ['vergonha', 'autocritica', 'perfeccionismo', 'submissao', 'sindrome_impostor'],
    visibleSignals: ['desvaloriza o que faz', 'pede desculpa em excesso', 'teme expor-se', 'aceita pouco', 'compara-se muito', 'acha que os outros são melhores'],
    rivalIds: ['comparacao_constante', 'necessidade_aprovacao'],
    questionFamilies: []
  },
  falta_sentido: {
    id: 'falta_sentido',
    label: 'Falta de sentido',
    derivatives: ['apatia', 'vazio_existencial', 'desmotivacao', 'dispersao', 'desistencia'],
    visibleSignals: ['anda em piloto automático', 'muda de direção sem parar', 'começa coisas e não sustenta', 'sente que nada chega'],
    rivalIds: ['procrastinacao', 'consciencia_mortalidade'],
    questionFamilies: []
  },
  dificuldade_emocoes: {
    id: 'dificuldade_emocoes',
    label: 'Dificuldade em lidar com emoções',
    derivatives: ['impulsividade', 'repressao', 'explosoes', 'somatizacao', 'culpa'],
    visibleSignals: ['explode por pequenas coisas', 'cala tudo até rebentar', 'chora e não percebe bem porquê', 'descarrega nos outros', 'sente culpa depois'],
    rivalIds: ['falta_autocontrolo', 'conflitos_internos'],
    questionFamilies: []
  },
  necessidade_aprovacao: {
    id: 'necessidade_aprovacao',
    label: 'Necessidade de aprovação',
    derivatives: ['medo_desagradar', 'excesso_adaptacao', 'perda_identidade', 'ressentimento'],
    visibleSignals: ['diz sim quando quer dizer não', 'tenta agradar a todos', 'muda de opinião conforme a pessoa', 'fica magoada por não ser reconhecida'],
    rivalIds: ['baixa_autoestima', 'solidao'],
    questionFamilies: []
  },
  comparacao_constante: {
    id: 'comparacao_constante',
    label: 'Comparação constante',
    derivatives: ['inveja', 'inferioridade', 'frustracao', 'exibicao_compensatoria', 'desanimo'],
    visibleSignals: ['mede-se pelos resultados dos outros', 'sente que está sempre atrás', 'não desfruta das próprias conquistas', 'procura mostrar valor'],
    rivalIds: ['baixa_autoestima'],
    questionFamilies: []
  },
  procrastinacao: {
    id: 'procrastinacao',
    label: 'Procrastinação',
    derivatives: ['culpa', 'stress', 'fuga', 'baixa_confianca', 'autoimagem_incapacidade'],
    visibleSignals: ['adia tarefas importantes', 'ocupa-se com coisas menores', 'evita começar', 'trabalha só sob pressão', 'critica-se depois'],
    rivalIds: ['medo', 'conflitos_internos', 'falta_sentido'],
    questionFamilies: []
  },
  falta_autocontrolo: {
    id: 'falta_autocontrolo',
    label: 'Falta de autocontrolo',
    derivatives: ['compulsoes', 'vicios', 'excessos', 'impulsividade', 'arrependimento'],
    visibleSignals: ['reage sem pensar', 'gasta demasiado', 'come ou consome em excesso', 'repete comportamentos que diz querer parar'],
    rivalIds: ['dificuldade_emocoes'],
    questionFamilies: []
  },
  conflitos_internos: {
    id: 'conflitos_internos',
    label: 'Conflitos internos',
    derivatives: ['auto_sabotagem', 'indecisao', 'incoerencia', 'ansiedade', 'desgaste'],
    visibleSignals: ['quer uma coisa mas faz outra', 'muda de rumo repetidamente', 'sente-se dividida', 'bloqueia quando tem de escolher'],
    rivalIds: ['ansiedade', 'procrastinacao'],
    questionFamilies: []
  },
  dificuldade_aceitar_realidade: {
    id: 'dificuldade_aceitar_realidade',
    label: 'Dificuldade em aceitar a realidade',
    derivatives: ['negacao', 'revolta', 'apego_passado', 'vitimizacao', 'resistencia'],
    visibleSignals: ['insiste no que já acabou', 'culpa muito o exterior', 'não se adapta', 'fica presa ao "isto não devia estar a acontecer"'],
    rivalIds: ['relacoes_dificeis'],
    questionFamilies: []
  },
  relacoes_dificeis: {
    id: 'relacoes_dificeis',
    label: 'Relações difíceis',
    derivatives: ['ressentimento', 'dependencia', 'afastamento', 'defensividade', 'repeticao_padroes'],
    visibleSignals: ['discute pelos mesmos motivos', 'fecha-se', 'interpreta tudo como ataque', 'escolhe repetidamente o mesmo tipo de relação problemática'],
    rivalIds: ['solidao', 'dificuldade_emocoes'],
    questionFamilies: []
  },
  sofrimento_incerteza: {
    id: 'sofrimento_incerteza',
    label: 'Sofrimento com a incerteza',
    derivatives: ['controlo_excessivo', 'ansiedade_antecipatoria', 'bloqueio', 'procura_garantias'],
    visibleSignals: ['precisa de saber tudo antes', 'faz planos em excesso', 'custa-lhe avançar sem certeza', 'pede validação constantemente'],
    rivalIds: ['medo', 'ansiedade'],
    questionFamilies: []
  },
  consciencia_mortalidade: {
    id: 'consciencia_mortalidade',
    label: 'Consciência da mortalidade',
    derivatives: ['angustia_existencial', 'hipocondria', 'urgencia', 'medo_perda', 'procura_transcendencia'],
    visibleSignals: ['medo excessivo de doença', 'obsessão com o tempo', 'sensação de que está "atrasada na vida"', 'necessidade de deixar marca'],
    rivalIds: ['falta_sentido'],
    questionFamilies: []
  }
};
