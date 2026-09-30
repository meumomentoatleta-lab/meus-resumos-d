/* =========================================
   DADOS
========================================= */

let subjects = [];

let mindmaps = [];

let flashcards = [];

let summaryDocuments = [];

async function loadSubjectCollection(subject, pathKey, dataKey) {
  const response = await fetch(subject[pathKey]);

  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${subject[pathKey]}.`);
  }

  const data = await response.json();
  const items = Array.isArray(data[dataKey]) ? data[dataKey] : [];

  return items.map((item) => ({
    ...item,
    subject: item.subject || data.subject || subject.name,
  }));
}

async function loadStudyData() {
  const response = await fetch("data/subjects.json");

  if (!response.ok) {
    throw new Error("Não foi possível carregar data/subjects.json.");
  }

  const data = await response.json();

  subjects = Array.isArray(data.subjects) ? data.subjects : [];

  const [mindmapsBySubject, flashcardsBySubject] = await Promise.all([
    Promise.all(
      subjects.map((subject) =>
        loadSubjectCollection(subject, "mindmaps", "mindmaps"),
      ),
    ),
    Promise.all(
      subjects.map((subject) =>
        loadSubjectCollection(subject, "flashcards", "cards"),
      ),
    ),
  ]);

  mindmaps = mindmapsBySubject.flat();

  flashcards = flashcardsBySubject.flat();
}

async function loadSummaries() {
  const configuredSubjects = subjects.filter((subject) => subject.summary);

  const loadedSummaries = await Promise.all(
    configuredSubjects.map(async (subject) => {
      try {
        const summaryUrl = new URL(subject.summary, window.location.href);
        const summariesRoot = new URL("resumos/", window.location.href);

        if (
          summaryUrl.origin !== window.location.origin ||
          !summaryUrl.pathname.startsWith(summariesRoot.pathname)
        ) {
          throw new Error("Os resumos devem estar na pasta local resumos/.");
        }

        const response = await fetch(summaryUrl);

        if (!response.ok) {
          throw new Error(`Não foi possível carregar ${subject.summary}.`);
        }

        return {
          subject: subject.name,
          path: subject.summary,
          markdown: await response.text(),
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
  );

  summaryDocuments = loadedSummaries.filter(Boolean);
}

function getCardProgressKey(card) {
  return JSON.stringify([card.subject, card.id]);
}

function getCardProgress(card, progress) {
  const progressKey = getCardProgressKey(card);

  if (progress[progressKey]) {
    return progress[progressKey];
  }

  const legacyKeys = [card.id, card.legacyId].filter((key) => key != null);

  for (const legacyKey of legacyKeys) {
    const matchingCards = flashcards.filter(
      (candidate) =>
        candidate.id === legacyKey || candidate.legacyId === legacyKey,
    );

    if (matchingCards.length === 1 && progress[legacyKey]) {
      return progress[legacyKey];
    }
  }
}

/* =========================================
   ESTADO
========================================= */

let currentCards = [];

let currentCardIndex = 0;

let isFlipped = false;

/* =========================================
   PROGRESSO DIÁRIO
========================================= */

const STORAGE_KEY = "meus_estudos_progress";

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getProgress() {
  const saved = sessionStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {};
  }

  try {
    const stored = JSON.parse(saved);

    if (
      stored.date !== getLocalDateKey() ||
      typeof stored.progress !== "object" ||
      stored.progress === null
    ) {
      sessionStorage.removeItem(STORAGE_KEY);
      return {};
    }

    return stored.progress;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function saveProgress(progress) {
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      date: getLocalDateKey(),
      progress,
    }),
  );
}

function scheduleDailyProgressReset() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  window.setTimeout(
    () => {
      sessionStorage.removeItem(STORAGE_KEY);
      updateDashboard();
      scheduleDailyProgressReset();
    },
    nextMidnight.getTime() - now.getTime() + 50,
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

  if (pageId === "summaries") {
    renderSummary();
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

  const knownCards = flashcards.filter(
    (card) => getCardProgress(card, progress)?.status === "known",
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
  const subjectNames = new Set(subjects.map((subject) => subject.name));

  mindmaps.forEach((map) => {
    subjectNames.add(map.subject);
  });

  flashcards.forEach((card) => {
    subjectNames.add(card.subject);
  });

  return [...subjectNames];
}

function renderSubjects() {
  const container = document.getElementById("subjectsDashboard");

  container.innerHTML = "";

  const progress = getProgress();

  getSubjects().forEach((subject) => {
    const subjectCards = flashcards.filter((card) => card.subject === subject);

    const known = subjectCards.filter(
      (card) => getCardProgress(card, progress)?.status === "known",
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

function populateSummarySubjects() {
  const select = document.getElementById("summarySubject");

  select.replaceChildren();

  summaryDocuments.forEach((summary) => {
    const option = document.createElement("option");

    option.value = summary.path;
    option.textContent = summary.subject;

    select.appendChild(option);
  });

  select.disabled = summaryDocuments.length === 0;

  renderSummary();
}

function renderSummary() {
  const select = document.getElementById("summarySubject");
  const viewer = document.getElementById("summaryContent");
  const summary = summaryDocuments.find((item) => item.path === select.value);

  viewer.replaceChildren();

  if (!summary) {
    viewer.textContent = "Nenhum resumo Markdown está cadastrado.";
    return;
  }

  if (!window.marked || !window.DOMPurify) {
    viewer.textContent = summary.markdown;
    return;
  }

  viewer.innerHTML = window.DOMPurify.sanitize(
    window.marked.parse(summary.markdown),
  );
}

/* =========================================
   FLASHCARDS
========================================= */

function populateSubjects() {
  const select = document.getElementById("flashcardSubject");

  const subjectsWithCards = [
    ...new Set(flashcards.map((card) => card.subject)),
  ];

  subjectsWithCards.forEach((subject) => {
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

function previousCard() {
  if (currentCards.length === 0) {
    return;
  }

  currentCardIndex =
    currentCardIndex > 0 ? currentCardIndex - 1 : currentCards.length - 1;

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

  progress[getCardProgressKey(card)] = {
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

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousCard();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    markCard(true);
  }

  if (event.key.toLowerCase() === "n") {
    event.preventDefault();
    markCard(false);
  }
});

/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener("DOMContentLoaded", async function () {
  scheduleDailyProgressReset();

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      updateDashboard();
    }
  });

  try {
    await loadStudyData();
    await loadSummaries();
  } catch (error) {
    console.error(error);
  }

  populateSubjects();
  populateSummarySubjects();

  updateDashboard();

  renderMindmaps();

  loadDarkMode();

  startFlashcards();
});
