// src/tests/rivalHypothesisEngine.test.ts
import { testRivalHypotheses, RivalEvidence } from '../services/rivalHypothesisEngine';

console.log("Testing Branch Deepening: Rival Hypothesis Engine...\n");

// 1. pessoa que adia por medo de falhar
const ev1: RivalEvidence[] = [
  { hypothesisId: 'fear_of_failure', signal: 'teme_consequencias', weight: 1.0, polarity: 'for' },
  { hypothesisId: 'avoidant_procrastination', signal: 'adia_tarefas', weight: 0.8, polarity: 'for' }
];
const res1 = testRivalHypotheses(ev1);
if (res1.dominantProblem === 'fear_of_failure' && res1.primaryDefense === 'avoidant_procrastination') {
  console.log("✅ Teste 1 (Adia por medo): Passou. Medo dominou, fuga virou defesa.");
} else {
  console.log("❌ Teste 1 Falhou.", res1);
}

// 2. pessoa que adia por fuga e dispersão
const ev2: RivalEvidence[] = [
  { hypothesisId: 'avoidant_procrastination', signal: 'adia_tarefas', weight: 1.2, polarity: 'for' },
  { hypothesisId: 'fear_of_failure', signal: 'nao_pensa_em_falhar', weight: 0.8, polarity: 'against' }
];
const res2 = testRivalHypotheses(ev2);
if (res2.dominantProblem === 'avoidant_procrastination' && !res2.primaryDefense) {
  console.log("✅ Teste 2 (Adia por fuga): Passou. Fuga é o núcleo real.");
} else {
  console.log("❌ Teste 2 Falhou.", res2.dominantProblem);
}

// 3. pessoa que precisa de aprovação mas parece “só insegura”
const ev3: RivalEvidence[] = [
  { hypothesisId: 'low_self_worth', signal: 'vergonha', weight: 1.2, polarity: 'for' },
  { hypothesisId: 'approval_dependence', signal: 'diz_sim_a_tudo', weight: 0.8, polarity: 'for' }
];
const res3 = testRivalHypotheses(ev3);
if (res3.dominantProblem === 'low_self_worth' && res3.primaryDefense === 'approval_dependence') {
  console.log("✅ Teste 3 (Insegura vs Aprovação): Passou. Autoestima ditou a base, aprovação ficou como defesa.");
} else {
  console.log("❌ Teste 3 Falhou.", res3);
}

// 4. pessoa muito comparativa mas cujo núcleo é vergonha/baixa autoestima
const ev4: RivalEvidence[] = [
  { hypothesisId: 'low_self_worth', signal: 'vergonha', weight: 1.3, polarity: 'for' },
  { hypothesisId: 'comparison_driven_fragility', signal: 'olha_para_o_lado', weight: 0.9, polarity: 'for' }
];
const res4 = testRivalHypotheses(ev4);
if (res4.dominantProblem === 'low_self_worth' && res4.supportingProblem === 'comparison_driven_fragility') {
  console.log("✅ Teste 4 (Vergonha vs Comparação): Passou. Comparação mapeada como agravante.");
} else {
  console.log("❌ Teste 4 Falhou.", res4);
}

// 5. pessoa dividida entre querer e dever
const ev5: RivalEvidence[] = [
  { hypothesisId: 'inner_conflict', signal: 'quero_mas_nao_devo', weight: 1.2, polarity: 'for' },
  { hypothesisId: 'approval_dependence', signal: 'nao_quero_desiludir', weight: 0.8, polarity: 'for' }
];
const res5 = testRivalHypotheses(ev5);
if (res5.dominantProblem === 'inner_conflict' && res5.primaryDefense === 'approval_dependence') {
  console.log("✅ Teste 5 (Querer vs Dever): Passou. Medo de desiludir enfraquecido pela tensão estrutural interna.");
} else {
  console.log("❌ Teste 5 Falhou.");
}

// 6. caso ambíguo que deve sair como rival não resolvida
const ev6: RivalEvidence[] = [
  { hypothesisId: 'low_self_worth', signal: 'nao_tenho_valor', weight: 1.0, polarity: 'for' },
  { hypothesisId: 'fear_of_failure', signal: 'nao_posso_falhar', weight: 1.0, polarity: 'for' }
];
const res6 = testRivalHypotheses(ev6);
if (res6.confidence === 'low' && res6.rivalHypothesisOpen && res6.rivalHypothesisOpen.includes('low_self_worth')) {
  console.log("✅ Teste 6 (Caso Ambíguo): Passou. Teste não resolveu horizontalidade falsa e manteve a fenda aberta.");
} else {
  console.log("❌ Teste 6 Falhou.");
}
