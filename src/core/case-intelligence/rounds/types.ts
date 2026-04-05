export type RoundId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface RoundState {
  currentRound: RoundId;
  questionsAskedInRound: number;
  roundGoalsMet: string[];
  roundUncertainty: string[];
  promotedDomains: string[];
  eliminatedDomains: string[];
}

export interface NextQuestionPlan {
  questionId: string | null;
  round: RoundId;
  goal: string;
  reasoning: string;
  shouldClose: boolean;
  closureReason?: string;
}
