// src/services/branchDeepeningEngine.ts
import { SymbolicScanResult } from '../contracts/symbolicLifeFieldTypes';
import { WideScanResult } from '../contracts/inferenceTypes';
import { ClusterRivalHypothesisId } from '../contracts/clusterDiscriminativeTypes';

export function checkCluster1Eligibility(wideScan: WideScanResult, symbolicScan: SymbolicScanResult): boolean {
  // O Cluster 1 (Autoestima, Aprovação, Medo Falhar, Procrastinação)
  // Abre se estes Core Problems saírem do Wide Scan, OU se Eixos de comparação/identidade baterem no Symbolic.
  
  const relevantCore = ['baixa_autoestima', 'necessidade_aprovacao', 'comparacao_constante', 'procrastinacao', 'conflitos_internos'];
  const hasCoreSuspect = wideScan.topSuspects.some(s => relevantCore.includes(s.id)) || wideScan.rivalSuspects.some(s => relevantCore.includes(s.id));
  
  const relevantAxes = ['comparison', 'dignity', 'valueDependenceOnProgress'];
  const hasSymbolicTrigger = symbolicScan.activeFields.some(f => f.latentAxes.some(a => relevantAxes.includes(a)));

  return hasCoreSuspect || hasSymbolicTrigger;
}

// In a real flow, checking this true would trigger the React Native screen "Branch 1 questions".
// The answers to Branch 1 questions would form the `RivalEvidence[]` fed into the `rivalHypothesisEngine`. 
