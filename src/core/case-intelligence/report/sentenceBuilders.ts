import { ReportGenerationInput } from './types';
import { DOMAIN_CATALOG } from '../domainCatalog';
import { DomainKey } from '../types';

function translateDomainToNoun(domainId: string): string {
  const catalogEntry = DOMAIN_CATALOG[domainId as DomainKey];
  if (!catalogEntry) return 'esta área';
  // Attempt to isolate the concrete object instead of the abstract label
  if (domainId === 'financas_margem') return 'a falta de margem financeira real';
  if (domainId === 'habitacao_espaco_autonomia') return 'a questão da casa e do espaço próprio';
  if (domainId === 'relacao_vinculo_formal') return 'a estrutura da relação atual';
  if (domainId === 'centro_afetivo_deslocado') return 'a ligação a uma pessoa fora da estrutura';
  if (domainId === 'familia_lealdade_papel') return 'o peso das lealdades familiares';
  if (domainId === 'trabalho_desgaste_reconhecimento') return 'o desgaste no trabalho e a inércia local';
  if (domainId === 'futuro_vida_adiada') return 'a sensação de adiamento prático da vida';
  if (domainId === 'culpa_remorso_omissao') return 'o peso da culpa sobre terceiros na hora de decidir';
  return catalogEntry.publicLabel;
}

export function buildExecutiveSummary(input: ReportGenerationInput): string[] {
  const dom = input.caseRealityMap.dominantDomain;
  if (!dom) return ["A recolha de dados não conseguiu isolar um problema dominante claro."];

  const objNoun = translateDomainToNoun(dom);
  const sentences: string[] = [];

  sentences.push(`O que mais pesa aqui parece estar centrado em: ${objNoun}.`);
  
  const contradictionsForDomain = input.contradictionResults.filter(c => c.targetDomain === dom);
  const survived = contradictionsForDomain.some(c => c.survived);
  
  if (survived) {
    sentences.push(`Esta hipótese foi testada contra outras possibilidades e manteve a sua centralidade. Não parece ser apenas uma fachada para outro medo.`);
  }

  return sentences;
}

export function buildDominantDomainParagraph(input: ReportGenerationInput): string[] {
  const dom = input.caseRealityMap.dominantDomain;
  if (!dom) return [];

  const sentences = [];
  const painFacts = input.caseRealityMap.supportingEvidence.filter((f: any) => f.domain === dom && f.signalType === 'pain');
  
  if (painFacts.length > 0) {
    sentences.push(`Este ponto não aparece como um mero detalhe periférico. Surge como a ferida prática central que organiza a estagnação atual.`);
  }

  const contradiction = input.contradictionResults.find(c => c.targetDomain === dom);
  if (contradiction && contradiction.weakened && !contradiction.survived) {
    sentences.push(`Contudo, há sinais de que esta justificação pode estar a servir de contentor ou álibi para um bloqueio ainda mais profundo.`);
  }

  return sentences;
}

export function buildConstraintParagraph(input: ReportGenerationInput): string[] {
  const constraints = input.caseRealityMap.supportingEvidence.filter((f: any) => f.signalType === 'constraint');
  if (constraints.length === 0) return [];

  return [
    `Há uma estrutura a prender as pernas neste momento. A imobilidade não vem de indecisão abstrata, mas do seguinte limite logístico: constrangimentos validados em ${Array.from(new Set(constraints.map(c => translateDomainToNoun(c.domain)))).join(' e ')}.`
  ];
}

export function buildPainParagraph(input: ReportGenerationInput): string[] {
  const pains = input.caseRealityMap.supportingEvidence.filter((f: any) => f.signalType === 'pain');
  if (pains.length === 0) return [];

  return [
    `A erosão diária está mapeada. O que corrói a energia do dia a dia está diretamente ligado a este sector: ${translateDomainToNoun(pains[0].domain)}.`
  ];
}

export function buildDelayParagraph(input: ReportGenerationInput): string[] {
  const fut = input.caseRealityMap.supportingEvidence.filter((f: any) => f.domain === 'futuro_vida_adiada');
  if (fut.length === 0) return [];

  return [
    `A sensação de vida congelada é evidente. Há um adiamento real, onde as escolhas adultas estão em suspensão ativa à espera de viabilidade ou coragem.`
  ];
}

export function buildValidatedFindings(input: ReportGenerationInput): string[] {
  const fDocs = input.reportContext.validatedFacts;
  if (fDocs.length === 0) return [];

  return [
    `Ouvimos afirmações que atestam as seguintes realidades operacionais:`,
    ...fDocs.map((f: any) => `- ${f}`)
  ];
}

export function buildUncertainAreas(input: ReportGenerationInput): string[] {
  const lines: string[] = [];
  input.reportContext.inconclusiveAreas.forEach((inc: any) => {
    lines.push(`Área sem firmeza absoluta: ${inc}`);
  });
  input.contradictionResults.filter(r => r.unresolved).forEach(r => {
    lines.push(`Há sinais contraditórios sobre ${translateDomainToNoun(r.targetDomain)}: o utente queixa-se disto mas também mostra resistência em abandonar este elo mesmo se as condições fossem perfeitas.`);
  });
  return lines;
}

// Domínios singulares
export function buildAutonomyMarginSpaceSection(input: ReportGenerationInput): string[] {
  return [`A ausência de margem financeira ou de parede física própria atua aqui como âncora material, não como sintoma mental.`];
}

export function buildBondSection(input: ReportGenerationInput): string[] {
  return [`A relação está a operar em modo de contenção. Mantém-se por estrutura ou culpa, mais do que por vitalidade relacional.`];
}

export function buildGuiltPrudenceSection(input: ReportGenerationInput): string[] {
  return [`A prudência passou de planeamento para paralisia ativa. O medo do impacto nos outros lidera as obrigações e dita a inércia.`];
}

export function buildPrudentClosing(input: ReportGenerationInput): string[] {
  if (input.caseRealityMap.confidenceLevel === 'high') {
    return [
      `A fotografia está estabilizada. O núcleo deste caso tem trações materiais claras que obrigam a decisões práticas na frente identificada, antes de apelos puramente introspetivos.`
    ];
  } else {
    return [
      `A fotografia ainda contém ruído e defesas cruzadas. É necessário continuar a explorar a diferença entre o que dói no imediato e a fundação real que causa esse abalo.`
    ];
  }
}
