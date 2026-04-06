import { convertSurveyToV2Input } from '../src/adapters/surveyResponsesToV2EvidenceAdapter';
import { useReflectionInferenceV2 } from '../src/facades/useReflectionInferenceV2';
import { useInterventionFacade } from '../src/facades/useInterventionFacade';

export default function handler(req: any, res: any) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { surveyBlocks, hasPaid = false } = req.body;

    if (!surveyBlocks || !Array.isArray(surveyBlocks)) {
      return res.status(400).json({ error: 'Missing or invalid surveyBlocks array' });
    }

    // 1. Adapter: Payload -> V2 Engine Evidence
    const input = convertSurveyToV2Input(surveyBlocks);

    // 2. Inference V2 (Run the Psychological Core)
    const inferenceResult = useReflectionInferenceV2(true, input);

    if (!inferenceResult.rawSynthesis) {
      return res.status(500).json({ error: 'Engine failed to synthesize.' });
    }

    // 3. Intervention (Generate roadmap/preview based on payment)
    const interventionPlan = useInterventionFacade(inferenceResult.rawSynthesis, hasPaid);

    // 4. Return Output
    return res.status(200).json({
      inference: inferenceResult.uiPayload,
      intervention: interventionPlan
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Core Error', details: error.message });
  }
}
