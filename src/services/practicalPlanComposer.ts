// src/services/practicalPlanComposer.ts
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { runInterventionPreviewEngine } from './interventionPreviewEngine';
import { generateFullIntervention } from './fullInterventionEngine';
import { InterventionPreviewPayload, FullInterventionPayload } from '../contracts/interventionTypes';

export function composeInterventionPlan(
  synthesis: FinalPsychologicalSynthesis, 
  userHasPaid: boolean
): { preview: InterventionPreviewPayload, fullPlan: FullInterventionPayload | null } {
  
  const preview = runInterventionPreviewEngine(synthesis);
  
  if (!userHasPaid) {
    return {
      preview,
      fullPlan: null
    };
  }

  const fullPlan = generateFullIntervention(synthesis);
  preview.hasMoreLocked = false;

  return {
    preview,
    fullPlan
  };
}
