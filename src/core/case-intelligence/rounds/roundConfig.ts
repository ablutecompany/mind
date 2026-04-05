import { RoundId } from './types';

export const ROUND_OBJECTIVES: Record<RoundId, string[]> = {
  0: [
    'permission_set',
    'tone_set',
    'skip_safety_set'
  ],
  1: [
    '4_to_6_candidate_domains_identified',
    'first_real_objects_captured'
  ],
  2: [
    'top_2_or_3_domains_selected',
    'weak_domains_eliminated'
  ],
  3: [
    'dominant_hypothesis_tested',
    'at_least_one_contradiction_path_prepared'
  ],
  4: [
    'blockers_identified',
    'costs_of_change_and_staying_captured'
  ],
  5: [
    'center_rechecked_from_new_angle',
    'recognizability_risk_reduced'
  ],
  6: [
    'dominant_domain_closed_or_marked_uncertain',
    'dominant_problem_closed',
    'dominant_constraint_closed',
    'dominant_desire_closed',
    'dominant_conflict_closed'
  ]
};
