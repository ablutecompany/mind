import * as fs from 'fs';
import * as path from 'path';

// Core imports
import { SessionCaseState } from '../state/sessionCaseState';
import { buildCaseRealityMap } from '../engine/buildCaseRealityMap';
import { buildCaseFingerprint } from '../engine/buildCaseFingerprint';
import { createReportContext } from '../engine/createReportContext';
import { runContradictionTests } from '../contradictions/runContradictionTests';
import { generatePublicReport } from '../report/generatePublicReport';
import { generateRecognitionLines } from '../recognition/generateRecognitionLines';
import { validateCrossCaseIntegrity } from '../dedup/crossCaseValidator';
import { createTextFingerprint } from '../dedup/textFingerprint';

// Fixtures
import { caseAFinancasLedger } from './fixtures/caseA_financas';
import { caseBCasadaAmaOutroLedger } from './fixtures/caseB_casada_ama_outro';
import { caseCEspacoNaoEmancipadaLedger } from './fixtures/caseC_espaco_nao_emancipada';
import { caseDTrabalhoDesgasteLedger } from './fixtures/caseD_trabalho_desgaste';
import { caseEFamiliaLealdadeLedger } from './fixtures/caseE_familia_lealdade';
import { caseFFuturoAdiadoLedger } from './fixtures/caseF_futuro_adiado_sem_relacao';
import { EvidenceSignal } from '../types';

interface ProcessedCase {
  id: string;
  report: any;
  recognition: any;
  realityMap: any;
  fingerprint: any;
  validatorInput: any;
}

function runCasePipeline(id: string, ledger: EvidenceSignal[]): ProcessedCase {
  const state: SessionCaseState = {
    sessionId: id,
    rawAnswers: [],
    debugTrace: [],
    pipelineStage: 'evidence_aggregation',
    evidenceLedger: ledger,
    activeDomains: Array.from(new Set(ledger.map(l => l.domain))),
    rejectedDomains: [],
    caseRealityMap: null,
    caseFingerprint: null
  };

  const realityMap = buildCaseRealityMap(state.evidenceLedger);
  state.caseRealityMap = realityMap;
  
  const fingerprint = buildCaseFingerprint(realityMap, state.evidenceLedger);
  state.caseFingerprint = fingerprint;

  const reportContext = createReportContext(realityMap, state.evidenceLedger);
  const contradictions = runContradictionTests(state, realityMap);

  const reportInput = {
    caseRealityMap: realityMap,
    caseFingerprint: fingerprint!,
    reportContext: reportContext,
    contradictionResults: contradictions
  };

  const report = generatePublicReport(reportInput);
  const recognition = generateRecognitionLines(reportInput);

  const repFingerprints = report.sections.flatMap(s => s.paragraphs.map(p => createTextFingerprint(p)));
  const openFingerprint = report.sections.length > 0 && report.sections[0].paragraphs.length > 0 
    ? createTextFingerprint(report.sections[0].paragraphs[0]) 
    : null;
  const recFingerprints = recognition.finalLines.map(l => createTextFingerprint(l));

  const validatorInput = {
    id,
    dominantDomain: realityMap.dominantDomain,
    reportFingerprints: repFingerprints,
    openingFingerprint: openFingerprint,
    recognitionFingerprints: recFingerprints,
    questionPathIds: ledger.map(l => l.sourceQuestionId).filter((id): id is string => !!id)
  };

  return { id, report, recognition, realityMap, fingerprint, validatorInput };
}

export function runStressTests() {
  console.log("Starting Mind V2 Reality-First Stress Tests...");

  const cases = [
    runCasePipeline("A_FINANCAS", caseAFinancasLedger),
    runCasePipeline("B_CASADA_AMA", caseBCasadaAmaOutroLedger),
    runCasePipeline("C_ESPACO", caseCEspacoNaoEmancipadaLedger),
    runCasePipeline("D_TRABALHO", caseDTrabalhoDesgasteLedger),
    runCasePipeline("E_FAMILIA", caseEFamiliaLealdadeLedger),
    runCasePipeline("F_FUTURO", caseFFuturoAdiadoLedger)
  ];

  const caseA = cases[0];
  const caseB = cases[1];
  const caseC = cases[2];

  // ASSERT 1 - FINANÇAS
  if (caseA.realityMap.dominantDomain !== 'financas_margem') throw new Error("Test 1 Failed: Case A is not anchored to financas_margem.");
  
  // ASSERT 2 - VINCULO DIVIDIDO
  if (caseB.realityMap.dominantDomain !== 'relacao_vinculo_formal' && caseB.realityMap.dominantDomain !== 'centro_afetivo_deslocado') {
    throw new Error("Test 2 Failed: Case B is not anchored to relation/displacement.");
  }

  // ASSERT 3 - HABITACAO
  if (caseC.realityMap.dominantDomain !== 'habitacao_espaco_autonomia') throw new Error("Test 3 Failed: Case C is not anchored to habitacao.");

  // ASSERT 4 - DIFERENCIAÇÃO (A vs B)
  const dedupAB = validateCrossCaseIntegrity({ sessionA: caseA.validatorInput, sessionB: caseB.validatorInput });
  if (dedupAB.failedCrossCase) {
    throw new Error(`Test 4 Failed: A and B are too similar! ${dedupAB.failureReasons.join(', ')}`);
  }

  // ASSERT 4 - DIFERENCIAÇÃO (A vs C)
  const dedupAC = validateCrossCaseIntegrity({ sessionA: caseA.validatorInput, sessionB: caseC.validatorInput });
  if (dedupAC.failedCrossCase) {
    throw new Error(`Test 4 Failed: A and C are too similar! ${dedupAC.failureReasons.join(', ')}`);
  }

  console.log("All Asserts Passed Successfully. Differentiation proven.");

  const dedupBC = validateCrossCaseIntegrity({ sessionA: caseB.validatorInput, sessionB: caseC.validatorInput });

  const summaryBlock = cases.map(c => ({
    id: c.id,
    dominantDomain: c.realityMap.dominantDomain,
    dominantProblem: c.realityMap.dominantProblem,
    topBlockers: c.fingerprint.topBlockers,
    openingLine: c.report.sections.length > 0 && c.report.sections[0].paragraphs.length > 0 ? c.report.sections[0].paragraphs[0] : null,
    recognitionLines: c.recognition.finalLines,
    confidence: c.report.summaryFlags.confidenceLevel
  }));

  const overlapMetrics = {
    A_vs_B: {
      insightOverlapScore: dedupAB.insightOverlapScore,
      openingParagraphOverlap: dedupAB.openingParagraphOverlap,
      recognitionLineOverlap: dedupAB.recognitionLineOverlap,
      questionPathOverlap: dedupAB.questionPathOverlap
    },
    A_vs_C: {
      insightOverlapScore: dedupAC.insightOverlapScore,
      openingParagraphOverlap: dedupAC.openingParagraphOverlap,
      recognitionLineOverlap: dedupAC.recognitionLineOverlap,
      questionPathOverlap: dedupAC.questionPathOverlap
    },
    B_vs_C: {
      insightOverlapScore: dedupBC.insightOverlapScore,
      openingParagraphOverlap: dedupBC.openingParagraphOverlap,
      recognitionLineOverlap: dedupBC.recognitionLineOverlap,
      questionPathOverlap: dedupBC.questionPathOverlap
    }
  };

  const payload = {
    timestamp: new Date().toISOString(),
    status: "PASS",
    summary: summaryBlock,
    overlapMetrics
  };

  const outDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(path.join(outDir, 'stress-test-summary.json'), JSON.stringify(payload, null, 2));
  console.log("Output saved to output/stress-test-summary.json");
}

// Auto-run if executed directly
if (require.main === module) {
  runStressTests();
}
