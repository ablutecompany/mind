// src/services/wideScanCoreProblems.ts
import { CORE_PROBLEM_ONTOLOGY, CoreProblemId } from '../contracts/coreProblemOntology';
import { ProblemCandidate, WideScanResult, EvidenceItem } from '../contracts/inferenceTypes';

export function wideScanCoreProblems(inputEvidence: EvidenceItem[]): WideScanResult {
  // 1. Initialize all candidates
  const allCandidates: Record<CoreProblemId, ProblemCandidate> = {} as Record<CoreProblemId, ProblemCandidate>;
  
  for (const [id, def] of Object.entries(CORE_PROBLEM_ONTOLOGY)) {
    allCandidates[id as CoreProblemId] = {
      id: def.id,
      label: def.label,
      activationScore: 0,
      evidenceFor: [],
      evidenceAgainst: [],
      rivalIds: def.rivalIds,
      status: 'inactive',
      confidence: 'low'
    };
  }

  // 2. Aggregate Evidence
  inputEvidence.forEach(ev => {
    // In a real scenario, evidence has a mapping to core problems. For now we look for signal text matches or direct maps.
    // Assuming 'ev.signal' directly matches a CoreProblemId for simplicity of the engine bridge
    const targetId = ev.signal as CoreProblemId;
    
    if (allCandidates[targetId]) {
      if (ev.polarity === 'for') {
        allCandidates[targetId].evidenceFor.push(ev);
        allCandidates[targetId].activationScore += ev.weight;
      } else {
        allCandidates[targetId].evidenceAgainst.push(ev);
        allCandidates[targetId].activationScore -= (ev.weight * 0.5); // Penalização mais leve
      }
    }
  });

  // 3. Evaluate Status and Confidence
  const candidatesArray = Object.values(allCandidates).sort((a, b) => b.activationScore - a.activationScore);
  let activeCount = 0;

  candidatesArray.forEach(c => {
    if (c.activationScore > 1.5) {
      c.status = 'suspected';
      c.confidence = c.evidenceFor.length > 2 ? 'high' : 'medium';
      activeCount++;
    } else if (c.activationScore > 0.5) {
      c.status = 'inactive'; 
      c.confidence = 'low';
    } else {
      c.status = 'inactive';
      c.confidence = 'low';
    }
  });

  // 4. Identify Top Suspects and Rivals
  // A suspect is considered 'Top' if it's within 20% of the highest score, preventing early closure
  const highestScore = candidatesArray[0].activationScore;
  const topSuspects = candidatesArray.filter(c => c.activationScore >= highestScore * 0.8 && c.activationScore >= 0.8);
  
  // Rivals are the rivals of the top suspects that also have some activation
  const rivalIds = new Set(topSuspects.flatMap(ts => ts.rivalIds));
  const rivalSuspects = candidatesArray.filter(c => rivalIds.has(c.id) && c.activationScore > 0.3 && !topSuspects.includes(c));

  // If there are too many suspects, mark as ambiguous
  const isAmbiguous = topSuspects.length > 3;
  const scanConfidence = isAmbiguous ? 'low' : (highestScore > 2.0 ? 'high' : (highestScore > 1.0 ? 'medium' : 'low'));

  return {
    topSuspects,
    rivalSuspects,
    allCandidates,
    isAmbiguous,
    scanConfidence
  };
}
