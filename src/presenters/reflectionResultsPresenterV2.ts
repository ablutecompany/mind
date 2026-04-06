// src/presenters/reflectionResultsPresenterV2.ts

import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';

export interface V2UIPayload {
  headline: string;
  subHeadline: string;
  dynamicBands: {
    label: string;
    value: string;
    type: 'core' | 'defense' | 'conflict' | 'context';
  }[];
  isLowConfidence: boolean;
  ambiguityDisclaimer?: string;
}

export function reflectionResultsPresenterV2(synthesis: FinalPsychologicalSynthesis): V2UIPayload {
  
  const bands: V2UIPayload['dynamicBands'] = [];

  if (synthesis.dominantProblem) {
    bands.push({
      label: 'Núcleo Central Identificado',
      value: synthesis.dominantProblem,
      type: 'core'
    });
  }

  if (synthesis.primaryDefense) {
    bands.push({
      label: 'Mecanismo de Defesa',
      value: synthesis.primaryDefense,
      type: 'defense'
    });
  }

  if (synthesis.centralConflict) {
    bands.push({
      label: 'Tensão Estrutural',
      value: synthesis.centralConflict,
      type: 'conflict'
    });
  }

  if (synthesis.lifeFieldMostCharged) {
    bands.push({
      label: 'Área Simbólica de Maior Carga',
      value: synthesis.lifeFieldMostCharged.replace('_', ' '),
      type: 'context'
    });
  }

  return {
    headline: synthesis.latentTheme,
    subHeadline: synthesis.manifestTheme,
    dynamicBands: bands,
    isLowConfidence: synthesis.confidence === 'insufficient_to_close',
    ambiguityDisclaimer: synthesis.confidence === 'insufficient_to_close' 
      ? `A tua auto-observação tem contornos duplos. ${synthesis.unknowns.join('. ')}` 
      : undefined
  };
}
