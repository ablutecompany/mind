// src/services/narrativeSynthesisEngine.ts

export interface NarrativeOutput {
    superficie: string;
    simbolismo: string;
    roubo: string;
    sintese: string;
}

const NARRATIVE_DICTIONARY: Record<string, NarrativeOutput> = {
    'meios': {
        superficie: "O teu relato aponta de forma aguda para um entrave material ou logístico, como se a infraestrutura base da tua vida não te oferecesse margem de respiração constante.",
        simbolismo: "No entanto, o dinheiro ou a logística costumam atuar apenas como o 'bode expiatório' palpável. O que esta ausência de meios simboliza na verdade é um medo brutal de exposição e de contingência: a sensação de que não te podes defender do impacto cru da vida.",
        roubo: "Este bloqueio não te tira apenas 'poder de compra' ou recursos logísticos; rouba-te a tua permissão interna para ditar os termos de ação. Faz com que assumas um estado de contenção tática permanente.",
        sintese: "A necessidade mecânica está a amputar a tua autonomia real."
    },
    'apoio': {
        superficie: "Transparece da tua avaliação um vazio severo na base afetiva ou na rede de contenção, indicando que te sentes frequentemente a carregar a carga a solo.",
        simbolismo: "Essa ausência de retaguarda não é apenas uma questão de 'quem te ajuda'; simboliza a privação do direito primitivo de ceder. Estás a operar sob um imperativo não-verbal de que colapsar ou quebrar é estritamente proibido.",
        roubo: "Isso custa-te o relaxamento do sistema nervoso. O que esta falta de apoio estrutural te rouba é o direito à recuperação natural, mantendo-te num hyper-vigilante 'survival mode' mascarado de responsabilidade funcional.",
        sintese: "O peso invisível do isolamento estrutural dita o esgotamento futuro."
    },
    'liberdade': {
        superficie: "A forma como lês a tua tensão aponta para uma opressão grave sobre a tua capacidade de escolher, indicando um espartilho rígido imposto pelo dever, contexto ou outras pessoas.",
        simbolismo: "Trata-se do clássico sacrifício do indivíduo pelo guião. Esta falha de liberdade mascara uma capitulação silenciosa: algures pelo caminho, compraste a estabilidade ou a aceitação dos outros com a moeda da tua própria margem vital.",
        roubo: "Não é apenas a agenda preenchida; é a ausência de espaço branco no cérebro. Esta falta te rouba o espaço da descoberta orgânica e do erro produtivo. Deixaste de viver para passar apenas a 'fazer uma gestão de crise contínua'.",
        sintese: "O excesso de controlo externo devorou a força de instinto natural."
    },
    'energia': {
        superficie: "A denúncia física é avassaladora: apontas para um desgaste prolongado, manifestando uma exaustão crassa na vontade prática ou mental de arranque.",
        simbolismo: "O cansaço aqui deixou de ser subproduto do esforço comum e passou a ser o sintoma direto de atrito sistemático. Representa um fosso fatal entre a quantidade energética que queimas para aturar a tua realidade e a quantidade ínfima que o teu ecossistema te devolve como recompensa intrínseca.",
        roubo: "A perda não é temporária. Este tipo de quebra basal queima a audácia. Se a energia não voltar, dás por ti a adiar as únicas decisões macro que te poderiam efetivamente libertar da origem desse próprio desgaste.",
        sintese: "Uma contabilidade relacional e estrutural visceralmente falida entre dar e receber."
    },
    'direcao': {
        superficie: "Assinalas um imobilismo não por falta de vontade bruta, mas por nevoeiro agudo na antecipação civil do caminho ou da próxima etapa correta a tomar.",
        simbolismo: "A 'falta de rumo' é muitas vezes, no plano latente, o nome educado que se dá à paralisia que previne lutos pesados. Pode significar o pânico face à responsabilidade que as escolhas irreversíveis carregam. A neblina é um abrigo, embora frustrante.",
        roubo: "Este tempo arrastado impede-te de solidificar referências empíricas. O custo é estático: rouba-te a hipótese de cometer erros espetaculares ou sucessos retumbantes, retendo-te na prisão confortável, mas inerte, do 'talvez'.",
        sintese: "A indefinição serve muitas vezes como escudo contra o terror de errar."
    },
    'vida': {
        superficie: "Reclamas a falta primária do pulsar, onde o problema não parece ser logístico nem direcional, mas antes a denúncia de uma existência que se desenrola no 'piloto automático', sem sal ou fogo.",
        simbolismo: "Este é o núcleo da apatia existencial provocada pelo triunfo desmedido do funcional. A máquina de produzir/sobreviver esmagou a pessoa orgânica. Representa uma vida adiada, entregue aos trâmites sem devolução afetiva profunda.",
        roubo: "Isto devora a singularidade. Estás a sofrer de alienação e distanciamento mecânico daquilo que antes era combustível vibrante, privando-te da sensação imperativa que define a posse legítima dos teus próprios dias.",
        sintese: "A excelência de sobreviver silenciou o assombro da existência real."
    }
};

const NEBULA_NARRATIVE: NarrativeOutput = {
    superficie: "As tuas respostas colidem furiosamente entre múltiplas frentes, com queixas desde limites práticos até ruturas de energia. O teu sensor espalha luz para todos os lados sem fixar foco.",
    simbolismo: "Esta dispersão extrema costuma ser a evidência irrefutável do 'Efeito Incêndio Base': o alarme soa em todas as dependências porque é o alicerce absoluto que está estruturalmente comprometido. A névoa defende-te de descer ao porão, forçando uma miopia na gestão frenética das manifestações de superfície em vez da causa.",
    roubo: "Enquanto atirares baldes de água avulsamente a pequenos focos diários, perdes toda a capacidade intelectual e vital de orquestrar a reforma massiva da arquitetura geral da tua vivência.",
    sintese: "Lutar em 5 ringues minúsculos impede a perceção da arena colossal em degradação."
};

export function generateNarrative(dominantAxis: string | null, isNebula: boolean): NarrativeOutput {
    if (isNebula || !dominantAxis) return NEBULA_NARRATIVE;
    
    return NARRATIVE_DICTIONARY[dominantAxis.toLowerCase()] || NEBULA_NARRATIVE;
}
