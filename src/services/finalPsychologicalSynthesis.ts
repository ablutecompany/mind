// src/services/finalPsychologicalSynthesis.ts
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { SymbolicScanResult } from '../contracts/symbolicLifeFieldTypes';
import { WideScanResult } from '../contracts/inferenceTypes';
import { DeepeningClusterOutput } from '../contracts/clusterDiscriminativeTypes';

export function synthesizePsychologicalProfile(
  wideScan: WideScanResult,
  symbolicScan: SymbolicScanResult,
  clusterDeepening: DeepeningClusterOutput
): FinalPsychologicalSynthesis {
  
  // 1. Establish the hierarchy from the deep cluster if available
  const dominantProblem = clusterDeepening.dominantProblem || (wideScan.topSuspects.length === 1 ? wideScan.topSuspects[0].id : null);
  const primaryDefense = clusterDeepening.primaryDefense;
  const centralConflict = clusterDeepening.centralConflict;
  const supportingProblem = clusterDeepening.supportingProblem;

  // 2. Determine Manifest vs Latent Themes
  // Manifest: Usually the symbolic field most charged, or the defense mechanism
  const manifestTheme = symbolicScan.dominantField 
    ? `Pressão sentida na área de ${symbolicScan.dominantField.replace('_', ' ')}` 
    : (primaryDefense ? `Comportamento focado em ${primaryDefense.replace('_', ' ')}` : "Temas práticos difusos");

  // Latent: The actual dominant core problem or central conflict
  let latentTheme = "Desconhecido";
  if (dominantProblem) {
    latentTheme = `Sofrimento ancorado em ${dominantProblem.replace('_', ' ')}`;
  } else if (centralConflict) {
    latentTheme = `Tensão gerada por ${centralConflict.replace('_', ' ')}`;
  } else if (wideScan.isAmbiguous) {
    latentTheme = "Múltiplas dores estruturais competem pela supressão do ego";
  }

  // 3. Confidence and Unknowns
  let confidence: 'insufficient_to_close' | 'rival_open' | 'dominant_probable' | 'dominant_strong' = 'dominant_strong';
  const unknowns: string[] = [];

  if (clusterDeepening.rivalHypothesisOpen && clusterDeepening.rivalHypothesisOpen.length > 0) {
    confidence = 'rival_open';
    unknowns.push(`Incapacidade de distinguir causa-efeito entre: ${clusterDeepening.rivalHypothesisOpen.join(' e ')}`);
  } else if (!dominantProblem && wideScan.topSuspects.length > 1) {
    confidence = 'insufficient_to_close';
    unknowns.push(`Sinais contraditórios ou mistura orgânica de sintomas`);
  } else if (wideScan.scanConfidence === 'low') {
     confidence = 'insufficient_to_close';
  } else if (dominantProblem && wideScan.scanConfidence === 'medium') {
     confidence = 'dominant_probable';
  }

  // Se tema latente e manifesto não tiverem distância dedutiva
  if (latentTheme === "Desconhecido") {
     unknowns.push("Falta de profundidade na análise sintomática para determinar a causa latente");
  }

  return {
    manifestTheme,
    latentTheme,
    dominantProblem,
    supportingProblem,
    primaryDefense,
    centralConflict,
    lifeFieldMostCharged: symbolicScan.dominantField,
    likelyVisibleBehaviors: clusterDeepening.evidenceSummary || [],
    confidence: confidence as any,
    rivalHypothesisOpen: clusterDeepening.rivalHypothesisOpen || null,
    unknowns
  };
}
