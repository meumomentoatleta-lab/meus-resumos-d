/* =========================================
   DADOS
========================================= */

let subjects = [];

let mindmaps = [];

let flashcards = [];

let summaryDocuments = [];

let selectedSummaryPath = "";

let contestEntries = [];

async function loadConcursos() {
  const response = await fetch("data/concursos/concursos.json");

  if (!response.ok) {
    throw new Error("Não foi possível carregar data/concursos/concursos.json.");
  }

  const data = await response.json();
  contestEntries = Array.isArray(data.concursos) ? data.concursos : [];
}

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
  const summariesBySubject = await Promise.all(
    subjects.map(async (subject) => {
      try {
        if (!subject.summaries) {
          return [];
        }

        const catalogUrl = new URL(subject.summaries, window.location.href);
        const catalogRoot = new URL("data/summaries/", window.location.href);

        if (
          catalogUrl.origin !== window.location.origin ||
          !catalogUrl.pathname.startsWith(catalogRoot.pathname)
        ) {
          throw new Error(
            "Os índices de resumo devem estar em data/summaries/.",
          );
        }

        const catalogResponse = await fetch(catalogUrl);

        if (!catalogResponse.ok) {
          throw new Error(`Não foi possível carregar ${subject.summaries}.`);
        }

        const catalog = await catalogResponse.json();
        const entries = Array.isArray(catalog.summaries)
          ? catalog.summaries
          : [];
        const summariesRoot = new URL("resumos/", window.location.href);

        return await Promise.all(
          entries
            .filter(
              (entry) =>
                typeof entry.title === "string" &&
                typeof entry.path === "string" &&
                entry.path.trim(),
            )
            .map(async (entry) => {
              try {
                const summaryUrl = new URL(entry.path, window.location.href);

                if (
                  summaryUrl.origin !== window.location.origin ||
                  !summaryUrl.pathname.startsWith(summariesRoot.pathname)
                ) {
                  throw new Error("Os resumos devem estar na pasta resumos/.");
                }

                const response = await fetch(summaryUrl);

                if (!response.ok) {
                  throw new Error(`Não foi possível carregar ${entry.path}.`);
                }

                return {
                  subjectId: subject.id,
                  subject: subject.name,
                  path: entry.path,
                  title: entry.title,
                  markdown: await response.text(),
                };
              } catch (error) {
                console.error(error);
                return null;
              }
            }),
        ).then((entries) => entries.filter(Boolean));
      } catch (error) {
        console.error(error);
        return [];
      }
    }),
  );

  summaryDocuments = summariesBySubject.flat();
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

  if (pageId === "concursos") {
    renderConcursos();
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
  const availableSubjects = new Map();

  select.replaceChildren();

  summaryDocuments.forEach((summary) => {
    if (!availableSubjects.has(summary.subjectId)) {
      availableSubjects.set(summary.subjectId, summary.subject);
    }
  });

  availableSubjects.forEach((subjectName, subjectId) => {
    const option = document.createElement("option");

    option.value = subjectId;
    option.textContent = subjectName;

    select.appendChild(option);
  });

  select.disabled = summaryDocuments.length === 0;

  renderSummary();
}

function renderSummary() {
  const select = document.getElementById("summarySubject");
  const summaryCards = document.getElementById("summaryCards");
  const viewer = document.getElementById("summaryContent");
  const selectedSubjectDocuments = summaryDocuments.filter(
    (item) => item.subjectId === select.value,
  );

  summaryCards.replaceChildren();
  viewer.replaceChildren();
  selectedSummaryPath = "";

  if (selectedSubjectDocuments.length === 0) {
    summaryCards.textContent = "Nenhum resumo Markdown está cadastrado.";
    return;
  }

  selectedSubjectDocuments.forEach((summary) => {
    const card = document.createElement("button");
    const heading = document.createElement("h3");
    const preview = document.createElement("p");

    card.type = "button";
    card.className = "summary-card";
    card.dataset.summaryPath = summary.path;
    card.setAttribute("aria-pressed", "false");

    heading.textContent = summary.title;
    preview.textContent = summary.markdown
      .replace(/```[\s\S]*?```/g, "Bloco de código")
      .replace(/[#>*_`|]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 150);

    card.append(heading, preview);
    card.addEventListener("click", () => showSummaryDocument(summary.path));
    summaryCards.appendChild(card);
  });

  viewer.textContent = "Selecione um resumo para abrir.";
}

function showSummaryDocument(path) {
  const viewer = document.getElementById("summaryContent");
  const summary = summaryDocuments.find((item) => item.path === path);

  if (!summary) {
    return;
  }

  selectedSummaryPath = path;

  document.querySelectorAll(".summary-card").forEach((card) => {
    card.setAttribute(
      "aria-pressed",
      String(card.dataset.summaryPath === path),
    );
  });

  if (!window.marked || !window.DOMPurify) {
    viewer.textContent = summary.markdown;
    return;
  }

  viewer.innerHTML = window.DOMPurify.sanitize(
    window.marked.parse(summary.markdown),
  );
}

function formatContestDate(dateValue) {
  if (Array.isArray(dateValue)) {
    const dates = dateValue
      .map((value) => formatContestDate(value))
      .filter((value) => value !== "Não informado");

    return dates.length > 0 ? dates.join(" · ") : "Não informado";
  }

  if (!dateValue || !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return "Não informado";
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

function createContestMeta(label, value) {
  const item = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  term.textContent = label;
  description.textContent = value || "Não informado";
  item.append(term, description);

  return item;
}

function createContestCard(contest) {
  const card = document.createElement("article");
  const header = document.createElement("div");
  const title = document.createElement("h3");
  const status = document.createElement("span");
  const details = document.createElement("dl");

  card.className = "contest-card";
  header.className = "contest-card-header";
  title.textContent = contest.nome || "Concurso sem nome";
  status.className = `contest-status contest-status-${contest.status === "inscrito" ? "inscrito" : "no-radar"}`;
  status.textContent = contest.status === "inscrito" ? "Inscrito" : "No radar";

  details.className = "contest-details";
  details.append(
    createContestMeta("Cargo", contest.cargo),
    createContestMeta("Banca", contest.banca),
    createContestMeta(
      "Local",
      [contest.cidade, contest.estado].filter(Boolean).join(" / "),
    ),
    createContestMeta(
      "Inscrições até",
      formatContestDate(contest.inscricoesAte),
    ),
    createContestMeta("Prova", formatContestDate(contest.provaEm)),
  );

  header.append(title, status);
  card.append(header, details);

  if (contest.observacoes) {
    const notes = document.createElement("p");
    notes.className = "contest-notes";
    notes.textContent = contest.observacoes;
    card.appendChild(notes);
  }

  if (typeof contest.link === "string") {
    try {
      const url = new URL(contest.link);

      if (url.protocol === "https:") {
        const link = document.createElement("a");
        link.className = "contest-link";
        link.href = url.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Abrir edital ou página oficial ↗";
        card.appendChild(link);
      }
    } catch {}
  }

  return card;
}

function getContestExamEvents(contests) {
  return contests
    .flatMap((contest) => {
      const examDates = Array.isArray(contest.provaEm)
        ? contest.provaEm
        : [contest.provaEm];

      return examDates
        .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date || ""))
        .map((date) => ({ contest, date }));
    })
    .sort((first, second) => first.date.localeCompare(second.date));
}

function createContestTimelineEvent(contest, date) {
  const event = document.createElement("article");
  const marker = document.createElement("span");
  const content = document.createElement("div");
  const dateLabel = document.createElement("time");
  const title = document.createElement("h3");
  const details = document.createElement("p");
  const location = [contest.cidade, contest.estado].filter(Boolean).join(" / ");

  event.className = "contest-timeline-event";
  marker.className = "contest-timeline-marker";
  content.className = "contest-timeline-content";
  dateLabel.dateTime = date;
  dateLabel.textContent = formatContestDate(date);
  title.textContent = contest.nome || "Concurso sem nome";
  details.textContent = [
    location || "Local não informado",
    contest.cargo,
    contest.status === "inscrito" ? "Inscrito" : "No radar",
  ]
    .filter(Boolean)
    .join(" · ");

  content.append(dateLabel, title, details);
  event.append(marker, content);

  return event;
}

function renderContestTimeline(contests) {
  const timeline = document.getElementById("contestTimeline");
  const unscheduled = document.getElementById("contestTimelineUnscheduled");
  const events = getContestExamEvents(contests);
  const contestsWithoutDates = contests.filter(
    (contest) => getContestExamEvents([contest]).length === 0,
  );

  timeline.replaceChildren();
  unscheduled.replaceChildren();

  if (events.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "contest-timeline-empty";
    emptyState.textContent = "Nenhuma prova com data definida.";
    timeline.appendChild(emptyState);
  } else {
    events.forEach(({ contest, date }) => {
      timeline.appendChild(createContestTimelineEvent(contest, date));
    });
  }

  if (contestsWithoutDates.length > 0) {
    const heading = document.createElement("h3");
    const list = document.createElement("div");

    heading.className = "contest-timeline-unscheduled-title";
    heading.textContent = "Data a definir";
    list.className = "contest-timeline-unscheduled-list";

    contestsWithoutDates.forEach((contest) => {
      const item = document.createElement("div");
      const title = document.createElement("strong");
      const location = document.createElement("span");

      item.className = "contest-unscheduled-item";
      title.textContent = contest.nome || "Concurso sem nome";
      location.textContent =
        [contest.cidade, contest.estado].filter(Boolean).join(" / ") ||
        "Local não informado";

      item.append(title, location);
      list.appendChild(item);
    });

    unscheduled.append(heading, list);
  }
}

function renderConcursos() {
  const search = document
    .getElementById("contestSearch")
    .value.trim()
    .toLocaleLowerCase("pt-BR");
  const selectedStatus = document.getElementById("contestStatus").value;
  const counts = document.getElementById("contestCounts");
  const enrolledCount = contestEntries.filter(
    (contest) => contest.status === "inscrito",
  ).length;
  const radarCount = contestEntries.filter(
    (contest) => contest.status === "no-radar",
  ).length;

  counts.textContent = `${enrolledCount} inscritos · ${radarCount} no radar`;

  const filteredContests = contestEntries.filter((contest) => {
    const matchesStatus =
      selectedStatus === "todos" || contest.status === selectedStatus;
    const searchableText = [
      contest.nome,
      contest.cargo,
      contest.banca,
      contest.local,
      contest.cidade,
      contest.estado,
      contest.observacoes,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("pt-BR");

    return matchesStatus && searchableText.includes(search);
  });

  renderContestTimeline(filteredContests);

  const lanes = [
    {
      status: "inscrito",
      section: document.querySelector(".contest-lane-inscrito"),
      list: document.getElementById("enrolledContestList"),
      count: document.getElementById("enrolledContestCount"),
    },
    {
      status: "no-radar",
      section: document.querySelector(".contest-lane-radar"),
      list: document.getElementById("radarContestList"),
      count: document.getElementById("radarContestCount"),
    },
  ];

  lanes.forEach((lane) => {
    const laneContests = filteredContests.filter(
      (contest) => contest.status === lane.status,
    );

    lane.section.hidden =
      selectedStatus !== "todos" && selectedStatus !== lane.status;
    lane.count.textContent = laneContests.length;
    lane.list.replaceChildren();

    if (laneContests.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "contest-lane-empty";
      emptyState.textContent =
        contestEntries.length === 0
          ? "Nenhum concurso cadastrado."
          : "Nenhum concurso neste grupo.";
      lane.list.appendChild(emptyState);
      return;
    }

    laneContests.forEach((contest) => {
      lane.list.appendChild(createContestCard(contest));
    });
  });
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

  try {
    await loadConcursos();
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
