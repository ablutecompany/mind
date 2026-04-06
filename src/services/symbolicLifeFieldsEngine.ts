// src/services/symbolicLifeFieldsEngine.ts
import { 
  LifeFieldId, 
  LatentAxisId, 
  SymbolicActivation, 
  SymbolicScanResult 
} from '../contracts/symbolicLifeFieldTypes';
import { WideScanResult } from '../contracts/inferenceTypes';

export interface SymbolicEvidence {
  fieldId: LifeFieldId;
  axisTriggered: LatentAxisId;
  weight: number;
  linkedCoreProblem?: string; // which problem does this symbolise?
}

export function symbolicLifeFieldsScan(
  wideScanInput: WideScanResult, 
  symbolicEvidence: SymbolicEvidence[]
): SymbolicScanResult {
  
  const fieldActivations: Record<LifeFieldId, SymbolicActivation> = {} as any;
  const coreReinforcements: Record<string, number> = {};

  // Aggregate Evidence
  symbolicEvidence.forEach(ev => {
    if (!fieldActivations[ev.fieldId]) {
      fieldActivations[ev.fieldId] = {
        fieldId: ev.fieldId,
        latentAxes: [],
        weight: 0,
        associatedCoreProblems: []
      };
    }

    const field = fieldActivations[ev.fieldId];
    field.weight += ev.weight;
    
    if (!field.latentAxes.includes(ev.axisTriggered)) {
      field.latentAxes.push(ev.axisTriggered);
    }

    if (ev.linkedCoreProblem) {
      if (!field.associatedCoreProblems.includes(ev.linkedCoreProblem)) {
        field.associatedCoreProblems.push(ev.linkedCoreProblem);
      }
      
      // Reinforce the core problem using the symbolic weight
      // If the wide scan already suspected this, give it a bump
      coreReinforcements[ev.linkedCoreProblem] = (coreReinforcements[ev.linkedCoreProblem] || 0) + ev.weight;
    }
  });

  const activeFields = Object.values(fieldActivations)
    .filter(f => f.weight > 0)
    .sort((a, b) => b.weight - a.weight);

  const dominantField = activeFields.length > 0 && activeFields[0].weight >= 1.0 
    ? activeFields[0].fieldId 
    : null;

  const dominantAxes = dominantField 
    ? activeFields[0].latentAxes 
    : [];

  // Apply reinforcements based on Wide Scan Status (e.g. contextualizing suspects)
  wideScanInput.topSuspects.forEach(suspect => {
    if (!coreReinforcements[suspect.id]) {
      // Penalty: If a top suspect has NO symbolic anchoring, it loses strength
      coreReinforcements[suspect.id] = -0.5;
    }
  });

  return {
    activeFields,
    dominantField,
    dominantAxes,
    coreProblemReinforcements: coreReinforcements
  };
}
