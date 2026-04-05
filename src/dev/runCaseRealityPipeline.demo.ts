import { runCaseRealityPipeline } from '../core/case-intelligence/engine';
import { RawInputAnswer } from '../core/case-intelligence/engine/aggregateEvidence';

console.log('--- STARTING CASE REALITY PIPELINE DEMO ---');

// Fictional minimal input simulating a user session
const mockRawAnswers: RawInputAnswer[] = [
  {
    questionId: 'q1',
    round: 1,
    domainHint: 'habitacao_espaco_autonomia',
    text: 'Ainda vivo com os meus pais na mesma casa.',
    signalType: 'constraint',
    strength: 0.9,
    polarity: 'supporting',
    objectRef: 'casa'
  },
  {
    questionId: 'q2',
    round: 1,
    domainHint: 'habitacao_espaco_autonomia',
    text: 'Quero ter o meu espaço, mas não consigo juntar para a entrada.',
    signalType: 'desire',
    strength: 0.8,
    polarity: 'supporting'
  },
  {
    questionId: 'q3',
    round: 2,
    domainHint: 'financas_margem',
    text: 'Sobram-me 50 euros no fim do mês.',
    signalType: 'pain',
    strength: 0.9,
    polarity: 'supporting',
    objectRef: 'dinheiro'
  },
  {
    questionId: 'q4',
    round: 2,
    domainHint: 'habitacao_espaco_autonomia',
    text: 'Odeio depender deles para tomar qualquer decisão relacionada com a minha rotina.',
    signalType: 'conflict',
    strength: 0.85,
    polarity: 'supporting'
  }
];

const result = runCaseRealityPipeline(mockRawAnswers);

console.log('\n=== 1. EVIDENCE LEDGER ===');
console.log(JSON.stringify(result.evidenceLedger, null, 2));

console.log('\n=== 2. CASE REALITY MAP ===');
console.log(JSON.stringify(result.caseRealityMap, null, 2));

console.log('\n=== 3. CASE FINGERPRINT ===');
console.log(JSON.stringify(result.caseFingerprint, null, 2));

console.log('\n=== 4. REPORT CONTEXT ===');
console.log(JSON.stringify(result.reportContext, null, 2));

console.log('\n=== 5. DEBUG TRACE ===');
console.log(JSON.stringify(result.debugTrace, null, 2));

console.log('\n--- DEMO COMPLETED SUCCESSFULLY ---');
