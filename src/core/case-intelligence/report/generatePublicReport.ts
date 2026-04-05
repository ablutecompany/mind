import { ReportGenerationInput, PublicReport, PublicReportSection } from './types';
import * as Rules from './sectionRules';
import * as Builders from './sentenceBuilders';

export function generatePublicReport(input: ReportGenerationInput): PublicReport {
  const sections: PublicReportSection[] = [];

  // 1. Executive Summary
  if (Rules.shouldIncludeExecutiveSummary(input)) {
    sections.push({
      id: 'resumo_executivo',
      heading: 'Sumário Executivo',
      paragraphs: Builders.buildExecutiveSummary(input)
    });
  }

  // 2. Dominant Domain Core
  if (Rules.shouldIncludeDominantNow(input)) {
    sections.push({
      id: 'domina_neste_momento',
      heading: 'O Que Domina Neste Momento',
      paragraphs: Builders.buildDominantDomainParagraph(input)
    });
  }

  // 3. What Blocks
  if (Rules.shouldIncludeWhatBlocks(input)) {
    sections.push({
      id: 'o_que_prende',
      heading: 'O Muro Prático',
      paragraphs: Builders.buildConstraintParagraph(input)
    });
  }

  // 4. What Hurts Most
  if (Rules.shouldIncludeWhatHurtsMost(input)) {
    sections.push({
      id: 'o_que_doi_mais',
      heading: 'O Ponto de Dor',
      paragraphs: Builders.buildPainParagraph(input)
    });
  }

  // 5. What is Delayed
  if (Rules.shouldIncludeWhatIsDelayed(input)) {
    sections.push({
      id: 'o_que_esta_adiado',
      heading: 'Vida em Suspensão',
      paragraphs: Builders.buildDelayParagraph(input)
    });
  }

  // 6. Validated Findings
  if (Rules.shouldIncludeValidated(input)) {
    sections.push({
      id: 'validado',
      heading: 'Elementos Validados da Sessão',
      paragraphs: Builders.buildValidatedFindings(input)
    });
  }

  // 7. Uncertainties / Less Certain
  if (Rules.shouldIncludeLessCertain(input)) {
    sections.push({
      id: 'menos_seguro',
      heading: 'Áreas Inclusivas e Fricções',
      paragraphs: Builders.buildUncertainAreas(input)
    });
  }

  // 8. Specific Domain Appendices
  if (Rules.shouldIncludeAutonomyMarginSpace(input)) {
    sections.push({
      id: 'autonomia_margem_espaco',
      heading: 'Margem e Autonomia',
      paragraphs: Builders.buildAutonomyMarginSpaceSection(input)
    });
  }

  if (Rules.shouldIncludeBondAndDisplacement(input)) {
    sections.push({
      id: 'vinculo_permanencia_deslocacao_afetiva',
      heading: 'Vínculos e Lealdades',
      paragraphs: Builders.buildBondSection(input)
    });
  }

  if (Rules.shouldIncludeGuiltPrudenceChange(input)) {
    sections.push({
      id: 'culpa_prudencia_medo_mudanca',
      heading: 'O Custo da Decisão',
      paragraphs: Builders.buildGuiltPrudenceSection(input)
    });
  }

  // 9. Final Prudent Closing
  if (Rules.shouldIncludePrudentClosing(input)) {
    sections.push({
      id: 'nota_final_prudente',
      heading: 'Nota Final',
      paragraphs: Builders.buildPrudentClosing(input)
    });
  }

  return {
    title: 'Fotografia Prática da Sessão',
    sections: sections,
    summaryFlags: {
      confidenceLevel: input.caseRealityMap.confidenceLevel,
      dominantDomain: input.caseRealityMap.dominantDomain,
      hasStrongRecognitionLines: input.caseFingerprint.dominantNarrativeShape === 'concentrated',
      hasUncertainty: input.reportContext.inconclusiveAreas.length > 0 || input.contradictionResults.some(r => r.unresolved)
    }
  };
}
