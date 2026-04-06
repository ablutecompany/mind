import { InterventionPreviewPayload } from '../contracts/interventionTypes';
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';

export function runInterventionPreviewEngine(synthesis: FinalPsychologicalSynthesis): InterventionPreviewPayload {
  
  // Condição: Ausência de núcleo claro
  if (synthesis.confidence === 'insufficient_to_close' || !synthesis.dominantProblem) {
    return {
      schemaVersion: '1.0.0',
      previewReading: "Os teus sinais são difusos...",
      previewPriority: "Observação Neutra",
      previewAction: "Não tentes resolver a tua angústia nas próximas 24h.",
      hasMoreLocked: false
    };
  }

  // Táticas Base
  const rules: Record<string, { reading: string, action: string, priority: string, alternative: string }> = {
    'low_self_worth': {
      reading: 'Identificámos que usas a aprovação externa como escudo de sobrevivência do teu ego.',
      action: 'Anota uma coisa inútil que assumes como defeito e que te disseram na infância.',
      priority: 'Quebra de Identidade Adotada',
      alternative: 'Questiona a narrativa da última pessoa que te criticou.'
    },
    'fear_of_failure': {
      reading: 'O medo do fracasso está a devorar silenciosamente o teu potencial de ação.',
      action: 'Hoje, propõe-te a falhar intencionalmente numa tarefa menor (e ri disso).',
      priority: 'Dessensibilização ao Erro',
      alternative: 'Separa o Teu Valor do Teu Output Mário.'
    }
  };

  const tactic = rules[synthesis.dominantProblem];

  if (!tactic) {
    return {
      schemaVersion: '1.0.0',
      previewReading: `Identificámos que o motor da tua tensão está focado em ${synthesis.dominantProblem.replace('_', ' ')}.`,
      previewPriority: "Observação Focada",
      previewAction: "Foca-te exclusivamente nesta dinâmica e tenta quebrar a sua inércia nas próximas 24h.",
      hasMoreLocked: true
    };
  }

  return {
    schemaVersion: '1.0.0',
    previewReading: tactic.reading,
    previewPriority: tactic.priority,
    previewAction: tactic.action,
    optionalSecondSuggestion: tactic.alternative,
    hasMoreLocked: true
  };
}
