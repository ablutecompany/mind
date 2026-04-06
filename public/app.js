// public/app.js
let currentStep = 0;
let surveyAnswers = []; // holds objects: { blockId, answers: [{ questionId, selectedOptionId }] }
let currentQuestionSelections = new Set();
let testerFeedback = []; // Holds the feedback issues

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
  testerFeedback = [];
  currentQuestionSelections.clear();
  loadQuestion();
  activateScreen(screens.question);
});

// 2. Load Question View
function loadQuestion() {
  if (currentStep >= SURVEY_QUESTIONS.length) {
    submitEvaluation();
    return;
  }

  const q = SURVEY_QUESTIONS[currentStep];
  document.getElementById('question-text').innerText = q.text;

  let maxText = q.maxSelections > 1 ? `(Escolhe até ${q.maxSelections} opções)` : `(Escolhe apenas 1 opção)`;
  document.getElementById('question-instruction').innerText = `Bloco: ${SURVEY_BLOCKS[q.blockId].title} - ${maxText}`;
  
  // Progress Bar
  const progressPerc = ((currentStep) / SURVEY_QUESTIONS.length) * 100;
  document.getElementById('progress-bar').style.width = progressPerc + '%';

  // Navigation Logic
  document.getElementById('back-btn').style.display = currentStep > 0 ? 'block' : 'none';

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
      const answersForThisQ = existingBlockObj.answers.filter(a => a.questionId === q.id);
      answersForThisQ.forEach(a => currentQuestionSelections.add(a.selectedOptionId));
  }

  if(currentQuestionSelections.size > 0) nextBtn.disabled = false;

  const container = document.getElementById('options-container');
  container.innerHTML = ''; // clear previous

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = currentQuestionSelections.has(opt.id) ? 'option-btn selected' : 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => handleToggleOption(q, opt.id, btn);
    container.appendChild(btn);
  });

  document.getElementById('feedback-drawer').classList.add('hidden');
}

function handleToggleOption(question, optId, btnEl) {
    if (currentQuestionSelections.has(optId)) {
        currentQuestionSelections.delete(optId);
        btnEl.classList.remove('selected');
    } else {
        if (currentQuestionSelections.size >= question.maxSelections) {
            // Se as selecções estão maxed e é de selecção única, faz toggle (substitui)
            if (question.maxSelections === 1) {
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
    
    // Find or construct Block Object
    let blockObj = surveyAnswers.find(s => s.blockId === q.blockId);
    if (!blockObj) {
        blockObj = { blockId: q.blockId, answers: [] };
        surveyAnswers.push(blockObj);
    }
    
    // Destrói as da Q atual e reescreve
    blockObj.answers = blockObj.answers.filter(a => a.questionId !== q.id);
    currentQuestionSelections.forEach(optId => {
        blockObj.answers.push({ questionId: q.id, selectedOptionId: optId });
    });

    currentStep++;
    loadQuestion();
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
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

    testerFeedback.push({
        timestamp: new Date().toISOString(),
        blockId: q.blockId,
        questionId: q.id,
        questionText: q.text,
        issueType,
        comment,
        currentSelections: Array.from(currentQuestionSelections)
    });

    alert("Feedback guardado!");
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
    alert("Falhou o envio para o motor. Verifica os logs ou tenta com o Fallback Ativado.");
  }
}

// 4. Render Engine Output com NIVEIS de PRUDENCIA
function renderResults(data) {
  const inf = data.inference;
  const int = data.intervention;

  let displayHeadline = "Hipótese Provisória";
  let displaySubHeadline = inf.provisionalSummary;
  let dynamicBlocksHTML = '';

  if (inf.readingDepth === 1) {
    displayHeadline = `Nível 1 (Triagem): Eixo em Validação (${inf.dominantAxis || 'misto'})`;
  } else if (inf.readingDepth === 2) {
    displayHeadline = `Nível 2 (Intermédio): Sinal Dominante - ${inf.dominantAxis || 'Névoa'}`;
  } else if (inf.readingDepth >= 3) {
    if (inf.confidenceLevel === 'forte' || inf.confidenceLevel === 'boa') {
      displayHeadline = `Leitura Robusta Nível ${inf.readingDepth}: Tensão de ${inf.dominantAxis}`;
      if (inf.strongSummary) displaySubHeadline = inf.strongSummary;
    } else {
      displayHeadline = `Aviso: Baixa Diferenciação nos Dados (Profundidade: ${inf.readingDepth})`;
    }
  }

  document.getElementById('res-latent').innerText = displayHeadline;
  document.getElementById('res-manifest').innerText = displaySubHeadline;

  const bandsContainer = document.getElementById('dynamic-bands-container');
  bandsContainer.innerHTML = '';
  
  if (inf.convergenceSignals && inf.convergenceSignals.length > 0) {
      inf.convergenceSignals.forEach(sig => {
        bandsContainer.innerHTML += `<div class="dynamic-band"><p class="band-label">Sinal de Convergência</p><p class="band-value">${sig}</p></div>`;
      });
  } else {
      bandsContainer.innerHTML += `<div class="dynamic-band"><p class="band-label">Sinalização</p><p class="band-value">Inobservável</p></div>`;
  }

  const ambiguityEl = document.getElementById('ambiguity-warning');
  if (inf.lowDifferentiation) {
    ambiguityEl.innerText = "ALERTA: Baixa Diferenciação. O motor deteta dispersão de respostas ou névoa estrutural.";
    ambiguityEl.classList.remove('hidden');
  } else {
    ambiguityEl.classList.add('hidden');
  }

  document.getElementById('preview-reading').innerText = int.previewReading;
  document.getElementById('preview-priority').innerText = int.previewPriority;
  document.getElementById('preview-action').innerText = int.previewAction;

  activateScreen(screens.result);
}

// 5. Export Logic (BLOCO 4 - stateless download)
document.getElementById('export-feedback-btn').addEventListener('click', () => {
    if (testerFeedback.length === 0) {
        alert("Não criaste nenhum registo de problema (nenhum clique no botão amarelo de report).");
        return;
    }
    // Convert to CSV
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
    a.setAttribute('download', 'mind-tester-feedback.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
