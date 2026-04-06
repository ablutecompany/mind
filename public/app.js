// public/app.js

// Hardcoded Demo Questions based on surveyOptionEvidenceDictionary.ts
const DEMO_QUESTIONS = [
  {
    id: "q1",
    blockId: "superficial",
    text: "Quando pensas no que te está a travar, sentes mais:",
    options: [
      { id: "opt_A1_meios", text: "Falta de meios" },
      { id: "opt_A1_apoio", text: "Falta de apoio, ligação ou estrutura afetiva" },
      { id: "opt_A1_liberdade", text: "Falta de liberdade" },
      { id: "opt_A1_energia", text: "Falta de energia" },
      { id: "opt_A1_direcao", text: "Falta de direção" },
      { id: "opt_A1_vida", text: "Falta de vida" },
      { id: "opt_A1_none", text: "Não consigo identificar bem" }
    ]
  },
  {
    id: "q2",
    blockId: "symbolic",
    text: "Onde sentes o maior atrito no teu dia-a-dia?",
    options: [
      { id: "opt_B1_casa_sufoco", text: "Em casa, sinto que perco o controlo do meu espaço." },
      { id: "opt_B2_trabalho_identidade", text: "No trabalho, a minha identidade parece fundir-se com o que produzo." },
      { id: "opt_B3_rotina_apagada", text: "Na rotina. Sinto a vida a passar repetitivamente." }
    ]
  },
  {
    id: "q3",
    blockId: "deepening",
    text: "Quando ages, o que é que genuinamente te move no fundo?",
    options: [
      { id: "opt_D1_evita_critica", text: "Acima de tudo, evitar ser criticado e falhar publicamente." },
      { id: "opt_D3_precisa_agradar", text: "Garantir que as pessoas importantes ficam contentes comigo." },
      { id: "opt_D4_auto_valor_ferido", text: "A necessidade secreta de provar que tenho valor." }
    ]
  }
];

let currentStep = 0;
let surveyAnswers = []; // holds objects: { blockId, answers: [{ questionId, selectedOptionId }] }

const screens = {
  landing: document.getElementById('landing-screen'),
  question: document.getElementById('question-screen'),
  loading: document.getElementById('loading-screen'),
  result: document.getElementById('result-screen')
};

function activateScreen(screenEl) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screenEl.classList.add('active');
}

// 1. Start Click
document.getElementById('start-btn').addEventListener('click', () => {
  currentStep = 0;
  surveyAnswers = [];
  loadQuestion();
  activateScreen(screens.question);
});

// 2. Load Question View
function loadQuestion() {
  if (currentStep >= DEMO_QUESTIONS.length) {
    submitEvaluation();
    return;
  }

  const q = DEMO_QUESTIONS[currentStep];
  document.getElementById('question-text').innerText = q.text;
  
  // Progress Bar
  const progressPerc = ((currentStep) / DEMO_QUESTIONS.length) * 100;
  document.getElementById('progress-bar').style.width = progressPerc + '%';

  const container = document.getElementById('options-container');
  container.innerHTML = ''; // clear previous

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => handleAnswerOption(q.blockId, q.id, opt.id);
    container.appendChild(btn);
  });
}

function handleAnswerOption(blockId, questionId, selectedOptionId) {
  // Save answer matching the required Array structure in API
  surveyAnswers.push({
    blockId,
    answers: [{ questionId, selectedOptionId }]
  });

  currentStep++;
  loadQuestion();
}

// 3. Submit Evaluation to Vercel Local Node
async function submitEvaluation() {
  document.getElementById('progress-bar').style.width = '100%';
  activateScreen(screens.loading);

  const payload = {
    surveyBlocks: surveyAnswers,
    hasPaid: false
  };

  console.log("[Demo Frontend] A enviar POST /api/evaluate com Payload:", payload);

  // MODO DE TESTE LOCAL (FALLBACK)
  const isTestMode = true; // Forçar modo de fallback de segurança

  try {
    if (isTestMode) {
      throw new Error("Modo de Teste Forçado (Gateway desativado)");
    }

    const totalGivenAnswers = payload.surveyBlocks.reduce((acc, block) => acc + block.answers.length, 0);

    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API Gateway retornou erro ${response.status}`);
    }

    const data = await response.json();
    console.log("[Demo Frontend] Resposta Recebida:", data);
    renderResults(data, totalGivenAnswers);
  } catch (error) {
    console.warn("⚠️ Fallback Local Engine ativado:", error.message);
    
    // Fallback local determinístico simplificado E prudente!
    const q1Ans = surveyAnswers.find(b => b.blockId === 'superficial')?.answers[0].selectedOptionId;
    
    let mockResult = {
      inference: {
        headline: "Leitura Inicial (Fallback Local)", 
        subHeadline: "O ambiente de teste calculou um eixo de forma simplificada e provisória.",
        isLowConfidence: true,
        ambiguityDisclaimer: "GRAU DE CONFIANÇA BAIXO: Amostragem insuficiente de dados.",
        dynamicBands: [
          { label: "Hipótese de Partida", value: "A aguardar volume de respostas", type: "core" }
        ]
      },
      intervention: {
        previewReading: "[Modo Local] Faltam perguntas para consolidar um retrato exato.",
        previewPriority: "Foco Sugerido na Amostragem",
        previewAction: "Nenhuma ação dura deve ser desenhada com 3 perguntas.",
        hasMoreLocked: true
      }
    };

    if (q1Ans === 'opt_A1_meios') {
       mockResult.inference.headline = "Eixo Possivelmente Ativo: Meios";
       mockResult.inference.dynamicBands = [{ label: "Suspeita Dominante", value: "Condicionamento Material", type: "core" }];
    } else if (q1Ans === 'opt_A1_apoio') {
       mockResult.inference.headline = "Eixo Possivelmente Ativo: Apoio";
       mockResult.inference.dynamicBands = [{ label: "Suspeita Dominante", value: "Falta de Base Afetiva", type: "core" }];
    } else if (q1Ans === 'opt_A1_liberdade') {
       mockResult.inference.headline = "Eixo Possivelmente Ativo: Liberdade";
       mockResult.inference.dynamicBands = [{ label: "Suspeita Dominante", value: "Aprisionamento ou Dever", type: "core" }];
    }

    // Passamos o totalAnswers para renderResults aplicar máscaras também se necessário
    const totalGivenAnswers = surveyAnswers.reduce((acc, block) => acc + block.answers.length, 0);
    renderResults(mockResult, totalGivenAnswers);
  }
}

// 4. Render Engine Output
function renderResults(data, answersCount) {
  const inf = data.inference;
  const int = data.intervention;

  // Lógica de Thresholds (Prudência Inferencial Frontend)
  // Nível 1: Triagem Inicial (<= 3 questões)
  // Nível 2: Leitura Intermédia (<= 10 questões)
  // Nível 3: Leitura Forte (> 10 questões convergentes)
  const isLevel1 = answersCount <= 3;
  const isLevel2 = answersCount > 3 && answersCount <= 10;

  // Masking para Nível 1 e 2 - Nunca afirmar fechado!
  let displayHeadline = inf.headline;
  let displaySubHeadline = inf.subHeadline;
  let displayBands = inf.dynamicBands;
  let displayPriorities = int.previewPriority;

  if (isLevel1) {
    displayHeadline = "Hipótese Provisória (Nível 1)";
    displaySubHeadline = "Baseado numa triagem curta. " + (inf.headline ? `O eixo possivelmente mais ativo aponta para dinâmicas de ${inf.headline.toLowerCase()}.` : 'Sinal dominante em validação.');
    displayBands = displayBands.map(b => ({...b, label: "Foco sob suspeita", type: "hipótese inicial"}));
    displayPriorities = "Observação do Eixo";
  } else if (isLevel2) {
    displayHeadline = "Sinal Dominante em Validação (Nível 2)";
    displaySubHeadline = `A aprofundar tensões: as primeiras relações apontam convergência em ${inf.headline}. A leitura está ainda incompleta.`;
  }

  document.getElementById('res-latent').innerText = displayHeadline;
  document.getElementById('res-manifest').innerText = displaySubHeadline;

  // Dynamic Bands
  const bandsContainer = document.getElementById('dynamic-bands-container');
  bandsContainer.innerHTML = '';
  displayBands.forEach(band => {
    const bandHTML = `
      <div class="dynamic-band">
        <p class="band-label">${band.type}: ${band.label}</p>
        <p class="band-value">${band.value.replace(/_/g, ' ')}</p>
      </div>
    `;
    bandsContainer.innerHTML += bandHTML;
  });

  // Ambiguity Disclaimer Handler
  const ambiguityEl = document.getElementById('ambiguity-warning');
  if (inf.isLowConfidence && inf.ambiguityDisclaimer) {
    ambiguityEl.innerText = inf.ambiguityDisclaimer;
    ambiguityEl.classList.remove('hidden');
  } else {
    ambiguityEl.classList.add('hidden');
  }

  // Intervention Teaser
  document.getElementById('preview-reading').innerText = int.previewReading;
  document.getElementById('preview-priority').innerText = int.previewPriority;
  document.getElementById('preview-action').innerText = int.previewAction;

  activateScreen(screens.result);
}

// Handle Buy Action (Commercial barrier)
document.getElementById('paywall-btn').addEventListener('click', () => {
  alert("Esta é uma demo Web! Enviar hasPaid=true neste componente libertaria o 'fullPlan' object com roadmaps de 60 dias da Intervenção.");
});
