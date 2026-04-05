import { QuestionAskContext } from './types';
import { BASE_QUESTION_LIBRARY } from './library/baseQuestionLibrary';
import { isQuestionEligible } from './eligibility';

export function explainWhyQuestionWasBlocked(questionId: string, context: QuestionAskContext): string[] {
  const library = BASE_QUESTION_LIBRARY;
  const question = library.find(q => q.id === questionId);
  if (!question) return ['Question not found in library'];

  const result = isQuestionEligible(question, context, library);
  if (result.pass) {
    return ['Question is actually eligible right now.'];
  }

  return result.reasons;
}

export function explainWhyQuestionWasEligible(questionId: string, context: QuestionAskContext): string {
  const library = BASE_QUESTION_LIBRARY;
  const question = library.find(q => q.id === questionId);
  if (!question) return 'Question not found in library';

  const result = isQuestionEligible(question, context, library);
  if (!result.pass) {
    return 'Question is NOT eligible right now.';
  }

  return `Eligible. All Domain, Rule, Similarity, and Distance checks passed.`;
}

export function listRecentlyUsedClusters(context: QuestionAskContext): string[] {
  return context.lastQuestions.map(q => q.semanticCluster);
}

export function listRecentlyUsedOptionFingerprints(context: QuestionAskContext): string[] {
  return context.shownOptionSetFingerprints.slice(-5);
}
