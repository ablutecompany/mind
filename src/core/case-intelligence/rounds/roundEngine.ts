import { SessionCaseState } from '../state/sessionCaseState';
import { QuestionState } from '../questions/questionState';
import { QuestionNode, QuestionSelectionResult } from '../questions/types';
import { selectEligibleQuestions } from '../questions/eligibility';
import { RoundId, RoundState, NextQuestionPlan } from './types';
import { ROUND_LIMITS } from './config';

export function getCurrentRound(state: RoundState): RoundId {
  return state.currentRound;
}

export function shouldAdvanceRound(state: RoundState): boolean {
  const limits = ROUND_LIMITS[state.currentRound];
  if (state.questionsAskedInRound >= limits.max) {
    return true; // Max reached, must advance
  }
  
  // Intelligent stopping rules if minimum is reached
  if (state.questionsAskedInRound >= limits.min) {
    // If goals are met early, we can advance
    // In a real flow, checking if dominantDomain is separated, etc.
    return true; 
  }
  return false;
}

export function advanceRound(state: RoundState): RoundState {
  if (state.currentRound >= 6) return state; // Terminate

  return {
    ...state,
    currentRound: (state.currentRound + 1) as RoundId,
    questionsAskedInRound: 0,
    roundGoalsMet: [] // Reset goals for new round
  };
}

export function getEligibleQuestionsForRound(
  round: RoundId, 
  questionState: QuestionState, // Map to QuestionAskContext via caller
  sessionState: SessionCaseState,
  library: QuestionNode[]
): QuestionSelectionResult {
  
  // Create QuestionAskContext from session state and question state
  const context = {
    round: round,
    askedQuestionIds: questionState.askedQuestionIds,
    askedSemanticClusters: questionState.askedSemanticClusters,
    askedPromptFingerprints: questionState.askedPromptFingerprints,
    shownOptionSetFingerprints: questionState.shownOptionSetFingerprints,
    activeDomains: sessionState.activeDomains,
    rejectedDomains: sessionState.rejectedDomains,
    currentDominantDomain: sessionState.caseRealityMap?.dominantDomain,
    currentTopDomains: sessionState.caseFingerprint?.topDomains || [],
    currentConfidenceLevel: sessionState.caseRealityMap?.confidenceLevel || 'low',
    uncertaintyFlags: sessionState.caseRealityMap?.uncertaintyFlags || [],
    evidenceLedgerSummary: sessionState.evidenceLedger.map(e => e.label), // simplified
    lastQuestions: questionState.askedQuestionsLog.slice(-5)
  };

  const eligibleRes = selectEligibleQuestions(library, context);
  
  // Pre-filter by strict function type logic depending on the round
  let candidatePool = eligibleRes.eligible;

  switch (round) {
    case 0:
      // Focus anchors
      candidatePool = candidatePool.filter(q => q.functionType === 'anchor' || q.functionType === 'screening');
      break;
    case 1:
      candidatePool = candidatePool.filter(q => q.functionType === 'screening' || q.functionType === 'discriminator');
      break;
    case 2:
      candidatePool = candidatePool.filter(q => q.functionType === 'discriminator');
      break;
    case 3:
      candidatePool = candidatePool.filter(q => q.functionType === 'validation' || q.functionType === 'contradictor');
      break;
    case 4:
      candidatePool = candidatePool.filter(q => ['blocker', 'cost_of_change', 'cost_of_staying', 'functioning'].includes(q.functionType));
      break;
    case 5:
      candidatePool = candidatePool.filter(q => q.functionType === 'reentry' || q.functionType === 'uncertainty_probe');
      break;
    case 6:
      candidatePool = candidatePool.filter(q => q.functionType === 'narrowing' || q.functionType === 'confidence_boost');
      break;
  }

  return { eligible: candidatePool, blocked: eligibleRes.blocked };
}

// ------ MIX AND BALANCING ALGORITHMS ------ //

function balanceCandidatesByMaskType(candidates: QuestionNode[], context: any): QuestionNode[] {
  if (candidates.length <= 1) return candidates;
  // If the last 2 questions had maskType "pratico", demote "pratico"
  const recentMasks = context.lastQuestions.slice(-2).map((qLog: any) => {
    const q = candidates.find(c => c.id === qLog.id); // This usually comes from the original library
    return q?.maskType;
  }).filter(Boolean);

  if (recentMasks.length === 2 && recentMasks[0] === recentMasks[1]) {
    const penalizedMask = recentMasks[0];
    return [...candidates].sort((a, b) => {
      if (a.maskType === penalizedMask && b.maskType !== penalizedMask) return 1;
      if (a.maskType !== penalizedMask && b.maskType === penalizedMask) return -1;
      return 0;
    });
  }
  return candidates;
}

function balanceCandidatesByFunctionType(candidates: QuestionNode[]): QuestionNode[] {
  // Can be used to distribute function types evenly within the allowed pool
  return candidates;
}

function penalizeRepeatedTone(candidates: QuestionNode[], lastIntensity: number): QuestionNode[] {
  // If last was intensity 5, prefer lower intensity 1-3
  if (lastIntensity >= 4) {
    return [...candidates].sort((a, b) => a.emotionalIntensity - b.emotionalIntensity);
  }
  return candidates;
}

function promoteConcreteDiscriminators(candidates: QuestionNode[]): QuestionNode[] {
  // Sorting higher strength signals to the top
  return [...candidates].sort((a, b) => b.expectedSignalStrength - a.expectedSignalStrength);
}

export function enforceRoundQuestionMix(round: RoundId, candidates: QuestionNode[], context: any): QuestionNode[] {
  let mixed = balanceCandidatesByFunctionType(candidates);
  mixed = balanceCandidatesByMaskType(mixed, context);
  mixed = promoteConcreteDiscriminators(mixed);
  
  if (context.lastQuestions.length > 0) {
    // Fake retrieve of last intensity for demo
    const lastIntensity = 3; 
    mixed = penalizeRepeatedTone(mixed, lastIntensity);
  }
  return mixed;
}

// ------ CORE SELECTION EXPORT ------ //

export function buildNextQuestionPlan(
  roundState: RoundState,
  questionState: QuestionState, 
  sessionState: SessionCaseState,
  library: QuestionNode[]
): NextQuestionPlan {

  // 1. Check early intelligent stop
  if (roundState.currentRound === 6 && roundState.questionsAskedInRound >= ROUND_LIMITS[6].min) {
    if (sessionState.caseRealityMap?.confidenceLevel === 'high') {
      return { questionId: null, round: roundState.currentRound, goal: 'Finish', reasoning: 'High confidence reached', shouldClose: true, closureReason: 'Map locked definitively' };
    }
  }

  // 2. Advance Round if limits met
  let currentRoundInfo = roundState;
  if (shouldAdvanceRound(currentRoundInfo)) {
    currentRoundInfo = advanceRound(currentRoundInfo);
    if (currentRoundInfo.currentRound > 6) {
      return { questionId: null, round: 6, goal: 'Limit reached', reasoning: 'Ran out of rounds', shouldClose: true, closureReason: 'Hard round limit' };
    }
  }

  // 3. Extract Candidates
  const res = getEligibleQuestionsForRound(currentRoundInfo.currentRound, questionState, sessionState, library);
  
  if (res.eligible.length === 0) {
    // Edge case - no questions left! Might need fallback or early exit
    return {
      questionId: null,
      round: currentRoundInfo.currentRound,
      goal: 'Find question',
      reasoning: 'Pool depleted entirely',
      shouldClose: true,
      closureReason: 'Exhausted question library for active restrictions'
    };
  }

  // 4. Mix and Prioritize
  const context = { lastQuestions: questionState.askedQuestionsLog };
  const orderedCandidates = enforceRoundQuestionMix(currentRoundInfo.currentRound, res.eligible, context);

  // 5. Select Top
  const selected = orderedCandidates[0];

  return {
    questionId: selected.id,
    round: currentRoundInfo.currentRound,
    goal: `Fulfilled objective priority round ${currentRoundInfo.currentRound}`,
    reasoning: `Selected function: ${selected.functionType} | Mask: ${selected.maskType} | Ex.Str: ${selected.expectedSignalStrength}`,
    shouldClose: false
  };
}
