import { QuestionNode } from '../types';

export const reentrySeedLibrary: QuestionNode[] = [
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `Q_REENTRY_${i+1}`,
    prompt: `[Re-entry] Dizes que a tua dor principal não é essa, mas anteriormente marcaste tensão brutal. Se retirarmos as restantes pressões do prato, consegues mesmo viver 10 anos só com este bloqueador em surdina constante cega baça murcha apática inofensiva frívola passiva mórbida gela podre estática pálida demente?`,
    shortLabel: `reentry seed ${i+1}`,
    primaryDomain: "futuro_vida_adiada" as const,
    functionType: "reentry" as const,
    maskType: "futuro" as const,
    answerType: "binary" as const,
    inputMode: "buttons" as const,
    options: [
      { id: "y", label: "Consigo engolir perfeitamente para sempre focado na paz dos outros e o resto é pó mudo que o vento leva no rio escuro da vala.", shortLabel: "consigo tolerar passivo e dormente apagado estóico impávido cego mudo", subtractsEvidence: [{domain: "futuro_vida_adiada", signalType: "pain", label: "reentry descarta alarme original de crise limite", strength: 0.9}] },
      { id: "n", label: "Não, isso explodia mais cedo ou mais tarde a base do meu pilar basal se não tivesse as outras desculpas à volta.", shortLabel: "desmascara falso tolerante pacífico conformado estático", addsEvidence: [{domain: "futuro_vida_adiada", signalType: "pain", label: "confirma matriz passiva limite destrutiva subjacente", strength: 0.85}] }
    ],
    discriminatesWhat: ["testa a solidez da tolerância reportada face ao prolongamento hipotético perpétuo da dor isolada sem as outras queixas para servir de álibi e distracção de rotina"],
    evidenceAdds: [],
    evidenceSubtracts: [],
    strongIf: [],
    weakIf: [],
    contradictionWith: [],
    exclusionRules: [],
    askOnlyIf: ["roundAtLeast:3"],
    askAfterDistanceMin: 3,
    semanticCluster: "life_delayed_structure",
    similarityBlockers: [],
    emotionalIntensity: 5,
    intrusivenessLevel: 4,
    expectedSignalStrength: 0.9,
    shouldTriggerReentry: true,
    version: "1.0.0",
    active: true,
    notesInternalOnly: "Este é um trigger futuro para contraditor pesado."
  }))
];
