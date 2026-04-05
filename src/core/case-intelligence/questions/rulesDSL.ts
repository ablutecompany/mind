import { QuestionAskContext } from './types';

export function evaluateRule(rule: string, context: QuestionAskContext): boolean {
  const [operator, ...rest] = rule.split(':');
  const value = rest.join(':');

  switch (operator) {
    case 'activeDomain':
      if (value.startsWith('any(') && value.endsWith(')')) {
        const domains = value.slice(4, -1).split(',');
        return domains.some(d => context.activeDomains.includes(d));
      }
      return context.activeDomains.includes(value);

    case 'dominantDomainIs':
      return context.currentDominantDomain === value;

    case 'confidenceBelow':
      if (value === 'high') return context.currentConfidenceLevel !== 'high';
      if (value === 'medium') return context.currentConfidenceLevel === 'low';
      return false;

    case 'uncertaintyHas':
      return context.uncertaintyFlags.includes(value);

    case 'notAsked':
      return !context.askedQuestionIds.includes(value);

    case 'notClusterRecent':
      // Simplified: true if cluster NOT in the last N
      // Exact calculation happens in Eligibility core, but rule DSL handles basic checks
      return !context.askedSemanticClusters.includes(value);

    case 'roundAtLeast':
      return context.round >= parseInt(value, 10);

    case 'roundAtMost':
      return context.round <= parseInt(value, 10);

    case 'hasEvidence':
      return context.evidenceLedgerSummary.includes(value);

    case 'lacksEvidence':
      return !context.evidenceLedgerSummary.includes(value);

    case 'rejectedDomainNot':
      return !context.rejectedDomains.includes(value);

    default:
      console.warn(`[RulesDSL] Unknown operator: ${operator} in rule ${rule}`);
      return true; // Unknown rules pass by default to prevent blocking on typos (or fail? For now pass)
  }
}

export function evaluateRuleListAll(rules: string[], context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  const reasons: string[] = [];
  let pass = true;

  for (const rule of rules) {
    if (!evaluateRule(rule, context)) {
      pass = false;
      reasons.push(`Failed rule: ${rule}`);
    }
  }

  return { pass, reasons };
}

export function evaluateRuleListNone(rules: string[], context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  const reasons: string[] = [];
  let pass = true;

  for (const rule of rules) {
    if (evaluateRule(rule, context)) {
      pass = false;
      reasons.push(`Violated exclusion rule: ${rule}`);
    }
  }

  return { pass, reasons };
}
