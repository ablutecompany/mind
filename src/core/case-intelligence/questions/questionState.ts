export interface QuestionSessionLogItem {
  id: string;
  semanticCluster: string;
  round: number;
  ts: number;
}

export interface QuestionState {
  askedQuestionIds: string[];
  askedSemanticClusters: string[];
  askedPromptFingerprints: string[];
  shownOptionSetFingerprints: string[];
  askedQuestionsLog: QuestionSessionLogItem[];
}

export const createInitialQuestionState = (): QuestionState => ({
  askedQuestionIds: [],
  askedSemanticClusters: [],
  askedPromptFingerprints: [],
  shownOptionSetFingerprints: [],
  askedQuestionsLog: []
});

export function registerAskedQuestion(
  state: QuestionState, 
  questionId: string, 
  cluster: string, 
  promptFingerprint: string, 
  round: number
): QuestionState {
  return {
    ...state,
    askedQuestionIds: [...state.askedQuestionIds, questionId],
    askedSemanticClusters: [...state.askedSemanticClusters, cluster],
    askedPromptFingerprints: [...state.askedPromptFingerprints, promptFingerprint],
    askedQuestionsLog: [
      ...state.askedQuestionsLog, 
      { id: questionId, semanticCluster: cluster, round, ts: Date.now() }
    ]
  };
}

export function registerShownOptionSet(state: QuestionState, optionSetFingerprint: string): QuestionState {
  return {
    ...state,
    shownOptionSetFingerprints: [...state.shownOptionSetFingerprints, optionSetFingerprint]
  };
}

export function getRecentQuestionHistory(state: QuestionState, limit: number): QuestionSessionLogItem[] {
  return state.askedQuestionsLog.slice().reverse().slice(0, limit);
}

export function hasAskedQuestion(state: QuestionState, questionId: string): boolean {
  return state.askedQuestionIds.includes(questionId);
}

export function hasAskedSemanticClusterRecently(state: QuestionState, cluster: string, distanceMin: number): boolean {
  const reversedLogs = state.askedQuestionsLog.slice().reverse();
  const index = reversedLogs.findIndex(log => log.semanticCluster === cluster);
  if (index === -1) return false;
  return index < distanceMin; // e.g. distanceMin = 2 means it cannot have been asked in the last 2 questions
}

export function hasShownOptionSetRecently(state: QuestionState, optionSetFingerprint: string, limit: number = 1): boolean {
  const recent = state.shownOptionSetFingerprints.slice(-limit);
  return recent.includes(optionSetFingerprint);
}
