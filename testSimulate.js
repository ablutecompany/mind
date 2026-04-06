// testSimulate.js
const { convertSurveyToV2Input } = require('./src/adapters/surveyResponsesToV2EvidenceAdapter');
const { useReflectionInferenceV2 } = require('./src/facades/useReflectionInferenceV2');

function buildMockReq(blocksAnswersArr, hasSymbolic = false) {
   const surveyBlocks = blocksAnswersArr.map((ans, idx) => {
       const bId = `block_${idx+1}`;
       return {
          blockId: bId,
          answers: ans.map(a => ({ questionId: bId+'_q1', selectedOptionId: a }))
       };
   });
   
   if (hasSymbolic) {
       surveyBlocks.push({
           blockId: "symbolic",
           answers: [{ questionId: 'sym', selectedOptionId: 'opt_B1_casa_sufoco' }]
       });
   }
   return surveyBlocks;
}

function runSim(name, blocks, hasSymbolic) {
   const input = convertSurveyToV2Input(buildMockReq(blocks, hasSymbolic));
   const res = useReflectionInferenceV2(true, input);
   console.log(`\n=== SCENARIO: ${name} ===`);
   console.log("Answers:", blocks.flat().join(", "));
   console.log("Confidence:", res.uiPayload.confidenceLevel);
   console.log("Depth:", res.uiPayload.readingDepth);
   console.log("Dominant:", res.uiPayload.dominantAxis);
   console.log("Dispersion:", res.uiPayload.dispersionAlert || "None");
   console.log("Interm. Patterns:", res.uiPayload.intermediatePatterns.join(', '));
   console.log("Strong Summary:", res.uiPayload.strongSummary || "(Blocked by Confidence Filter)");
}

console.log("Running Simulations...\n");

// 6 Casos Dominantes
runSim("Meios Dominante B1+B2+B3+B4", [['opt_meios'], ['opt_meios'], ['opt_liberdade'], ['opt_meios']], true);
runSim("Apoio Dominante B1+B2+B3+B4", [['opt_apoio'], ['opt_apoio'], ['opt_energia'], ['opt_apoio']], true);
runSim("Liberdade Dominante B1+B2+B3+B4", [['opt_liberdade'], ['opt_liberdade'], ['opt_vida'], ['opt_liberdade']], true);
runSim("Energia Dominante B1+B2", [['opt_energia'], ['opt_energia']], false);
runSim("Direcao Dominante B1+B2+B3", [['opt_direcao'], ['opt_direcao'], ['opt_vida']], false);
runSim("Vida Dominante B1+B2+B3", [['opt_vida'], ['opt_vida'], ['opt_vida']], false);

// 1 Caso Acoplado (3 eixos, depth 3)
runSim("Acoplado (Meios + Liberdade + Vida)", [['opt_meios'], ['opt_liberdade'], ['opt_vida']], true);

// 1 Caso Disperso (5 eixos)
runSim("Disperso / Contraditório", [['opt_meios'], ['opt_apoio'], ['opt_liberdade'], ['opt_direcao'], ['opt_energia']], false);
