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
        sup = "O teu relato aponta à superfície para uma carência material, logística ou de amparo invisível, apontando para um ambiente que não te suporta ou exige demais de ti.";
    } else if (dominantAxis === 'liberdade') {
        sup = "Transparece uma leitura marcada por restrição ou dívida; a superfície do teu obstáculo é vivida como uma imposição e peso do dever face aos que te rodeiam.";
    } else if (dominantAxis === 'energia' || dominantAxis === 'direcao' || dominantAxis === 'vida') {
        sup = "A leitura primária reflete um desgaste lento, uma séria falta de orientação e o sentimento pesado de estar a viver simplesmente em 'piloto automático'.";
    }

    // CAMADA 2: SIMBOLISMO LATENTE (Cruzamento com eixo secundário ou primário)
    let simb = "";
    if (dominantAxis === 'meios' && secondaryAxis === 'liberdade') {
        simb = "No entanto, os fatores de logística costumam encobrir algo mais tático. Pode indicar que esse limite de meios simboliza a necessidade mecânica de manter controlo externo, servindo-te de justificação para não arriscares a dor da separação de contextos rígidos.";
    } else if (dominantAxis === 'apoio' && secondaryAxis === 'energia') {
        simb = "Mas essa ausência de retaguarda tem raízes. Sugere que assumiste repetidamente o guião de ser 'o pilar utilitário' e a falta de amparo é agora apenas a consequência previsível de nunca teres exigido reciprocidade.";
    } else if (dominantAxis === 'direcao' && secondaryAxis === 'vida') {
        simb = "Contudo, o nevoeiro e a indecisão não são falta de vontade. Simboliza muitas vezes o único porto defensivo disponível: a 'espera confortável' como casulo provisório contra o terror latente de tentares a vitalização e falhares rudemente.";
    } else {
        simb = `No plano mais profundo, há indícios de que esta limitação atua muitas vezes em silêncio como desculpa para não encarar uma mudança mais dura. Focar o desconforto em questões de ${dominantAxis.toUpperCase()} previne que assumas o abanão estrutural de base.`;
    }

    // CAMADA 3: ROUBO E DANOS (O Custo)
    let roub = "";
    if (['energia', 'apoio', 'vida'].includes(dominantAxis)) {
        roub = "O impacto deste circuito custa caro no dia a dia. O que isto te está a roubar, de facto, é a capacidade real de descanso e a empatia limpa pelas interações onde habitas.";
    } else {
        roub = "O que este modelo de tensão te rouba ativamente não é apenas dinheiro ou descanso; é a margem de erro. Faz com que encares a vida como se um movimento em falso provocasse um colapso imediato, roubando-te o ímpeto e autonomia.";
    }

    // CAMADA 4: NÚCLEO ORGANIZADOR (Conflito central)
    let nuc = "";
    if (dominantAxis === 'liberdade' || secondaryAxis === 'meios') {
        nuc = "Parece apontar para um conflito onde compraste estabilidade (amorosa, laboral ou funcional) através do sacrifício sistemático da tua jurisdição pessoal. A fatura chegou mas a devolução de valor faliu.";
    } else if (dominantAxis === 'direcao' || dominantAxis === 'energia') {
        nuc = "Tudo sugere um mecanismo de esvaziamento silencioso. O núcleo deste compasso é a dissonância entre o enorme investimento da tua parte para não cair, e a devolução minúscula que tal atrito orgânico entrega ao teu sentido real.";
    } else {
        nuc = "O núcleo organizador parece residir na ideia fixa de que tens de agir sempre na defensiva para que a estrutura não se desfaça, acabando sem margem interior para testar qualquer mudança temporal.";
    }

    // CAMADA 5: SÍNTESE DO RECONHECIMENTO
    let sint = "";
    if (dominantAxis === 'meios' && secondaryAxis === 'liberdade') {
        sint = "A submissão funcional tem servido tacitamente como escudo contra escolhas assustadoras.";
    } else if (dominantAxis === 'apoio' && secondaryAxis === 'energia') {
        sint = "O esgotamento silencioso é o tributo por carregar sozinho o que deveria ser partilhado ou devolvido.";
    } else if (dominantAxis === 'direcao' && secondaryAxis === 'vida') {
        sint = "A névoa mental parece ser um colete à prova de balas imperfeito num tempo não percorrido.";
    } else {
        sint = "O hábito de suportar o peso adormeceu a percepção de quem se era sem ele.";
    }

    return {
        superficie: sup,
        simbolismo: simb,
        roubo: roub,
        nucleo: nuc,
        sintese: sint
    };
}
