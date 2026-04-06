// src/services/fullInterventionEngine.ts
import { FinalPsychologicalSynthesis } from '../contracts/finalSynthesisTypes';
import { FullInterventionPayload } from '../contracts/interventionTypes';

export function generateFullIntervention(synthesis: FinalPsychologicalSynthesis): FullInterventionPayload {
  // Geração Mock baseada no núcleo para prova estrutural
  const core = synthesis.dominantProblem || 'tensão_geral';

  return {
    schemaVersion: '1.0.0',
    operationalReading: `A dinâmica de fundo que alimenta o teu atrito atual não é sobre disciplina material, é fundamentalmente sobre estruturação de limites em torno de ${core.replace('_', ' ')}.`,
    problemsToSeparate: [
      "Separar a tua identidade material do teu valor moral instintivo",
      synthesis.primaryDefense ? `Entender que ${synthesis.primaryDefense} é uma fuga e não uma solução orgânica` : "Aceitar urgências sem entrar em pânico operativo"
    ],
    interventionFronts: [
      "Front Motor: O que fazes quando sentes perda de controlo",
      "Front Simbólico: Como lidas com o risco de dano ao teu ego"
    ],
    immediateActions: [
      "Parar de negociar intenções de manhã. Executar a primeira tarefa sem pensar nela.",
      "Criar uma fronteira mecânica às 19h onde o stress do dia não transita para o reduto."
    ],
    mediumTermReorganization: [
      "Implementar métricas de fecho (Definir quando algo é suficiente em vez de procurar a perfeição total).",
      "Deixar de procurar harmonia em tudo, e tolerar alguma dose de fricção saudável com os outros."
    ],
    likelyErrors: [
      "Tentar mudar tudo de uma vez devido à urgência térmica e esgotar-se ao final de 3 dias.",
      "Achar que voltar a sentir preguiça/medo significa que o núcleo original colapsou de novo."
    ],
    priorities: [
      "1. Normalização do sono.",
      "2. Criação do limite estrutural de trabalho/esforço diário.",
      "3. Aceitação da assimetria nas vitórias diárias."
    ],
    finalSynthesisLine: "O objetivo não é não sentir medo. O objetivo é atuar em tensão com ele sem o deixar comandar a ação material."
  };
}
