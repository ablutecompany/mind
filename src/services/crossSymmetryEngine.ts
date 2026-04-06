// src/services/crossSymmetryEngine.ts

import { CoreProblemId } from '../contracts/coreProblemOntology';
import { WideScanResult } from '../contracts/inferenceTypes';
import { SymbolicEvidence } from './symbolicLifeFieldsEngine';

export interface DispersionMetrics {
  hasConvergence: boolean;
  hasCoupling: boolean;
  hasDispersal: boolean;
  hasContradiction: boolean;
  scatteredAxesCount: number;
}

export interface SymmetryCrossOutput {
  dominantAxis: CoreProblemId | null;
  secondaryAxis: CoreProblemId | null;
  intermediatePatterns: string[];
  convergenceSignals: string[];
  dispersionDesc: string | null;
  readingDepth: number; // 1 to 4
  crossedHypotheses: string[];
  strongSummary: string | null;
  dispersionMetrics: DispersionMetrics;
}

const INTERMEDIATE_PATTERNS = [
  { axes: ['meios', 'liberdade'], patternId: 'margem_autonomia', label: 'Restrição material a condicionar autonomia real', inferredDeepCore: 'sofrimento_incerteza' },
  { axes: ['apoio', 'energia'], patternId: 'desgaste_sem_sustentacao', label: 'Esgotamento estrutural sem base de apoio visível', inferredDeepCore: 'solidao' },
  { axes: ['liberdade', 'vida'], patternId: 'aprisionamento_vital', label: 'Sensação de perda de vida devido a excesso de dever ou prisões práticas', inferredDeepCore: 'falta_sentido' },
  { axes: ['direcao', 'vida'], patternId: 'bloqueio_rumo_quebra_vida', label: 'Ausência de direção a provocar paragem no fluxo vital', inferredDeepCore: 'conflitos_internos' },
  { axes: ['energia', 'direcao'], patternId: 'desgaste_friccional', label: 'Perda rotineira de energia à procura de orientação válida', inferredDeepCore: 'procrastinacao' },
  { axes: ['trabalho', 'tempo', 'vida'], patternId: 'desgaste_produtivo_sem_avanco', label: 'Perceção de esforço de vida massivo não traduzido em consolidação de rumo', inferredDeepCore: 'ansiedade' }
];

export function runSymmetryCrossing(
  wideScan: WideScanResult, 
  blocksAnswered: number, 
  rawAnswers: any[],
  symbolicSignalsPresent: boolean
): SymmetryCrossOutput {

  // Descobrir Eixos Dominantes Neutros
  const sortedSuspects = wideScan.topSuspects.filter(s => 
     ['meios', 'apoio', 'liberdade', 'energia', 'direcao', 'vida'].includes(s.id)
  );
  
  let dominantAxis = sortedSuspects.length > 0 ? sortedSuspects[0].id : null;
  let secondaryAxis = sortedSuspects.length > 1 ? sortedSuspects[1].id : null;

  // Dispersion Calculation
  // Extract answered axes from each block to find contradictions
  const blockMap: Record<string, Set<string>> = {};
  rawAnswers.forEach(ans => {
     const blockPrefix = ans.questionId.split('_')[0]; // "b1", "b2", "b3", "b4"
     const opt = ans.selectedOptionId;
     let axis = null;
     if (opt.includes('_meios') || opt.includes('meios') || opt.includes('dinheiro')) axis = 'meios';
     if (opt.includes('_apoio') || opt.includes('apoio') || opt.includes('relacionamento')) axis = 'apoio';
     if (opt.includes('_liberdade') || opt.includes('liberdade') || opt.includes('condicionado')) axis = 'liberdade';
     if (opt.includes('_energia') || opt.includes('energia') || opt.includes('cansado')) axis = 'energia';
     if (opt.includes('_direcao') || opt.includes('direcao') || opt.includes('rumo')) axis = 'direcao';
     if (opt.includes('_vida') || opt.includes('vida') || opt.includes('brilho')) axis = 'vida';
     
     if (axis) {
       if(!blockMap[blockPrefix]) blockMap[blockPrefix] = new Set();
       blockMap[blockPrefix].add(axis);
     }
  });

  const totalDistinctAxes = new Set<string>();
  Object.values(blockMap).forEach(s => s.forEach(v => totalDistinctAxes.add(v)));

  const dispersionMetrics: DispersionMetrics = {
     hasConvergence: false,
     hasCoupling: false,
     hasDispersal: false,
     hasContradiction: false,
     scatteredAxesCount: totalDistinctAxes.size
  };

  if (totalDistinctAxes.size >= 4) dispersionMetrics.hasDispersal = true;
  if (totalDistinctAxes.size >= 5) dispersionMetrics.hasContradiction = true;
  if (totalDistinctAxes.size <= 2 && dominantAxis) dispersionMetrics.hasConvergence = true;
  if (totalDistinctAxes.size === 3) dispersionMetrics.hasCoupling = true;

  const activeAxes = sortedSuspects.map(s => s.id);
  
  let intermediatePatterns: string[] = [];
  let convergenceSignals: string[] = [];
  let crossedHypotheses: string[] = [];
  let strongSummary: string | null = null;
  let dispersionDesc: string | null = null;

  if (dispersionMetrics.hasDispersal) {
     dispersionDesc = "Sinais distribuídos por várias frentes (sem núcleo único fixado).";
     dominantAxis = null;
     secondaryAxis = null;
  }
  if (dispersionMetrics.hasContradiction) {
     dispersionDesc = "Centro ainda não estabilizado. Forte contradição detetada nos blocos.";
     dominantAxis = null;
     secondaryAxis = null;
  }

  // Matriz de cruzamentos intermédios
  INTERMEDIATE_PATTERNS.forEach(cross => {
     let matchAll = cross.axes.every(axis => activeAxes.includes(axis as CoreProblemId) || totalDistinctAxes.has(axis));
     if (matchAll) {
         convergenceSignals.push(`Eixos Ativos: ${cross.axes.join(' + ')}`);
         intermediatePatterns.push(cross.patternId);
         crossedHypotheses.push(cross.label);
         
         // Se a profundidade for total E houver convergência real limpa (sem dispersão)
         if (blocksAnswered >= 4 && !dispersionMetrics.hasDispersal && symbolicSignalsPresent) {
             strongSummary = `A tensão sistemática entre ${cross.axes.join(' e ')} alinha-se com uma configuração de ${cross.inferredDeepCore}. ${cross.label}. O cenário exige uma intervenção estrutural direcionada à causa.`;
         }
     }
  });

  return {
    dominantAxis,
    secondaryAxis,
    intermediatePatterns,
    convergenceSignals,
    dispersionDesc,
    readingDepth: blocksAnswered,
    crossedHypotheses,
    strongSummary,
    dispersionMetrics
  };
}
