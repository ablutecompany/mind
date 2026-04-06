// src/tests/symbolicLifeFieldsEngine.test.ts
import { symbolicLifeFieldsScan, SymbolicEvidence } from '../services/symbolicLifeFieldsEngine';
import { WideScanResult } from '../contracts/inferenceTypes';

console.log("Testing Symbolic Life Fields Engine...\n");

// Dummy WideScan output para contexto
const dummyWideScan: WideScanResult = {
  topSuspects: [
    { id: 'ansiedade', label: 'Ansiedade', activationScore: 2.0, evidenceFor: [], evidenceAgainst: [], rivalIds: [], status: 'suspected', confidence: 'medium' },
    { id: 'baixa_autoestima', label: 'Baixa auto-estima', activationScore: 1.5, evidenceFor: [], evidenceAgainst: [], rivalIds: [], status: 'suspected', confidence: 'medium' }
  ],
  rivalSuspects: [],
  allCandidates: {} as any,
  isAmbiguous: false,
  scanConfidence: 'medium'
};

// Teste 1: Dinheiro carregado como Valor Próprio / Progresso
const evDinheiroValor: SymbolicEvidence[] = [
  { fieldId: 'pressao_material', axisTriggered: 'valueDependenceOnProgress', weight: 1.2, linkedCoreProblem: 'baixa_autoestima' }
];

const res1 = symbolicLifeFieldsScan(dummyWideScan, evDinheiroValor);
if (res1.dominantField === 'pressao_material' && res1.dominantAxes.includes('valueDependenceOnProgress')) {
  console.log("✅ Teste 1 (Dinheiro como Valor Próprio): Passou. Elevou pressão material e ligou a auto-estima.");
  // Verifica se ansiedade foi penalizada por não ter âncora simbólica aqui (-0.5)
  if (res1.coreProblemReinforcements['ansiedade'] === -0.5) {
     console.log("   ✅ Penalizou 'ansiedade' por ser suspeito geral sem ancoragem simbólica nesta prova.");
  }
} else {
  console.log("❌ Teste 1 Falhou.");
}

// Teste 2: Casa carregada como Território / Autonomia
const evCasaAutonomia: SymbolicEvidence[] = [
  { fieldId: 'casa_territorio', axisTriggered: 'sovereignty', weight: 0.8, linkedCoreProblem: 'ansiedade' },
  { fieldId: 'casa_territorio', axisTriggered: 'autonomy', weight: 0.6 }
];
const res2 = symbolicLifeFieldsScan(dummyWideScan, evCasaAutonomia);
if (res2.dominantField === 'casa_territorio' && res2.dominantAxes.includes('sovereignty')) {
  console.log("✅ Teste 2 (Casa como Autoridade): Passou. Distinguiu casa de conforto material.");
} else {
  console.log("❌ Teste 2 Falhou.");
}

// Teste 3: Idade carregada como Urgência e Luto do Tempo
const evIdadeUrgencia: SymbolicEvidence[] = [
  { fieldId: 'tempo_idade', axisTriggered: 'urgency', weight: 1.5 },
  { fieldId: 'tempo_idade', axisTriggered: 'mourningForLostTime', weight: 1.0, linkedCoreProblem: 'ansiedade' }
];
const res3 = symbolicLifeFieldsScan(dummyWideScan, evIdadeUrgencia);
if (res3.dominantField === 'tempo_idade' && res3.dominantAxes.includes('mourningForLostTime')) {
  console.log("✅ Teste 3 (Idade como Luto do Tempo): Passou.");
} else {
  console.log("❌ Teste 3 Falhou.");
}
