// public/app.js
let currentStep = 0;
let surveyAnswers = []; // holds objects: { blockId, answers: [{ questionId, selectedOptionId }] }
let currentQuestionSelections = new Set();
let testerFeedback = []; // Holds the feedback issues

const APP_VERSION = "1.1.0-RC";
const SESSION_ID = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 10);

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

// State Persistence Logic
function saveLocalState() {
  const state = {
    currentStep,
    surveyAnswers,
    testerFeedback,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('mind_session', JSON.stringify(state));
}

function loadLocalState() {
  const saved = localStorage.getItem('mind_session');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Validate
      if (typeof parsed.currentStep === 'number' && Array.isArray(parsed.surveyAnswers)) {
        currentStep = parsed.currentStep;
        surveyAnswers = parsed.surveyAnswers;
        testerFeedback = parsed.testerFeedback || [];
        return true;
      }
    } catch (e) {
      console.warn("Sessão corrompida, a limpar.");
      localStorage.removeItem('mind_session');
    }
  }
  return false;
}

function clearLocalState() {
  localStorage.removeItem('mind_session');
  currentStep = 0;
  surveyAnswers = [];
  testerFeedback = [];
  currentQuestionSelections.clear();
}

// 1. Start Click
document.getElementById('start-btn').addEventListener('click', () => {
  clearLocalState();
  loadQuestion();
  activateScreen(screens.question);
});

document.getElementById('resume-btn')?.addEventListener('click', () => {
  if (loadLocalState()) {
    currentQuestionSelections.clear();
    loadQuestion();
    activateScreen(screens.question);
  } else {
    alert("Falha ao recuperar sessão. Inicia uma nova.");
  }
});

document.getElementById('clear-btn')?.addEventListener('click', () => {
  clearLocalState();
  document.getElementById('resume-container').classList.add('hidden');
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('mind_session')) {
    const resumeContainer = document.getElementById('resume-container');
    if(resumeContainer) resumeContainer.classList.remove('hidden');
  }
});

// 2. Load Question View
function loadQuestion() {
  if (currentStep >= SURVEY_QUESTIONS.length) {
    submitEvaluation();
    return;
  }

  const q = SURVEY_QUESTIONS[currentStep];
  document.getElementById('question-text').innerText = q.prompt || q.text;

  const maxSelect = q.maxSelections || 1;
  let maxText = maxSelect > 1 ? `(Escolhe até ${maxSelect} opções)` : `(Escolhe apenas 1 opção)`;
  const blockNum = q.blockId.split('_')[1];
  document.getElementById('question-instruction').innerText = `Bloco ${blockNum}: ${SURVEY_BLOCKS[blockNum].title} - ${maxText}`;
  
  // Progress Bar
  const progressPerc = ((currentStep) / SURVEY_QUESTIONS.length) * 100;
  document.getElementById('progress-bar').style.width = progressPerc + '%';

  // Navigation Logic
  // Go back effectively ignores branching history and just goes 1 index back sequentially or needs a previous step tracker.
  // For simplicity and auditability: find the last answered step.
  const answeredSteps = [];
  SURVEY_QUESTIONS.forEach((sq, idx) => {
      const bObj = surveyAnswers.find(b => b.blockId === sq.blockId);
      if (bObj && bObj.answers.find(a => (a.questionId === sq.questionId || a.questionId === sq.id))) {
          if (idx < currentStep) answeredSteps.push(idx);
      }
  });
  
  const backBtn = document.getElementById('back-btn');
  backBtn.style.display = answeredSteps.length > 0 ? 'block' : 'none';
  backBtn.onclick = () => {
      if(answeredSteps.length > 0) {
          currentStep = answeredSteps[answeredSteps.length - 1];
          loadQuestion();
      }
  };

  // Next Btn and Middle Submit state
  const nextBtn = document.getElementById('next-btn');
  const midSubmitContainer = document.getElementById('mid-submit-container');
  nextBtn.style.display = 'block';
  nextBtn.innerText = 'Seguinte';
  nextBtn.disabled = true; // wait for selection

  if (midSubmitContainer) midSubmitContainer.innerHTML = ''; // reset

  // Calculate if we should show a partial submit button alongside NEXT
  let isBoundary = false;
  let boundaryLabel = "";
  if (q.blockId === 'block_4' && SURVEY_QUESTIONS[currentStep + 1]?.blockId === 'block_5') {
      isBoundary = true; boundaryLabel = "Terminar com Leitura Parcial";
  } else if (q.blockId === 'block_7' && SURVEY_QUESTIONS[currentStep + 1]?.blockId === 'block_8') {
      isBoundary = true; boundaryLabel = "Terminar com Leitura Aprofundada";
  } else if (q.blockId === 'block_10' && !SURVEY_QUESTIONS[currentStep + 1]) {
      nextBtn.innerText = "Submeter Leitura Completa"; // End of survey
  }

  if (isBoundary && midSubmitContainer) {
      const midBtn = document.createElement('button');
      midBtn.className = "ghost-btn mt-4";
      midBtn.style.width = "100%";
      midBtn.innerText = boundaryLabel;
      midBtn.onclick = () => submitEvaluation();
      midSubmitContainer.appendChild(midBtn);
  }

  // Restore previous answers se voltámos atrás
  currentQuestionSelections.clear();
  const existingBlockObj = surveyAnswers.find(s => s.blockId === q.blockId);
  if (existingBlockObj) {
      const qId = q.questionId || q.id;
      const answersForThisQ = existingBlockObj.answers.filter(a => a.questionId === qId);
      answersForThisQ.forEach(a => currentQuestionSelections.add(a.selectedOptionId));
  }

  if(currentQuestionSelections.size > 0) nextBtn.disabled = false;

  const container = document.getElementById('options-container');
  container.innerHTML = ''; // clear previous

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    const optId = opt.optionId || opt.id;
    btn.className = currentQuestionSelections.has(optId) ? 'option-btn selected' : 'option-btn';
    btn.innerText = opt.label || opt.text;
    btn.onclick = () => handleToggleOption(q, optId, btn);
    container.appendChild(btn);
  });

  document.getElementById('feedback-drawer').classList.add('hidden');
}

function handleToggleOption(question, optId, btnEl) {
  const maxSelect = question.maxSelections || 1;
  if (currentQuestionSelections.has(optId)) {
        currentQuestionSelections.delete(optId);
        btnEl.classList.remove('selected');
    } else {
        if (currentQuestionSelections.size >= maxSelect) {
            // Se as selecções estão maxed e é de selecção única, faz toggle (substitui)
            if (maxSelect === 1) {
                currentQuestionSelections.clear();
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                currentQuestionSelections.add(optId);
                btnEl.classList.add('selected');
            } else {
                return; // Max reached
            }
        } else {
            currentQuestionSelections.add(optId);
            btnEl.classList.add('selected');
        }
    }

    document.getElementById('next-btn').disabled = currentQuestionSelections.size === 0;
}

document.getElementById('next-btn').addEventListener('click', () => {
  const q = SURVEY_QUESTIONS[currentStep];
  const qId = q.questionId || q.id;

  let blockObjStr = surveyAnswers.find(b => b.blockId === q.blockId);
  if (!blockObjStr) {
      blockObjStr = { blockId: q.blockId, answers: [] };
      surveyAnswers.push(blockObjStr);
  }

  // filter any previous answers for this question
  blockObjStr.answers = blockObjStr.answers.filter(a => a.questionId !== qId);

  // add current
  currentQuestionSelections.forEach(optStringId => {
      blockObjStr.answers.push({ questionId: qId, selectedOptionId: optStringId });
  });

  // Calculate next eligible step using signals
  const signals = getAccumulatedSignals();
  let nextStep = currentStep + 1;
  while(nextStep < SURVEY_QUESTIONS.length) {
      const nextQ = SURVEY_QUESTIONS[nextStep];
      if (!nextQ.dependsOnSignals || nextQ.dependsOnSignals.length === 0) {
          break; // Always show if no dependencies
      }
      // Check if any required signal is present
      const hasRequiredSignal = nextQ.dependsOnSignals.some(sig => signals.has(sig));
      if (hasRequiredSignal) {
          break; // Required signal found, stop and ask this question
      }
      nextStep++; // Skip
  }

  currentStep = nextStep;
  saveLocalState();
  
  if (currentStep >= SURVEY_QUESTIONS.length) {
    submitEvaluation();
  } else {
    loadQuestion();
  }
});

function getAccumulatedSignals() {
    const signals = new Set();
    surveyAnswers.forEach(b => {
        b.answers.forEach(a => {
            const q = SURVEY_QUESTIONS.find(sq => sq.questionId === a.questionId || sq.id === a.questionId);
            if (q) {
                const opt = q.options.find(o => (o.optionId || o.id) === a.selectedOptionId);
                if (opt && opt.signalTags) {
                    opt.signalTags.forEach(tag => signals.add(tag));
                }
            }
        });
    });
    return signals;
}

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        saveLocalState();
        loadQuestion();
    }
});

// Feedback Logic
document.getElementById('feedback-btn').addEventListener('click', () => {
    document.getElementById('feedback-drawer').classList.toggle('hidden');
});

document.getElementById('cancel-feedback-btn').addEventListener('click', () => {
    document.getElementById('feedback-drawer').classList.add('hidden');
});

document.getElementById('save-feedback-btn').addEventListener('click', () => {
    const q = SURVEY_QUESTIONS[currentStep];

    const issueType = document.getElementById('issue-type').value;
    const comment = document.getElementById('issue-comment').value;

    const optionsShownStr = q.options.map(o => o.text).join(' | ');
    const selectedAnswersStr = Array.from(currentQuestionSelections).map(optId => {
        const found = q.options.find(o => o.id === optId);
        return found ? found.text : optId;
    }).join(' | ');

    testerFeedback.push({
        appVersion: APP_VERSION,
        sessionId: SESSION_ID,
        timestamp: new Date().toISOString(),
        blockId: q.blockId,
        questionId: q.id,
        questionText: q.text,
        optionsShown: optionsShownStr,
        selectedAnswers: selectedAnswersStr,
        issueType,
        comment
    });

    alert("Feedback guardado!");
    saveLocalState(); // persist feedback locally too
    document.getElementById('feedback-drawer').classList.add('hidden');
    document.getElementById('issue-comment').value = '';
});

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API Gateway retornou erro ${response.status}`);
    }

    const data = await response.json();
    console.log("[Demo Frontend] Resposta Recebida:", data);
    renderResults(data);
  } catch (error) {
    console.error("Erro Crítico da API:", error);
    
    // Fallback/Modo Degradado
    alert("Aviso Modo Degradado: Falha de comunicação com o servidor.\nO teu progresso está todo guardado localmente neste dispositivo.\nPodes atualizar a página e premir 'Retomar Progresso' mais tarde, ou tentar Re-submeter.");
    
    // Reverter UI de forma segura
    document.getElementById('progress-bar').style.width = ((currentStep) / SURVEY_QUESTIONS.length) * 100 + '%';
    activateScreen(screens.question);
  }
}

// 4. Render Engine Output com NIVEIS de PRUDENCIA
function renderResults(data) {
  const inf = data.inference;
  const int = data.intervention;

  // Garantia absoluta de que "eixo dominante" e raw convergence não vazam tautologia
  const container = document.getElementById('narrative-container');
  container.innerHTML = ''; 

  if (inf.readingDepth === 1) {
    // Apenas submeteu B1 incompleto ou muito fraco (Misto)
    container.innerHTML = `<h3 style="color:#8b949e">Triagem Preliminar</h3><p class="preview-reading">A quantidade de dados inserida ainda não compila um perfil estabilizado. Avança para a Leitura Aprofundada.</p>`;
  } else if (inf.narrative) {
    // Rendering the 5 layers of Narrative
    const { superficie, simbolismo, roubo, nucleo, sintese } = inf.narrative;
    
    // Header dinâmico dependendo da profundidade e confiança
    let depthTitle = "Leitura Parcial";
    if (inf.readingDepth >= 7) depthTitle = "Leitura Aprofundada";
    if (inf.readingDepth >= 10) depthTitle = "Leitura Completa";
    
    let outcomeHtml = `
      <h3 style="color:#d29922; margin-bottom: 2rem;">[ ${depthTitle} ]</h3>
      
      <p class="section-label">1. À SUPERFÍCIE</p>
      <p style="color:#c9d1d9; font-size:1.1rem; line-height:1.6; margin-bottom: 2rem;">${superficie || ''}</p>
      
      <p class="section-label">2. O SINAL LATENTE</p>
      <p style="color:#c9d1d9; font-size:1.1rem; line-height:1.6; margin-bottom: 2rem;">${simbolismo || ''}</p>
      
      <p class="section-label">3. O QUE TE ESTÁ A CUSTAR</p>
      <p style="color:#c9d1d9; font-size:1.1rem; line-height:1.6; margin-bottom: 2rem; border-left: 3px solid #cb2431; padding-left: 14px;">${roubo || ''}</p>
      
      <p class="section-label" style="color: #bc8cff;">4. NÚCLEO ORGANIZADOR</p>
      <p style="color:#c9d1d9; font-size:1.1rem; line-height:1.6; margin-bottom: 2rem; border-left: 3px solid #bc8cff; padding-left: 14px;">${nucleo || ''}</p>
      
      <div class="intervention-teaser" style="background:#0d1117; border: 1px solid #30363d; border-left: 4px solid #58a6ff;">
         <p class="section-label" style="color:#58a6ff;">SÍNTESE DA TENSÃO</p>
         <h2 style="font-size:1.5rem; color:#fff; margin-bottom:0; font-style: italic;">“${sintese || ''}”</h2>
      </div>
    `;
    container.innerHTML = outcomeHtml;
  }

  const ambiguityEl = document.getElementById('ambiguity-warning');
  if (inf.lowDifferentiation) {
    ambiguityEl.innerText = "ALERTA DA MÁQUINA: Padrão difuso. As tuas peças rodam entre eixos sem estabilizar um centro. Sugere elevado ruído base.";
    ambiguityEl.classList.remove('hidden');
  } else {
    ambiguityEl.classList.add('hidden');
  }


  activateScreen(screens.result);
}

// 5. Export Logic (BLOCO 4 - stateless download)
document.getElementById('export-feedback-btn').addEventListener('click', () => {
    if (testerFeedback.length === 0) {
        alert("Não criaste nenhum registo de problema (nenhum clique no botão amarelo de report).");
        return;
    }
    
    // Choose format
    const format = confirm("Pressiona OK para transferir JSon. Pressiona Cancelar para transferir CSV.") ? 'json' : 'csv';

    if (format === 'csv') {
      const replacer = (key, value) => value === null ? '' : value;
      const header = Object.keys(testerFeedback[0]);
      const csv = [
        header.join(','),
        ...testerFeedback.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `mind-feedback-${SESSION_ID}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([JSON.stringify(testerFeedback, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `mind-feedback-${SESSION_ID}.json`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
});

document.getElementById('paywall-btn').addEventListener('click', () => {
  const isConfident = document.getElementById('res-latent').innerText.includes('Leitura Robusta') || 
                      document.getElementById('res-latent').innerText.includes('Núcleo Existencial');
  
  if (isConfident) {
      alert("Acesso Autorizado ao Relatório de 60 Dias. A intervenção pode prosseguir porque a raiz psicológica está blindada.");
  } else {
      alert("Relatório de 60 dias Bloqueado.\nO Centro ainda não está estabilizado. Apenas recebes sugestões iniciais e exercícios de clarificação. (Confidence < Boa)");
  }
});
