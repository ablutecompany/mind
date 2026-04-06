// public/app.js

// Hardcoded Demo Questions based on surveyOptionEvidenceDictionary.ts
const DEMO_QUESTIONS = [
  {
    id: "q1",
    blockId: "superficial",
    text: "Neste momento, o que mais limita os teus movimentos reais na vida?",
    options: [
      { id: "opt_A1_dinheiro", text: "Falta de dinheiro para mexer na minha vida." },
      { id: "opt_A1_casa", text: "Falta de espaço ou casa adequada." },
      { id: "opt_A1_relacionamento", text: "Estar presa a uma estrutura relacional ou familiar." },
      { id: "opt_A1_trabalho", text: "Desgaste no trabalho e falta de saída clara." },
      { id: "opt_A1_adiada", text: "Sensação de vida adiada, mesmo sem um problema único." }
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
    renderResults(data);
  } catch (error) {
    console.warn("⚠️ API remota contornada ou falha. Fallback Local Engine ativado:", error.message);
    
    // Fallback local determinístico
    const q1Ans = surveyAnswers.find(b => b.blockId === 'superficial')?.answers[0].selectedOptionId;
    
    let mockResult = {
      inference: {
        headline: "Isolamento Próprio", 
        subHeadline: "Problema no Ambiente Atual",
        isLowConfidence: false,
        ambiguityDisclaimer: null,
        dynamicBands: [
          { label: "Domínio Afetado", value: "Não mapeado", type: "core" }
        ]
      },
      intervention: {
        previewReading: "A API esteve desligada (TestMode), mas calculámos a tua posição localmente.",
        previewPriority: "Foco Estrutural",
        previewAction: "Inicia a fase 1 da reestruturação logística.",
        hasMoreLocked: true
      }
    };

    if (q1Ans === 'opt_A1_dinheiro') {
       mockResult.inference.headline = "Sofrimento pela Escassez";
       mockResult.inference.subHeadline = "O fator financeiro destrói a margem livre";
       mockResult.inference.dynamicBands = [{ label: "Carga Prática", value: "Sobrevivência Financeira", type: "core" }];
    } else if (q1Ans === 'opt_A1_casa') {
       mockResult.inference.headline = "Território Ocupado";
       mockResult.inference.subHeadline = "Restrição de autonomia habitacional";
       mockResult.inference.dynamicBands = [{ label: "Carga Prática", value: "Desterritorialização", type: "core" }];
    } else if (q1Ans === 'opt_A1_relacionamento') {
       mockResult.inference.headline = "Clausura Relacional";
       mockResult.inference.subHeadline = "O vínculo que estagna o movimento";
       mockResult.inference.dynamicBands = [{ label: "Carga Prática", value: "Estrutura Afetiva Pesada", type: "core" }];
    }

    renderResults(mockResult);
  }
}

// 4. Render Engine Output
function renderResults(data) {
  const inf = data.inference;
  const int = data.intervention;

  document.getElementById('res-latent').innerText = inf.headline;
  document.getElementById('res-manifest').innerText = inf.subHeadline;

  // Dynamic Bands
  const bandsContainer = document.getElementById('dynamic-bands-container');
  bandsContainer.innerHTML = '';
  inf.dynamicBands.forEach(band => {
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
