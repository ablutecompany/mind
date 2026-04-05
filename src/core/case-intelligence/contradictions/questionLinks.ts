import { ruleCatalog } from './ruleCatalog';
import { ContradictionRule } from './types';

// Helps extract the right questions to inject into the pool based on dominant domains
export function getContradictorQuestionsForDomain(domain: string): string[] {
  const rules = ruleCatalog.filter(r => r.targetDomain === domain);
  return rules.flatMap(r => r.contradictionQuestionIds);
}

export function getRuleForQuestion(questionId: string): ContradictionRule | undefined {
  return ruleCatalog.find(r => r.contradictionQuestionIds.includes(questionId));
}
