// src/services/narrativeSynthesisEngine.ts

export interface CrossSignalsPayload {
    dominantAxis?: string | null;
    secondaryAxis?: string | null;
    manifestContext?: string | null;
    defenseMechanism?: string | null;
}

export interface NarrativeOutput {
    superficie: string;
    simbolismo: string;
    roubo: string;
    nucleo: string;
    sintese: string;
}

export function generateNarrative(payload: CrossSignalsPayload, isNebula: boolean): NarrativeOutput {
    if (isNebula || !payload.dominantAxis) {
        return {
            superficie: "À superfície, o teu aperto parece focar-se em várias frentes ao mesmo tempo: queixas-te tanto da base prática como do cansaço ou da falta de orientação clara.",
            simbolismo: "Há sinais de que a dispersão tática serve muitas vezes como defesa: ao tentar resolver vários os focos secundários ao mesmo tempo, evitas olhar de frente para o problema estrutural de fundo.",
            roubo: "Ao direcionares esforço para múltiplas insatisfações simultâneas, perdes a energia que seria precisa para tomar uma decisão que mudasse o cenário de raiz.",
            nucleo: "O núcleo do problema pode estar menos no acumular de azares, e mais numa exaustão tão grande que já te dificultou a intuição para priorizar o que dói mais.",
            sintese: "Combater em muitas pequenas batalhas esconde a enorme estagnação onde tudo acontece."
        };
    }

    const dominantAxis = payload.dominantAxis as string;
    const secondaryAxis = payload.secondaryAxis;
    
    // CAMADA 1: SUPERFÍCIE (Contexto primário)
    let sup = "";
    if (dominantAxis === 'meios' || dominantAxis === 'apoio') {
        sup = "À superfície, o teu relato aponta para uma falta crassa de fundo prático ou relacional. Sentes que o ambiente imediato te exige mais do que aquilo que é capaz de sustentar.";
    } else if (dominantAxis === 'liberdade') {
        sup = "De forma imediata, o obstáculo parece ser vivido como um excesso de dever ou confinamento. A sensação visível é a de estares amarrado às expectativas ou aos contextos em que operaste.";
    } else if (dominantAxis === 'energia' || dominantAxis === 'direcao' || dominantAxis === 'vida') {
        sup = "À superfície, o problema pode estar a despontar como uma sensação de vida adiada ou vivida em piloto automático. O peso visível foca-se na enorme exaustão ou na falta do sentido mínimo das direções a tomar.";
    }

    // CAMADA 2: SIMBOLISMO LATENTE (A Leitura de Fundo)
    let simb = "";
    if (dominantAxis === 'meios' && secondaryAxis === 'liberdade') {
        simb = "Há sinais de que o problema não pesa só pelo que impede logicamente. Por vezes, quando a falta de margem material concentra todas as atenções, também ajuda a adiar silenciosamente perguntas difíceis sobre a própria liberdade de escolha.";
    } else if (dominantAxis === 'apoio' && secondaryAxis === 'energia') {
        simb = "Nas entrelinhas, pode não ser apenas falta provisória de força. Este desgaste faz-se notar quando o hábito de assumir cargas alheias sem exigir retaguarda atinge o seu limite.";
    } else if (dominantAxis === 'direcao' && secondaryAxis === 'vida') {
        simb = "A estagnação costuma fixar a atenção na desorientação como forma natural de conforto. A hesitação constante e o impasse de rumo por vezes instilam cansaço para evitar lidar com a possibilidade de errar.";
    } else {
        simb = `No pano de fundo, há a hipótese de o factor ${dominantAxis} estar cruzado com hesitações mais antigas. Quando o prático ocupa o dia a dia, fica mais fácil não olhar para o cansaço no próprio espaço pessoal.`;
    }

    // CAMADA 3: ROUBO E DANOS (O Custo Real)
    let roub = "";
    if (['energia', 'apoio', 'vida'].includes(dominantAxis)) {
        roub = "O que esta paragem acaba por minar aos poucos, mesmo sem notares, é a paciência funcional. Acumula um custo na forma de impaciência fria frente aos que estão à tua volta.";
    } else {
        roub = "Na prática, uma dinâmica destas pode estar a encurtar não só o que tens, mas aquilo a que achas que tens direito. A conta final costuma ser uma quebra silenciosa na tua capacidade de aceitar risco.";
    }

    // CAMADA 4: NÚCLEO ORGANIZADOR (Conflito central)
    let nuc = "";
    if (dominantAxis === 'liberdade' || secondaryAxis === 'meios') {
        nuc = "Uma das hipóteses é que tenhas tolerado demasiada sobrecarga social ou material, esperando passivamente que houvesse uma retribuição desse esforço diário. Quando isso não acontece, o próprio instinto de iniciativa bloqueia.";
    } else if (dominantAxis === 'direcao' || dominantAxis === 'energia') {
        nuc = "O problema pode não estar apenas na falta de condições externas, mas no cansaço provocado por tentar lutar e manter tudo igual ao mesmo tempo.";
    } else {
        nuc = "Poderão existir sinais de que estar a aguardar intintivamente pela circunstância perfeita acabe por travar os passos reais, levando-te a suspender respostas essenciais com receio de fazer colapsar o pouco que tens.";
    }

    // CAMADA 5: SÍNTESE DO RECONHECIMENTO
    let sint = "";
    if (dominantAxis === 'meios' && secondaryAxis === 'liberdade') {
        sint = "Parte do desgaste pode vir não das tuas paredes logísticas, mas do esforço contínuo para suportar o peso.";
    } else if (dominantAxis === 'apoio' && secondaryAxis === 'energia') {
        sint = "Quando o fardo partilhado é suportado por um só, a apatia natural transforma uma dedicação numa fronteira hostil.";
    } else if (dominantAxis === 'direcao' && secondaryAxis === 'vida') {
        sint = "O custo de adiar os cortes para não sangrar é a perda lenta da sensibilidade à própria respiração.";
    } else {
        sint = "O maior dreno pode ser o mero cansaço crónico de estar tenso a tolerar um espaço que já deverias ter largado.";
    }

    return {
        superficie: sup,
        simbolismo: simb,
        roubo: roub,
        nucleo: nuc,
        sintese: sint
    };
}
