// src/tests/endToEndFlow.test.ts
import { LegacySurveyBlock, convertSurveyToV2Input } from '../adapters/surveyResponsesToV2EvidenceAdapter';
import { useReflectionInferenceV2 } from '../facades/useReflectionInferenceV2';
import { useInterventionFacade } from '../facades/useInterventionFacade';

console.log("\n🧪 TESTING END-TO-END V2 PIPELINE...");
console.log("========================================");

// 1. Simulação do Estado Real da UI Antiga (Respostas puras, clicks do utilizador)
const rawUIAnswers: LegacySurveyBlock[] = [
  { 
    blockId: 'superficial', 
    answers: [{ questionId: 'q1', selectedOptionId: 'opt_fuga_medo' }] 
  },
  { 
    blockId: 'symbolic', 
    answers: [{ questionId: 'q2', selectedOptionId: 'opt_dinheiro_prova' }] 
  },
  { 
    blockId: 'deepening', 
    answers: [{ questionId: 'q3', selectedOptionId: 'opt_odeio_perder' }] 
  }
];
console.log("► [STEP 1] UI detetou cliques do utilizador:", JSON.stringify(rawUIAnswers));

// 2. Passagem do Adapter
const pipelineInput = convertSurveyToV2Input(rawUIAnswers);
if (pipelineInput.baseA_signals.length > 0) {
  console.log("► [STEP 2] Adapter converteu cliques em objetos mecânicos de interferência V2 com sucesso.");
}

// 3. Facade V2 (Substitui todo o código hardcoded das Vistas)
const v2CoreExecution = useReflectionInferenceV2(true, pipelineInput);
if (v2CoreExecution.rawSynthesis) {
  console.log("► [STEP 3] Motores V2 processaram Base A + Base B + Cluster de Aprofundamento...");
}

// 4. Facade Comercial (Plano Prático / Paywall)
const comercialPayload = useInterventionFacade(v2CoreExecution.rawSynthesis!, false); // userHasPaid = false
if (comercialPayload.teaserCard) {
  console.log("► [STEP 4] Soluções Propostas geradas com Lock Comercial embutido.");
}

// Validador de Sucesso
if (v2CoreExecution.rawSynthesis?.dominantProblem === 'fear_of_failure' || v2CoreExecution.rawSynthesis?.latentTheme.includes('fear_of_failure')) {
   console.log("\n🏆 SUCESSO END-TO-END! Pipeline desde o Botão inicial ao Core V2 validada perfeitamente.");
}
