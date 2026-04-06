# Mind Engine V2 — Guia de Integração Front-end

Este pacote devolve inferências hierárquicas não-clínicas. A App Front-end não deve efetuar nenhum cálculo psicológico local; atua apenas como conduta gráfica.

## 1. O Formato de Input
Quando o utilizador terminar o inquérito no Front-end, não deve enviar variáveis locais avulsas. Deve compilar as respostas neste Interface e enviá-lo para a Facade:
```typescript
interface LegacySurveyBlock {
  blockId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}
```
*Atenção: A `selectedOptionId` tem de constar obrigatoriamente do dicionário local `surveyOptionEvidenceDictionary.ts` que fica contido neste package.*

## 2. Ponto de Entrada (Facade)
Existem 2 pontos de entrada exportados. A UI deve chamá-los por ordem:

**A. Geração de Síntese Pura (Background Loading)**
```typescript
import { useReflectionInferenceV2 } from 'mind-engine/facades';
// Passar 'true' de featureFlag e o array de respostas
const execution = useReflectionInferenceV2(true, convertSurveyToV2Input(respostasUI));
```
Isto devolve a síntese estrita para alimentar o ecrã WOW.

**B. Geração Híbrida do Plano Prático (Ecrã Paywall)**
```typescript
import { useInterventionFacade } from 'mind-engine/facades';
// Passar a síntese gerada e se o utilizador já pagou a Paywall
const actionPayload = useInterventionFacade(execution.rawSynthesis, userHasPaid);
```

## 3. Payload Recebido e Tratamento Visivo
A Interface vai exportar estados de **Confiança Estritos (`confidenceState`)**:
*   `dominant_strong` ou `dominant_probable`: UI pode apresentar Headlines assertivos ("Teu problema base é X").
*   `rival_open`: UI **tem de exibir o aviso de opacidade** contido na variável `unknowns` (Ex: "Faltam dados para afastar Y de X").
*   `insufficient_to_close`: UI **não pode forçar barra gráfica conclusiva**. O Core devolverá `null` no DominantProblem.

## 4. O Ecrã de Paywall e Preview
O Motor expõe `hasMoreLocked: boolean`. O programador React apenas embrulha o texto num componente bloqueado se essa `flag` for verdadeira. Quando o Firebase/Stripe autorizar pagamento, volta a chamar o `useInterventionFacade(synthesis, true)` para o Engine re-avaliar a flag e cuspir os arrays de Reestruturação Intermédia completos.
