import { ReportGenerationInput } from './types';

// Helper to check domains
function hasDomain(input: ReportGenerationInput, domainId: string): boolean {
  return input.caseRealityMap.dominantDomain === domainId || 
         input.caseRealityMap.secondaryDomains.includes(domainId as any);
}

// Omission/Inclusion checks to prevent empty or placeholder sections
export function shouldIncludeExecutiveSummary(input: ReportGenerationInput): boolean {
  return input.caseRealityMap.confidenceLevel !== 'low' && Boolean(input.caseRealityMap.dominantDomain);
}

export function shouldIncludeDominantNow(input: ReportGenerationInput): boolean {
  return Boolean(input.caseRealityMap.dominantDomain);
}

export function shouldIncludeWhatBlocks(input: ReportGenerationInput): boolean {
  return input.caseRealityMap.supportingEvidence.some(f => f.signalType === 'constraint' || f.signalType === 'cost_of_change');
}

export function shouldIncludeWhatHurtsMost(input: ReportGenerationInput): boolean {
  return input.caseRealityMap.supportingEvidence.some(f => f.signalType === 'pain');
}

export function shouldIncludeWhatIsDelayed(input: ReportGenerationInput): boolean {
  return hasDomain(input, 'futuro_vida_adiada') || 
         input.caseRealityMap.supportingEvidence.some(f => f.domain === 'futuro_vida_adiada' && f.signalType === 'pain');
}

export function shouldIncludeCentralVsContextual(input: ReportGenerationInput): boolean {
  return input.caseFingerprint.topDomains.length >= 2;
}

export function shouldIncludeValidated(input: ReportGenerationInput): boolean {
  return input.reportContext.validatedFacts.length > 0;
}

export function shouldIncludeLessCertain(input: ReportGenerationInput): boolean {
  return input.reportContext.inconclusiveAreas.length > 0 || input.contradictionResults.some(r => r.unresolved);
}

// Domain-specific blocks
export function shouldIncludeAutonomyMarginSpace(input: ReportGenerationInput): boolean {
  return hasDomain(input, 'financas_margem') || hasDomain(input, 'habitacao_espaco_autonomia');
}

export function shouldIncludeBondAndDisplacement(input: ReportGenerationInput): boolean {
  return hasDomain(input, 'relacao_vinculo_formal') || hasDomain(input, 'centro_afetivo_deslocado');
}

export function shouldIncludeGuiltPrudenceChange(input: ReportGenerationInput): boolean {
  return hasDomain(input, 'culpa_remorso_omissao') || hasDomain(input, 'corpo_tensao_alerta');
}

export function shouldIncludeRecognitionFormulations(input: ReportGenerationInput): boolean {
  return input.caseFingerprint.dominantNarrativeShape !== 'fragmented' && 
         input.caseRealityMap.confidenceLevel === 'high';
}

export function shouldIncludePrudentClosing(input: ReportGenerationInput): boolean {
  return true; // Always include a grounded closing
}
