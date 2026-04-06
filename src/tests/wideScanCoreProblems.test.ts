// src/tests/wideScanCoreProblems.test.ts
import { wideScanCoreProblems } from '../services/wideScanCoreProblems';
import { EvidenceItem } from '../contracts/inferenceTypes';

console.log("Testing Wide Scan Core Problems...\n");

// Teste 1: Ativação Ampla (Ansiedade vs Medo)
const evAnsiedadeMedo: EvidenceItem[] = [
  { sourceId: 'q1', signal: 'ansiedade', weight: 1.0, polarity: 'for' },
  { sourceId: 'q2', signal: 'ansiedade', weight: 0.8, polarity: 'for' },
  { sourceId: 'q3', signal: 'medo', weight: 0.9, polarity: 'for' }, // Rival direto
];
const res1 = wideScanCoreProblems(evAnsiedadeMedo);
if (res1.topSuspects.some(s => s.id === 'ansiedade') && res1.scanConfidence === 'medium') {
  console.log("✅ Teste 1 (Ansiedade vs Medo): Passou. Top Suspect capturado sem fecho prematuro.");
} else {
  console.log("❌ Teste 1 Falhou.", res1);
}

// Teste 2: Autoestima vs Aprovação
const evAutoestimaAprovacao: EvidenceItem[] = [
  { sourceId: 'q1', signal: 'baixa_autoestima', weight: 0.9, polarity: 'for' },
  { sourceId: 'q2', signal: 'necessidade_aprovacao', weight: 0.85, polarity: 'for' },
];
const res2 = wideScanCoreProblems(evAutoestimaAprovacao);
if (res2.topSuspects.length === 2) {
  console.log("✅ Teste 2 (Autoestima vs Aprovação): Passou. Múltiplos suspeitos retidos na margem térmica.");
} else {
  console.log("❌ Teste 2 Falhou.", res2.topSuspects);
}

// Teste 3: Cenário Ambíguo (3 suspeitos fortes)
const evAmbigua: EvidenceItem[] = [
  { sourceId: 'q1', signal: 'ansiedade', weight: 1.0, polarity: 'for' },
  { sourceId: 'q2', signal: 'ansiedade', weight: 0.6, polarity: 'for' },
  { sourceId: 'q3', signal: 'medo', weight: 1.0, polarity: 'for' },
  { sourceId: 'q4', signal: 'medo', weight: 0.6, polarity: 'for' },
  { sourceId: 'q5', signal: 'conflitos_internos', weight: 1.0, polarity: 'for' },
  { sourceId: 'q6', signal: 'conflitos_internos', weight: 0.6, polarity: 'for' },
  { sourceId: 'q7', signal: 'procrastinacao', weight: 1.0, polarity: 'for' },
  { sourceId: 'q8', signal: 'procrastinacao', weight: 0.6, polarity: 'for' },
];
const res3 = wideScanCoreProblems(evAmbigua);
if (res3.isAmbiguous === true && res3.scanConfidence === 'low') {
  console.log("✅ Teste 3 (Cenário Ambíguo): Passou. Motor recusou reportar alta confiança na confusão.");
} else {
  console.log("❌ Teste 3 Falhou.", res3);
}

// Teste 4: Cenário Fraco (pouca evidência)
const evFraca: EvidenceItem[] = [
  { sourceId: 'q1', signal: 'solidao', weight: 0.4, polarity: 'for' }
];
const res4 = wideScanCoreProblems(evFraca);
if (res4.scanConfidence === 'low' && res4.topSuspects.length === 0) {
  console.log("✅ Teste 4 (Cenário Fraco): Passou. Escala baixa respeitada.");
} else {
  console.log("❌ Teste 4 Falhou.", res4);
}
