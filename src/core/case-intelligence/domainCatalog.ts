import { DomainKey } from './types';

export interface DomainDefinition {
  id: DomainKey;
  publicLabel: string;
  internalLabel: string;
  typicalObjects: string[];
  starterSignals: string[];
  exclusionHints: string[];
}

export const DOMAIN_CATALOG: Record<DomainKey, DomainDefinition> = {
  financas_margem: {
    id: 'financas_margem',
    publicLabel: 'Finanças e Margem',
    internalLabel: 'Tensão Financeira e Falta de Margem Manobra',
    typicalObjects: ['dinheiro', 'contas', 'dívida', 'renda', 'salário'],
    starterSignals: ['não sobra dinheiro', 'contar os tostões', 'dependência financeira'],
    exclusionHints: ['se a pessoa tem poupanças folgadas', 'se a questão é apenas de gestão de património'],
  },
  habitacao_espaco_autonomia: {
    id: 'habitacao_espaco_autonomia',
    publicLabel: 'Habitação e Espaço',
    internalLabel: 'Restrição de Espaço e Autonomia Habitacional',
    typicalObjects: ['casa', 'quarto', 'privacidade', 'renda', 'pais'],
    starterSignals: ['viver com os pais', 'não ter o meu espaço', 'casa partilhada por necessidade'],
    exclusionHints: ['vive sozinho por opção', 'tem casa própria sem esforço excessivo'],
  },
  relacao_vinculo_formal: {
    id: 'relacao_vinculo_formal',
    publicLabel: 'Relação e Vínculo',
    internalLabel: 'Tensão no Vínculo Formal / Casamento',
    typicalObjects: ['casamento', 'marido', 'mulher', 'namorado', 'divórcio'],
    starterSignals: ['estamos juntos por inércia', 'só vivemos na mesma casa', 'vínculo por cumprir calendário'],
    exclusionHints: ['relação recente e leve', 'tensão puramente romântica sem peso estrutural'],
  },
  centro_afetivo_deslocado: {
    id: 'centro_afetivo_deslocado',
    publicLabel: 'Afeto e Foco',
    internalLabel: 'Centro Afetivo Deslocado (Outra Pessoa)',
    typicalObjects: ['outra pessoa', 'amante', 'paixão', 'fantasia'],
    starterSignals: ['penso noutra pessoa', 'gosto de alguém fora da relação', 'relação paralela'],
    exclusionHints: ['foco total no parceiro(a) atual', 'questão de amizade sem natureza afetivo-romântica disruptiva'],
  },
  familia_lealdade_papel: {
    id: 'familia_lealdade_papel',
    publicLabel: 'Família e Papel',
    internalLabel: 'Dissonância de Papel e Lealdade Familiar',
    typicalObjects: ['filhos', 'pais', 'família', 'responsabilidade', 'cuidar'],
    starterSignals: ['tenho de cuidar deles', 'o que a família espera de mim', 'sacrifício pelos filhos'],
    exclusionHints: ['ausência de peso familiar na queixa', 'liberdade total face à família de origem'],
  },
  trabalho_desgaste_reconhecimento: {
    id: 'trabalho_desgaste_reconhecimento',
    publicLabel: 'Trabalho e Desgaste',
    internalLabel: 'Erosão no Trabalho e Falta de Reconhecimento',
    typicalObjects: ['trabalho', 'chefe', 'carreira', 'esforço', 'burnout'],
    starterSignals: ['trabalho demasiado e não sou valorizado', 'odeio o que faço', 'estou esgotado no trabalho'],
    exclusionHints: ['o trabalho é uma paixão atual', 'o desgaste é primariamente físico e não relacionado com reconhecimento'],
  },
  futuro_vida_adiada: {
    id: 'futuro_vida_adiada',
    publicLabel: 'Tempo e Futuro',
    internalLabel: 'Perceção de Vida Adiada',
    typicalObjects: ['idade', 'tempo', 'projetos', 'espera'],
    starterSignals: ['sinto que o tempo está a passar', 'a minha vida está em pausa', 'à espera que algo mude'],
    exclusionHints: ['foco intenso no presente', 'sensação de realização atempada'],
  },
  culpa_remorso_omissao: {
    id: 'culpa_remorso_omissao',
    publicLabel: 'Culpa e Remorso',
    internalLabel: 'Peso da Culpa ou Omissão',
    typicalObjects: ['passado', 'erro', 'decisão', 'segredo'],
    starterSignals: ['sinto-me culpado', 'devia ter feito diferente', 'magoei alguém'],
    exclusionHints: ['narrativa vitimizada crassa (a culpa é apenas dos outros)'],
  },
  vergonha_reserva_exposicao: {
    id: 'vergonha_reserva_exposicao',
    publicLabel: 'Vergonha e Exposição',
    internalLabel: 'Medo da Exposição e Vergonha Social',
    typicalObjects: ['imagem', 'os outros', 'julgamento', 'aparências'],
    starterSignals: ['tenho vergonha do que vão pensar', 'viver de aparências', 'esconder a realidade'],
    exclusionHints: ['despreocupação total com a imagem pública'],
  },
  controlo_humilhacao_injustica: {
    id: 'controlo_humilhacao_injustica',
    publicLabel: 'Controlo e Injustiça',
    internalLabel: 'Dinamicas de Controlo, Humilhação ou Injustiça Sofrida',
    typicalObjects: ['controlo', 'abuso', 'injustiça', 'poder', 'parceiro/chefe'],
    starterSignals: ['sinto-me controlado', 'trata-me abaixo de cão', 'não é justo o que passo'],
    exclusionHints: ['dinâmicas relacionais equilibradas'],
  },
  corpo_tensao_alerta: {
    id: 'corpo_tensao_alerta',
    publicLabel: 'Corpo e Tensão',
    internalLabel: 'Somatização e Tensão de Alerta Constante',
    typicalObjects: ['corpo', 'doença', 'sono', 'ansiedade'],
    starterSignals: ['não durmo', 'o meu corpo dói', 'estou sempre em alerta'],
    exclusionHints: ['queixas puramente médicas sem correlação de stress reportada'],
  },
  casa_refugio_vs_prisao: {
    id: 'casa_refugio_vs_prisao',
    publicLabel: 'A Casa',
    internalLabel: 'Ambivalência: Casa como Refúgio vs Prisão',
    typicalObjects: ['casa', 'lar', 'paredes', 'silêncio'],
    starterSignals: ['não quero ir para casa', 'sinto-me preso em casa', 'a casa é o meu único porto seguro e o meu abismo'],
    exclusionHints: ['a habitação não tem carga simbólica no discurso'],
  },
  liberdade_vs_estabilidade: {
    id: 'liberdade_vs_estabilidade',
    publicLabel: 'Liberdade vs Estabilidade',
    internalLabel: 'Tensão Estrutural entre Libertação e Preservação da Estabilidade',
    typicalObjects: ['mudança', 'rotina', 'prisão', 'segurança'],
    starterSignals: ['quero fugir mas tenho medo', 'a estabilidade está a matar-me de tédio'],
    exclusionHints: ['ausência de conflito entre estes dois polos'],
  },
  paz_vs_chama: {
    id: 'paz_vs_chama',
    publicLabel: 'Paz vs Paixão',
    internalLabel: 'Conflito Afetivo entre Paz Morta e Chama Destrutiva',
    typicalObjects: ['paz', 'paixão', 'tédio', 'intensidade'],
    starterSignals: ['tenho paz mas falta-me vida', 'é uma loucura mas sinto-me vivo(a)'],
    exclusionHints: ['indiferença perante a intensidade emocional'],
  },
  autonomia_vs_pertenca: {
    id: 'autonomia_vs_pertenca',
    publicLabel: 'Autonomia vs Pertença',
    internalLabel: 'Dilema entre ser Autónomo ou Pertencer a um Grupo/Relação',
    typicalObjects: ['independência', 'solidão', 'nós', 'eu'],
    starterSignals: ['se eu for eu mesmo perco-os', 'se me adapto perco-me a mim'],
    exclusionHints: ['equilíbrio saudável entre si e os outros'],
  }
};
