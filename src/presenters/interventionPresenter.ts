// src/presenters/interventionPresenter.ts
import { InterventionPreviewPayload, FullInterventionPayload } from '../contracts/interventionTypes';

export interface InterventionUIPayload {
  teaserCard: {
    title: string;
    reading: string;
    immediateAction: string;
    hasLockedContent: boolean;
  };
  fullBoard?: {
    diagnosisHeadline: string;
    roadmapSteps: { label: string; text: string }[];
    warnings: string[];
    closingMantra: string;
  };
}

export function interventionPresenter(
  preview: InterventionPreviewPayload, 
  fullPlan: FullInterventionPayload | null
): InterventionUIPayload {
  
  const payload: InterventionUIPayload = {
    teaserCard: {
      title: "Ponto de Fricção Primário",
      reading: preview.previewReading,
      immediateAction: `Ação para as próximas 48h: ${preview.previewAction}`,
      hasLockedContent: preview.hasMoreLocked
    }
  };

  if (fullPlan && !preview.hasMoreLocked) {
    payload.fullBoard = {
      diagnosisHeadline: fullPlan.operationalReading,
      roadmapSteps: [
        { label: "Ações Práticas Rápidas", text: fullPlan.immediateActions.join(' | ') },
        { label: "Médio Prazo", text: fullPlan.mediumTermReorganization.join(' | ') }
      ],
      warnings: fullPlan.likelyErrors,
      closingMantra: fullPlan.finalSynthesisLine
    };
  }

  return payload;
}
