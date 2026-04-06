// public/app.js

// Hardcoded Demo Questions based on surveyOptionEvidenceDictionary.ts
const DEMO_QUESTIONS = [
  {
    id: "q1",
    blockId: "superficial",
    text: "Qual é a tua maior reação sob pressão momentânea?",
    options: [
      { id: "opt_A1_fuga", text: "Tento fugir fisicamente ou ignorar o problema." },
      { id: "opt_A2_adiar", text: "Adio inevitavelmente até não ter mais margem." },
      { id: "opt_A3_vergonha", text: "Fico com medo de parecer incompetente." }
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

  try {
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
    alert("Falha de Comunicação: " + error.message);
    activateScreen(screens.landing);
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
