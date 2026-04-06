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

  // Next Btn state
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'block';
  nextBtn.disabled = true; // wait for selection

  // Restore previous answers if we walked backward
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

  // Determinar GATING POR BLOCOS CONCLUÍDOS e COBERTURA (Regra BLOCO A)
  const blocksAnsweredKeys = surveyAnswers.map(s => s.blockId);
  
  let gateLevel = 1; // "Nível 1 - Triagem Inicial"
  
  if (blocksAnsweredKeys.includes('block_1') && !blocksAnsweredKeys.includes('block_2')) {
      gateLevel = 1; 
  } else if (blocksAnsweredKeys.includes('block_1') && blocksAnsweredKeys.includes('block_2')) {
      gateLevel = 2; // "Leitura Intermédia"
  }
  if (blocksAnsweredKeys.includes('block_1') && blocksAnsweredKeys.includes('block_2') && blocksAnsweredKeys.includes('block_3')) {
      gateLevel = 3; // "Leitura Robusta"
  }
  if (blocksAnsweredKeys.includes('block_1') && blocksAnsweredKeys.includes('block_2') && blocksAnsweredKeys.includes('block_3') && blocksAnsweredKeys.includes('block_4')) {
      gateLevel = 4; // "Leitura Forte Final"
  }
  // Cobertura da Convergência a fazer re-downgrade caso a ambiguidade da rede (V2 Engine) seja enorme
  if (inf.isLowConfidence && gateLevel > 2) gateLevel--;

  let displayHeadline = inf.headline;
  let displaySubHeadline = inf.subHeadline;
  let displayBands = inf.dynamicBands;
  let displayPriorities = int.previewPriority;

  if (gateLevel === 1) {
    displayHeadline = "Hipótese Provisória (Nível 1)";
    displaySubHeadline = `Triagem curta incompleta. O sinal possivelmente mais ativo aponta para ${inf.headline}.`;
    displayBands = displayBands.map(b => ({...b, label: "Foco sob suspeita - Não Verificado", type: "hipótese inicial"}));
  } else if (gateLevel === 2) {
    displayHeadline = "Sinal Dominante em Validação (Nível 2)";
    displaySubHeadline = `Relações convergem provisoriamente em ${inf.headline}. Mapeamento incompleto.`;
    displayBands = displayBands.map(b => ({...b, label: "Tensão Emergente", type: "leitura intermédia"}));
  } else if (gateLevel === 3) {
    displayHeadline = `Leitura Robusta: ${inf.headline}`;
    displaySubHeadline = `Convergência real estabelecida: ${inf.subHeadline}`;
  } else if (gateLevel >= 4) {
    displayHeadline = `Núcleo Existencial: ${inf.headline}`; // Tudo solto - FULL POWER
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
        <p class="band-value" style="text-transform: capitalize;">${band.value.replace(/_/g, ' ')}</p>
      </div>
    `;
    bandsContainer.innerHTML += bandHTML;
  });

  const ambiguityEl = document.getElementById('ambiguity-warning');
  if (inf.isLowConfidence && inf.ambiguityDisclaimer) {
    ambiguityEl.innerText = inf.ambiguityDisclaimer;
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
  alert("Num ambiente real, enviarias um Payload com `{hasPaid: true}` para o Motor V2 para extrair os Roadmaps Finais Guardados na Cloud.");
});
