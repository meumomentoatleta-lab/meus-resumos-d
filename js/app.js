/* =========================================
   DADOS
========================================= */

let subjects = [];

let mindmaps = [];

async function loadMindmaps() {
  const response = await fetch("data/subjects.json");

  if (!response.ok) {
    throw new Error("Não foi possível carregar data/subjects.json.");
  }

  const data = await response.json();

  subjects = Array.isArray(data.subjects) ? data.subjects : [];

  const mindmapsBySubject = await Promise.all(
    subjects.map(async (subject) => {
      const mindmapsResponse = await fetch(subject.mindmaps);

      if (!mindmapsResponse.ok) {
        throw new Error(`Não foi possível carregar ${subject.mindmaps}.`);
      }

      const subjectData = await mindmapsResponse.json();
      const subjectMindmaps = Array.isArray(subjectData.mindmaps)
        ? subjectData.mindmaps
        : [];

      return subjectMindmaps.map((map) => ({
        ...map,
        subject: map.subject || subject.name,
      }));
    }),
  );

  mindmaps = mindmapsBySubject.flat();
}

const flashcards = [
  {
    id: 1,
    subject: "Direito Tributário",
    front: "O que é crédito tributário?",
    back: "É o direito do Fisco de exigir o tributo ou penalidade pecuniária.",
  },

  {
    id: 2,
    subject: "Direito Tributário",
    front: "Como o crédito tributário é constituído?",
    back: "O crédito tributário é constituído pelo lançamento.",
  },

  {
    id: 3,
    subject: "Direito Tributário",
    front: "Quais são as modalidades de lançamento?",
    back: "De ofício, por declaração e por homologação.",
  },

  {
    id: 4,
    subject: "Direito Tributário",
    front: "O que suspende a exigibilidade do crédito?",
    back: "Moratória, depósito integral, reclamações, recursos e outras hipóteses do CTN.",
  },

  {
    id: 5,
    subject: "Direito Tributário",
    front: "O que é obrigação tributária principal?",
    back: "Tem por objeto o pagamento do tributo ou penalidade pecuniária.",
  },

  {
    id: 6,
    subject: "Direito Tributário",
    front: "O que é obrigação tributária acessória?",
    back: "É a obrigação de fazer ou não fazer algo no interesse da arrecadação ou fiscalização.",
  },

  {
    id: 7,
    subject: "Direito Constitucional",
    front: "Qual é o fundamento da República no art. 1º?",
    back: "A dignidade da pessoa humana é um dos fundamentos da República.",
  },

  {
    id: 8,
    subject: "Direito Constitucional",
    front: "Quantos Poderes existem no Brasil?",
    back: "Legislativo, Executivo e Judiciário.",
  },

  {
    id: 9,
    subject: "Direito Administrativo",
    front: "Quais são os princípios expressos do art. 37?",
    back: "Legalidade, impessoalidade, moralidade, publicidade e eficiência.",
  },

  {
    id: 10,
    subject: "Direito Administrativo",
    front: "O que significa LIMPE?",
    back: "Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.",
  },
];

/* =========================================
   ESTADO
========================================= */

let currentCards = [];

let currentCardIndex = 0;

let isFlipped = false;

/* =========================================
   LOCAL STORAGE
========================================= */

const STORAGE_KEY = "meus_estudos_progress";

function getProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {};
  }

  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(progress),
  );
}

/* =========================================
   NAVEGAÇÃO
========================================= */

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
  }

  if (pageId === "dashboard") {
    updateDashboard();
  }

  if (pageId === "mindmaps") {
    renderMindmaps();
  }

  if (pageId === "flashcards") {
    startFlashcards();
  }

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
}

/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {
  const progress = getProgress();

  const totalCards = flashcards.length;

  const knownCards = Object.values(progress).filter(
    (item) => item.status === "known",
  ).length;

  const percentage =
    totalCards === 0 ? 0 : Math.round((knownCards / totalCards) * 100);

  document.getElementById("totalMindmaps").textContent = mindmaps.length;

  document.getElementById("totalFlashcards").textContent = totalCards;

  document.getElementById("cardsKnown").textContent = knownCards;

  document.getElementById("studyProgress").textContent = percentage + "%";

  renderSubjects();
}

/* =========================================
   MATÉRIAS
========================================= */

function getSubjects() {
  const subjects = new Set();

  mindmaps.forEach((map) => {
    subjects.add(map.subject);
  });

  flashcards.forEach((card) => {
    subjects.add(card.subject);
  });

  return [...subjects];
}

function renderSubjects() {
  const container = document.getElementById("subjectsDashboard");

  container.innerHTML = "";

  const progress = getProgress();

  getSubjects().forEach((subject) => {
    const subjectCards = flashcards.filter((card) => card.subject === subject);

    const known = subjectCards.filter(
      (card) => progress[card.id]?.status === "known",
    ).length;

    const percentage =
      subjectCards.length === 0
        ? 0
        : Math.round((known / subjectCards.length) * 100);

    const mapCount = mindmaps.filter((map) => map.subject === subject).length;

    const card = document.createElement("div");

    card.className = "subject-card";

    card.innerHTML = `

            <h3>${subject}</h3>

            <div class="subject-info">

                ${mapCount} mind map(s)
                •
                ${subjectCards.length} flashcard(s)

            </div>

            <div class="subject-progress">

                <div
                    style="width:${percentage}%">
                </div>

            </div>

            <div class="subject-info">

                ${percentage}% dominado

            </div>

        `;

    container.appendChild(card);
  });
}

/* =========================================
   MIND MAPS
========================================= */

function renderMindmaps() {
  const container = document.getElementById("mindmapsContainer");

  const search = document.getElementById("mindmapSearch").value.toLowerCase();

  const filtered = mindmaps.filter(
    (map) =>
      map.title.toLowerCase().includes(search) ||
      map.subject.toLowerCase().includes(search),
  );

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `

            <div class="empty-state">

                Nenhum mind map encontrado.

            </div>

        `;

    return;
  }

  const mapsBySubject = new Map();

  filtered.forEach((map) => {
    if (!mapsBySubject.has(map.subject)) {
      mapsBySubject.set(map.subject, []);
    }

    mapsBySubject.get(map.subject).push(map);
  });

  mapsBySubject.forEach((subjectMindmaps, subject) => {
    const group = document.createElement("section");

    group.className = "mindmap-group";

    const heading = document.createElement("h2");

    heading.textContent = subject;

    group.appendChild(heading);

    const grid = document.createElement("div");

    grid.className = "content-grid";

    subjectMindmaps.forEach((map) => {
      const card = document.createElement(map.available ? "a" : "div");

      card.className = "mindmap-card";

      if (map.available) {
        card.href = map.path;
      }

      card.innerHTML = `

            <div class="mindmap-icon">

                ${map.icon || "🧠"}

            </div>

            <h3>

                ${map.title}

            </h3>

            <p>

                ${map.description || ""}

            </p>

            <span class="tag">

                ${map.subject}

            </span>

        `;

      grid.appendChild(card);
    });

    group.appendChild(grid);

    container.appendChild(group);
  });
}

/* =========================================
   FLASHCARDS
========================================= */

function populateSubjects() {
  const select = document.getElementById("flashcardSubject");

  const subjects = getSubjects();

  subjects.forEach((subject) => {
    const option = document.createElement("option");

    option.value = subject;

    option.textContent = subject;

    select.appendChild(option);
  });
}

function startFlashcards() {
  const select = document.getElementById("flashcardSubject");

  const subject = select.value;

  if (subject === "all") {
    currentCards = [...flashcards];
  } else {
    currentCards = flashcards.filter((card) => card.subject === subject);
  }

  currentCardIndex = 0;

  isFlipped = false;

  showCurrentCard();
}

function showCurrentCard() {
  const flashcard = document.getElementById("flashcard");

  if (currentCards.length === 0) {
    return;
  }

  flashcard.classList.remove("flipped");

  isFlipped = false;

  const card = currentCards[currentCardIndex];

  document.getElementById("cardFront").textContent = card.front;

  document.getElementById("cardBack").textContent = card.back;

  document.getElementById("cardCounter").textContent =
    `Card ${currentCardIndex + 1}
         de ${currentCards.length}`;

  const percentage = Math.round((currentCardIndex / currentCards.length) * 100);

  document.getElementById("sessionProgress").textContent = percentage + "%";

  document.getElementById("sessionProgressBar").style.width = percentage + "%";
}

function flipCard() {
  const flashcard = document.getElementById("flashcard");

  isFlipped = !isFlipped;

  flashcard.classList.toggle("flipped", isFlipped);
}

function nextCard(event) {
  if (event) {
    event.stopPropagation();
  }

  if (currentCardIndex < currentCards.length - 1) {
    currentCardIndex++;
  } else {
    currentCardIndex = 0;
  }

  showCurrentCard();
}

function markCard(known, event) {
  if (event) {
    event.stopPropagation();
  }

  if (currentCards.length === 0) {
    return;
  }

  const card = currentCards[currentCardIndex];

  const progress = getProgress();

  progress[card.id] = {
    status: known ? "known" : "unknown",

    date: new Date().toISOString(),
  };

  saveProgress(progress);

  nextCard();

  updateDashboard();
}

/* =========================================
   BUSCA GLOBAL
========================================= */

function globalSearch() {
  const input = document.getElementById("globalSearch");

  const query = input.value.trim().toLowerCase();

  if (!query) {
    return;
  }

  showPage("search");

  const results = document.getElementById("searchResults");

  results.innerHTML = "";

  const maps = mindmaps.filter((map) =>
    `${map.title}
             ${map.subject}
             ${map.description}`

      .toLowerCase()
      .includes(query),
  );

  const cards = flashcards.filter((card) =>
    `${card.front}
             ${card.back}
             ${card.subject}`

      .toLowerCase()
      .includes(query),
  );

  document.getElementById("searchDescription").textContent =
    `${maps.length} mind map(s)
         e ${cards.length} flashcard(s)
         encontrados.`;

  maps.forEach((map) => {
    const item = document.createElement("div");

    item.className = "mindmap-card";

    item.innerHTML = `

            <div class="mindmap-icon">

                ${map.icon || "🧠"}

            </div>

            <h3>

                ${map.title}

            </h3>

            <p>

                ${map.description || ""}

            </p>

            <span class="tag">

                ${map.subject}

            </span>

        `;

    results.appendChild(item);
  });

  cards.forEach((card) => {
    const item = document.createElement("div");

    item.className = "mindmap-card";

    item.innerHTML = `

            <div class="mindmap-icon">

                🃏

            </div>

            <h3>

                ${card.front}

            </h3>

            <p>

                ${card.back}

            </p>

            <span class="tag">

                ${card.subject}

            </span>

        `;

    results.appendChild(item);
  });
}

/* =========================================
   DARK MODE
========================================= */

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  localStorage.setItem("darkMode", dark);
}

function loadDarkMode() {
  const dark = localStorage.getItem("darkMode");

  if (dark === "true") {
    document.body.classList.add("dark");
  }
}

/* =========================================
   TECLADO
========================================= */

document.addEventListener("keydown", function (event) {
  if (!document.getElementById("flashcards").classList.contains("active")) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();

    flipCard();
  }

  if (event.key === "ArrowRight") {
    markCard(true);
  }

  if (event.key === "ArrowLeft") {
    markCard(false);
  }
});

/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", async function () {
  try {
    await loadMindmaps();
  } catch (error) {
    console.error(error);
  }

  populateSubjects();

  updateDashboard();

  renderMindmaps();

  loadDarkMode();

  startFlashcards();
});
