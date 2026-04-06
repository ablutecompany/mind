// src/services/crossSymmetryEngine.ts

import { CoreProblemId } from '../contracts/coreProblemOntology';
import { WideScanResult } from '../contracts/inferenceTypes';

export interface CrossMatrixHit {
  label: string;
  inferredDeepCore: CoreProblemId | null;
  confidenceBoost: number;
}

export interface SymmetryCrossOutput {
  dominantAxis: CoreProblemId | null;
  secondaryAxis: CoreProblemId | null;
  convergenceSignals: string[];
  readingDepth: number; // 1 to 4
  crossedHypotheses: string[];
  strongSummary: string | null;
}

// Matriz aprovada de Cruzamentos
const KNOWN_CROSSINGS = [
  { axes: ['meios', 'liberdade'], depthLabel: 'Falta de margem a corroer autonomia', inferredDeepCore: 'sofrimento_incerteza', boost: +0.2 },
  { axes: ['apoio', 'energia'], depthLabel: 'Desgaste solitário sem sustentação estrutural', inferredDeepCore: 'solidao', boost: +0.25 },
  { axes: ['liberdade', 'vida'], depthLabel: 'Aprisionamento existencial e dever que esvazia vitalidade', inferredDeepCore: 'falta_sentido', boost: +0.3 },
  { axes: ['direcao', 'vida'], depthLabel: 'Bloqueio de rumo com perda severa de vitalidade', inferredDeepCore: 'conflitos_internos', boost: +0.25 },
  { axes: ['energia', 'direcao'], depthLabel: 'Desgaste resultante da fricção de não ver caminho', inferredDeepCore: 'procrastinacao', boost: +0.15 },
  { axes: ['trabalho', 'tempo', 'vida adiada'], depthLabel: 'Desgaste produtivo excessivo sem conversão em avanço real', inferredDeepCore: 'ansiedade', boost: +0.35 }
];

export function runSymmetryCrossing(
  wideScan: WideScanResult, 
  blocksAnswered: number, 
  rawAnswers: any[]
): SymmetryCrossOutput {

  // Descobrir Eixos Dominantes Neutros
  const sortedSuspects = wideScan.topSuspects.filter(s => 
     ['meios', 'apoio', 'liberdade', 'energia', 'direcao', 'vida'].includes(s.id)
  );
  
  const dominantAxis = sortedSuspects.length > 0 ? sortedSuspects[0].id : null;
  const secondaryAxis = sortedSuspects.length > 1 ? sortedSuspects[1].id : null;

  const activeAxes = sortedSuspects.map(s => s.id);
  
  let convergenceSignals: string[] = [];
  let crossedHypotheses: string[] = [];
  let strongSummary: string | null = null;

  KNOWN_CROSSINGS.forEach(cross => {
     let matchAll = cross.axes.every(axis => activeAxes.includes(axis as CoreProblemId) || rawAnswers.some(ans => ans.selectedOptionId.includes(axis)));
     if (matchAll) {
         convergenceSignals.push(`Ativação Simultânea: ${cross.axes.join(' + ')}`);
         crossedHypotheses.push(cross.depthLabel);
         // if deep enough, inject inference
         if (blocksAnswered >= 3) {
             strongSummary = `A tensão cruzada entre ${cross.axes.join(' e ')} indica uma ferida próxima ao núcleo de ${cross.inferredDeepCore}. ${cross.depthLabel}.`;
         }
     }
  });

  return {
    dominantAxis,
    secondaryAxis,
    convergenceSignals,
    readingDepth: blocksAnswered,
    crossedHypotheses,
    strongSummary
  };
}
