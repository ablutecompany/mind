// src/facades/useInterventionFacade.ts
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { composeInterventionPlan } from '../services/practicalPlanComposer';
import { interventionPresenter, InterventionUIPayload } from '../presenters/interventionPresenter';

export function useInterventionFacade(
  synthesis: FinalPsychologicalSynthesis, 
  userHasPaid: boolean
): InterventionUIPayload {
  
  // 1. Gera logicamente os planos (core matemático)
  const { preview, fullPlan } = composeInterventionPlan(synthesis, userHasPaid);
  
  // 2. Apresenta o resultado pronto a ser consumido pelo React
  const uiPayload = interventionPresenter(preview, fullPlan);

  return uiPayload;
}
