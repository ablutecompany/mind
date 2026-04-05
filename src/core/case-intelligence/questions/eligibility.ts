import { QuestionNode, QuestionAskContext, QuestionSelectionResult } from './types';
import { evaluateRuleListAll, evaluateRuleListNone } from './rulesDSL';
import { buildPromptFingerprint } from './promptFingerprint';
import { areTooSimilarPrompts, areTooSimilarOptionSets } from './similarity';

export function evaluateAskOnlyIf(question: QuestionNode, context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  if (!question.askOnlyIf || question.askOnlyIf.length === 0) return { pass: true, reasons: [] };
  return evaluateRuleListAll(question.askOnlyIf, context);
}

export function evaluateExclusionRules(question: QuestionNode, context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  if (!question.exclusionRules || question.exclusionRules.length === 0) return { pass: true, reasons: [] };
  return evaluateRuleListNone(question.exclusionRules, context);
}

export function evaluateDistanceRule(question: QuestionNode, context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  const { lastQuestions } = context;
  const recentHistory = lastQuestions.slice(-question.askAfterDistanceMin);
  
  const hasRecentCluster = recentHistory.some(q => q.semanticCluster === question.semanticCluster);
  if (hasRecentCluster) return { pass: false, reasons: [`Cluster ${question.semanticCluster} was used within the minimum distance of ${question.askAfterDistanceMin}`] };

  // Also check similarity blocker intersection
  if (question.similarityBlockers && question.similarityBlockers.length > 0) {
    const blockedClusterRecently = recentHistory.some(q => question.similarityBlockers.includes(q.semanticCluster));
    if (blockedClusterRecently) {
      return { pass: false, reasons: [`A similar cluster (blocked by similarityBlockers) was used recently.`] };
    }
  }

  return { pass: true, reasons: [] };
}

export function evaluateSimilarityRule(
  question: QuestionNode, 
  context: QuestionAskContext, 
  library: QuestionNode[]
): { pass: boolean, reasons: string[] } {
  
  const fingerprint = buildPromptFingerprint(question.prompt);
  if (context.askedPromptFingerprints.includes(fingerprint)) {
    return { pass: false, reasons: ['Exact prompt fingerprint has already been shown.'] };
  }

  // Find recent library questions that were actually asked
  const recentAskedNodes = context.lastQuestions
    .slice(-3) // Check against the latest 3
    .map(log => library.find(n => n.id === log.id))
    .filter((n): n is QuestionNode => n !== undefined);

  for (const asked of recentAskedNodes) {
    const sameFunctionType = question.functionType === asked.functionType;
    if (areTooSimilarPrompts(question.prompt, asked.prompt, sameFunctionType)) {
      if (!(question.shouldTriggerReentry && question.askAfterDistanceMin > 2)) { // allow reentry if rules declare it explicitly
        return { pass: false, reasons: [`Prompt is lexically too similar to recently asked: ${asked.id}`] };
      }
    }
    
    if (areTooSimilarOptionSets(question.options, asked.options)) {
      return { pass: false, reasons: [`Option set is too similar to the one shown in: ${asked.id}`] };
    }
  }

  return { pass: true, reasons: [] };
}

export function evaluateDomainRelevance(question: QuestionNode, context: QuestionAskContext): { pass: boolean, reasons: string[] } {
  if (context.rejectedDomains.includes(question.primaryDomain)) {
    return { pass: false, reasons: [`Primary domain ${question.primaryDomain} is explicitly rejected`] };
  }

  // Could add more advanced relevance checks based on active domains vs primaryDomain
  return { pass: true, reasons: [] };
}

export function isQuestionEligible(
  question: QuestionNode, 
  context: QuestionAskContext, 
  library: QuestionNode[]
): { pass: boolean, reasons: string[] } {
  
  if (!question.active) return { pass: false, reasons: ['Question is inactive'] };
  
  const checks = [
    evaluateDomainRelevance(question, context),
    evaluateAskOnlyIf(question, context),
    evaluateExclusionRules(question, context),
    evaluateDistanceRule(question, context),
    evaluateSimilarityRule(question, context, library)
  ];

  const failedChecks = checks.filter(c => !c.pass);
  if (failedChecks.length > 0) {
    return { 
      pass: false, 
      reasons: failedChecks.flatMap(c => c.reasons) 
    };
  }

  return { pass: true, reasons: [] };
}

export function selectEligibleQuestions(library: QuestionNode[], context: QuestionAskContext): QuestionSelectionResult {
  const eligible: QuestionNode[] = [];
  const blocked: Array<{ questionId: string, reasons: string[] }> = [];

  for (const q of library) {
    const result = isQuestionEligible(q, context, library);
    if (result.pass) {
      eligible.push(q);
    } else {
      blocked.push({ questionId: q.id, reasons: result.reasons });
    }
  }

  // Sort eligible questions by emotionalIntensity or other heuristics if desired...
  return { eligible, blocked };
}
