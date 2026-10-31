(() => {
  "use strict";

  const PAGE_INDEX = [
    {
      title: "Website Development",
      category: "Services",
      page: "services.html",
      description:
        "Responsive websites for businesses, organisations and individuals.",
      keywords:
        "website web design web development business site corporate landing page portfolio responsive mobile online presence",
      concepts: ["website", "web", "design", "business", "online presence"],
    },
    {
      title: "E-commerce Development",
      category: "Services",
      page: "services.html",
      description:
        "Online stores with product catalogues, shopping carts, checkout and payment integration.",
      keywords:
        "ecommerce e-commerce online shop store shopping products catalogue cart checkout selling retail",
      concepts: ["online shop", "ecommerce", "selling online", "online store"],
    },
    {
      title: "Custom Software Development",
      category: "Services",
      page: "services.html",
      description:
        "Custom software designed around organisational processes and requirements.",
      keywords:
        "custom software applications systems database automation management platform workflow business process",
      concepts: [
        "software",
        "automation",
        "management system",
        "custom application",
      ],
    },
    {
      title: "Booking and Ordering Systems",
      category: "Services",
      page: "services.html",
      description:
        "Systems for appointments, reservations, customer orders and service management.",
      keywords:
        "booking reservation appointments ordering restaurant orders scheduling queue appointment calendar",
      concepts: [
        "booking system",
        "ordering system",
        "appointments",
        "reservations",
      ],
    },
    {
      title: "Android Application Development",
      category: "Services",
      page: "services.html",
      description:
        "Android applications designed around practical business and user needs.",
      keywords:
        "android mobile app application smartphone mobile development play store",
      concepts: ["mobile application", "android app"],
    },
    {
      title: "IT Consulting and Support",
      category: "Services",
      page: "services.html",
      description:
        "Technical guidance, troubleshooting, maintenance and ongoing IT support.",
      keywords:
        "IT support consulting maintenance troubleshooting computers networks technology technical assistance",
      concepts: ["technical support", "IT support", "computer problems"],
    },
    {
      title: "Business Solutions",
      category: "Solutions",
      page: "solutions.html",
      description:
        "Digital tools to improve business operations, customer experiences and productivity.",
      keywords:
        "business digital transformation operations productivity workflow automation organisation",
      concepts: ["business management", "business automation"],
    },
    {
      title: "Institutional Solutions",
      category: "Solutions",
      page: "solutions.html",
      description:
        "Digital platforms and management systems for schools and institutions.",
      keywords:
        "institution school university college student management portal administration records education",
      concepts: [
        "school management",
        "student management",
        "institution portal",
      ],
    },
    {
      title: "Payment Integration",
      category: "Solutions",
      page: "solutions.html",
      description:
        "Payment-enabled websites and systems, including M-Pesa integration.",
      keywords:
        "payment mpesa m-pesa daraja mobile money checkout transactions stk push gateway online payment",
      concepts: ["accept payments", "pay online", "mobile money"],
    },
    {
      title: "Website Pricing",
      category: "Pricing",
      page: "pricing.html",
      description:
        "Explore website development packages and estimated investment ranges.",
      keywords:
        "website price cost budget affordable package starter business website charges",
      concepts: ["website cost", "website price", "how much website"],
    },
    {
      title: "Business Website with Payments",
      category: "Pricing",
      page: "pricing.html",
      description:
        "Estimated investment for a business website with payment functionality.",
      keywords:
        "90k 180k business website payments ecommerce payment online shop",
      concepts: ["website with payments", "online business website"],
    },
    {
      title: "Booking and Ordering System Pricing",
      category: "Pricing",
      page: "pricing.html",
      description:
        "Estimated investment for custom booking and ordering systems.",
      keywords: "150k 350k booking ordering reservation system",
      concepts: ["booking system cost", "ordering system price"],
    },
    {
      title: "Android Application Pricing",
      category: "Pricing",
      page: "pricing.html",
      description: "Estimated investment for Android application development.",
      keywords: "250k 1.2m android app mobile application cost price",
      concepts: ["android app cost", "mobile app price"],
    },
    {
      title: "Institution Portal Pricing",
      category: "Pricing",
      page: "pricing.html",
      description:
        "Estimated investment for institutional portals and custom systems.",
      keywords:
        "400k 2.5m institution portal school university management system",
      concepts: ["school system cost", "institution portal price"],
    },
    {
      title: "Website Care Plans",
      category: "Pricing",
      page: "pricing.html",
      description: "Ongoing website maintenance and technical support plans.",
      keywords:
        "maintenance care support monthly updates backups security 4k 10k 25k",
      concepts: ["website maintenance cost", "monthly website support"],
    },
    {
      title: "Our Work",
      category: "Portfolio",
      page: "work.html",
      description:
        "Explore sample concepts demonstrating the types of solutions Skyshade can develop.",
      keywords: "portfolio projects examples showcase designs concepts work",
      concepts: ["previous projects", "examples", "portfolio"],
    },
    {
      title: "About Skyshade",
      category: "Company",
      page: "about.html",
      description:
        "Learn about Skyshade, its vision and its approach to technology.",
      keywords: "about company story vision mission founder technology",
      concepts: ["who are you", "about company"],
    },
    {
      title: "Contact Skyshade",
      category: "Contact",
      page: "contact.html",
      description: "Discuss a project, request a quotation or send an enquiry.",
      keywords:
        "contact email enquiry inquiry consultation quote quotation message",
      concepts: ["talk to someone", "request quote", "get in touch"],
    },
  ];

  const STOP_WORDS = new Set([
    "a",
    "an",
    "the",
    "is",
    "are",
    "am",
    "do",
    "does",
    "did",
    "can",
    "could",
    "would",
    "should",
    "i",
    "we",
    "you",
    "my",
    "our",
    "your",
    "me",
    "us",
    "to",
    "for",
    "of",
    "in",
    "on",
    "with",
    "and",
    "or",
    "what",
    "how",
    "where",
    "when",
    "who",
    "want",
    "need",
    "looking",
    "please",
    "tell",
    "about",
    "it",
  ]);

  const SYNONYMS = {
    website: ["web", "site", "webpage", "websites"],
    ecommerce: ["e-commerce", "shop", "store", "online shop"],
    payment: ["pay", "payments", "checkout", "transaction"],
    mpesa: ["m-pesa", "daraja", "mobile money", "stk push"],
    cost: ["price", "pricing", "budget", "charges", "fees", "how much"],
    booking: ["reservation", "appointment", "schedule"],
    ordering: ["orders", "order", "purchase"],
    application: ["app", "software", "program"],
    android: ["mobile", "smartphone"],
    maintenance: ["support", "updates", "care", "repairs"],
    hosting: ["server", "domain", "website hosting"],
    security: ["secure", "protection", "ssl", "https"],
    school: ["college", "university", "institution", "education"],
    student: ["students", "learner", "learners"],
    management: ["admin", "administration", "records"],
    redesign: ["improve", "update", "refresh", "rebuild"],
    quotation: ["quote", "estimate", "proposal"],
  };

  const RELATED_GROUPS = [
    {
      terms: [
        "shop",
        "store",
        "ecommerce",
        "e-commerce",
        "sell",
        "selling",
        "products",
      ],
      titles: [
        "E-commerce Development",
        "Payment Integration",
        "Business Website with Payments",
      ],
    },
    {
      terms: ["mpesa", "m-pesa", "daraja", "payment", "checkout", "pay"],
      titles: [
        "Payment Integration",
        "E-commerce Development",
        "Business Website with Payments",
      ],
    },
    {
      terms: ["school", "student", "university", "college", "institution"],
      titles: [
        "Institutional Solutions",
        "Institution Portal Pricing",
        "Custom Software Development",
      ],
    },
    {
      terms: ["booking", "appointment", "reservation", "ordering", "orders"],
      titles: [
        "Booking and Ordering Systems",
        "Booking and Ordering System Pricing",
      ],
    },
    {
      terms: ["website", "web", "site", "online presence"],
      titles: ["Website Development", "Website Pricing", "Website Care Plans"],
    },
    {
      terms: ["android", "mobile", "app", "application"],
      titles: [
        "Android Application Development",
        "Android Application Pricing",
      ],
    },
    {
      terms: ["hosting", "domain", "server"],
      titles: ["Website Pricing", "Website Care Plans", "Website Development"],
    },
    {
      terms: ["maintenance", "support", "updates", "security"],
      titles: ["Website Care Plans", "IT Consulting and Support"],
    },
  ];

  const styles = `
    .sky-search-trigger {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:9px;
      padding:10px 15px;
      border:1px solid var(--border,rgba(255,255,255,.15));
      border-radius:12px;
      background:var(--surface,rgba(255,255,255,.06));
      color:inherit;
      font:inherit;
      cursor:pointer;
      transition:.2s ease;
    }

    .sky-search-trigger:hover {
      border-color:var(--accent,#36A66B);
      transform:translateY(-1px);
    }

    .sky-search-trigger svg {
      width:17px;
      height:17px;
    }

    .sky-search-trigger kbd {
      font-size:10px;
      opacity:.65;
      padding:3px 5px;
      border:1px solid currentColor;
      border-radius:5px;
    }

    .sky-search-overlay {
      position:fixed;
      inset:0;
      z-index:99999;
      display:none;
      align-items:flex-start;
      justify-content:center;
      padding:min(10vh,80px) 18px 25px;
      background:rgba(8,13,20,.76);
      backdrop-filter:blur(10px);
      -webkit-backdrop-filter:blur(10px);
    }

    .sky-search-overlay.is-open {
      display:flex;
      animation:skyFadeIn .18s ease;
    }

    .sky-search-modal {
      width:min(100%,700px);
      max-height:82vh;
      display:flex;
      flex-direction:column;
      overflow:hidden;
      color:var(--text,#f5f5f5);
      background:var(--surface,#111a20);
      border:1px solid var(--border,rgba(255,255,255,.13));
      border-radius:20px;
      box-shadow:0 25px 90px rgba(0,0,0,.35);
      animation:skyModalIn .22s ease;
    }

    .sky-search-header {
      padding:20px;
      border-bottom:1px solid var(--border,rgba(255,255,255,.1));
    }

    .sky-search-heading {
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:16px;
    }

    .sky-search-heading h2 {
      margin:0;
      font-size:19px;
      font-weight:700;
    }

    .sky-search-close {
      display:grid;
      place-items:center;
      width:35px;
      height:35px;
      border:0;
      border-radius:10px;
      color:inherit;
      background:var(--surface-2,rgba(255,255,255,.07));
      cursor:pointer;
      font-size:20px;
    }

    .sky-search-input-wrap {
      display:flex;
      align-items:center;
      gap:12px;
      padding:0 14px;
      min-height:54px;
      border:1px solid var(--border,rgba(255,255,255,.15));
      border-radius:13px;
      background:var(--background,rgba(0,0,0,.12));
    }

    .sky-search-input-wrap svg {
      width:19px;
      height:19px;
      flex-shrink:0;
      opacity:.65;
    }

    .sky-search-input {
      width:100%;
      min-width:0;
      border:0;
      outline:none;
      background:transparent;
      color:inherit;
      font:inherit;
      font-size:15px;
    }

    .sky-search-input::placeholder {
      color:var(--muted,#929ba3);
    }

    .sky-search-results {
      overflow-y:auto;
      padding:15px;
    }

    .sky-search-meta {
      margin:0 4px 12px;
      color:var(--muted,#929ba3);
      font-size:12px;
    }

    .sky-search-group-title {
      margin:20px 4px 10px;
      color:var(--muted,#929ba3);
      font-size:11px;
      font-weight:700;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .sky-search-result {
      display:block;
      padding:15px;
      margin-bottom:9px;
      border:1px solid transparent;
      border-radius:13px;
      color:inherit;
      text-decoration:none;
      background:var(--surface-2,rgba(255,255,255,.035));
      transition:.18s ease;
    }

    .sky-search-result:hover,
    .sky-search-result.is-active {
      border-color:var(--accent,#36A66B);
      background:var(--surface-hover,rgba(255,255,255,.08));
    }

    .sky-search-result h3 {
      margin:9px 0 6px;
      font-size:15px;
      font-weight:700;
    }

    .sky-search-result p {
      margin:0 0 12px;
      color:var(--muted,#a3adb4);
      font-size:13px;
      line-height:1.7;
    }

    .sky-search-result-footer {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      font-size:11px;
    }

    .sky-search-category {
      padding:5px 9px;
      border-radius:30px;
      background:rgba(54,166,107,.12);
      color:var(--accent,#36A66B);
      font-weight:600;
    }

    .sky-search-destination {
      display:inline-flex;
      align-items:center;
      gap:5px;
      color:var(--accent,#36A66B);
      font-weight:700;
    }

    .sky-search-faq {
      cursor:default;
    }

    .sky-search-faq:hover {
      transform:none;
    }

    .sky-search-answer {
      white-space:normal;
      line-height:1.8;
      color:var(--text,#e5eaf0) !important;
      margin-top:10px !important;
    }

    .sky-search-empty {
      padding:35px 15px;
      text-align:center;
      color:var(--muted,#929ba3);
      line-height:1.7;
    }

    .sky-search-empty strong {
      display:block;
      margin-bottom:8px;
      color:var(--text,#fff);
      font-size:16px;
    }

    .sky-search-footer {
      padding:12px 18px;
      border-top:1px solid var(--border,rgba(255,255,255,.1));
      color:var(--muted,#929ba3);
      font-size:11px;
      display:flex;
      justify-content:space-between;
      gap:10px;
    }

    @keyframes skyFadeIn {
      from {opacity:0}
      to {opacity:1}
    }

    @keyframes skyModalIn {
      from {opacity:0;transform:translateY(12px) scale(.99)}
      to {opacity:1;transform:translateY(0) scale(1)}
    }

    @media(max-width:600px) {
      .sky-search-overlay {
        padding:12px;
        align-items:center;
      }

      .sky-search-modal {
        max-height:90vh;
        border-radius:17px;
      }

      .sky-search-header {
        padding:16px;
      }

      .sky-search-trigger kbd {
        display:none;
      }

      .sky-search-footer {
        flex-wrap:wrap;
      }
    }

    @media(prefers-reduced-motion:reduce) {
      .sky-search-overlay,
      .sky-search-modal,
      .sky-search-result,
      .sky-search-trigger {
        animation:none;
        transition:none;
      }
    }
  `;

  const icon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m20 20-4-4"></path>
    </svg>
  `;

  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "sky-search-trigger";
  trigger.setAttribute("aria-label", "Search Skyshade");
  trigger.innerHTML = `${icon}<span>Search</span><kbd>Ctrl K</kbd>`;

  const overlay = document.createElement("div");
  overlay.className = "sky-search-overlay";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <section class="sky-search-modal" role="dialog"
      aria-modal="true" aria-labelledby="sky-search-title">

      <header class="sky-search-header">
        <div class="sky-search-heading">
          <h2 id="sky-search-title">Search Skyshade</h2>
          <button class="sky-search-close" type="button"
            aria-label="Close search">&times;</button>
        </div>

        <div class="sky-search-input-wrap">
          ${icon}
          <input class="sky-search-input" type="search"
            placeholder="Describe what you're looking for..."
            autocomplete="off" aria-label="Search website">
        </div>
      </header>

      <div class="sky-search-results" aria-live="polite">
        <div class="sky-search-empty">
          <strong>What are you looking for?</strong>
          Search for a service, problem, price or question.
        </div>
      </div>

      <footer class="sky-search-footer">
        <span>Search across Skyshade</span>
        <span>ESC to close · ↑ ↓ to navigate</span>
      </footer>
    </section>
  `;

  document.body.appendChild(overlay);

  const navActions = document.querySelector(".nav-actions");

  if (navActions) {
    navActions.prepend(trigger);
  } else {
    trigger.style.position = "fixed";
    trigger.style.right = "22px";
    trigger.style.bottom = "22px";
    trigger.style.zIndex = "1000";
    document.body.appendChild(trigger);
  }

  const input = overlay.querySelector(".sky-search-input");
  const resultsContainer = overlay.querySelector(".sky-search-results");
  const closeButton = overlay.querySelector(".sky-search-close");

  let activeResult = -1;
  let faqIndex = [];
  let allResults = [];

  function escapeHTML(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[character],
    );
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function tokenize(value) {
    return value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
  }

  function expandWords(words) {
    const expanded = new Set(words);

    words.forEach((word) => {
      Object.entries(SYNONYMS).forEach(([key, synonyms]) => {
        if (key === word || synonyms.includes(word)) {
          expanded.add(key);
          synonyms.forEach((item) => {
            tokenize(item).forEach((token) => expanded.add(token));
          });
        }
      });
    });

    return [...expanded];
  }

  function getFAQData() {
    // Use the current page when already on FAQ.
    const faqPage = document.querySelectorAll("details.faq-item");

    if (faqPage.length) {
      return [...faqPage]
        .map((item) => {
          const question = item.querySelector("summary")?.textContent.trim();
          const answer = [...item.querySelectorAll("p")]
            .map((p) => p.textContent.trim())
            .join(" ");

          if (!question || !answer) return null;

          const id = item.id || slugify(question);
          item.id = id;

          const category = findFAQCategory(item);

          return {
            title: question,
            category,
            answer,
            page: "faq.html",
            section: id,
            type: "faq",
          };
        })
        .filter(Boolean);
    }

    return [];
  }

  function findFAQCategory(item) {
    let parent = item.parentElement;

    while (parent) {
      const heading = [...parent.querySelectorAll(":scope > .eyebrow")]
        .map((el) => el.textContent.trim())
        .find(Boolean);

      if (heading) return heading;
      parent = parent.parentElement;
    }

    return "Frequently Asked Questions";
  }

  async function loadFAQs() {
    const current = getFAQData();

    if (current.length) {
      faqIndex = current;
      return;
    }

    try {
      const response = await fetch("faq.html", { cache: "no-cache" });

      if (!response.ok) throw new Error("Could not load FAQ page");

      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, "text/html");

      faqIndex = [...parsed.querySelectorAll("details.faq-item")]
        .map((item) => {
          const question = item.querySelector("summary")?.textContent.trim();
          const answer = [...item.querySelectorAll("p")]
            .map((p) => p.textContent.trim())
            .join(" ");

          if (!question || !answer) return null;

          return {
            title: question,
            category: findFAQCategory(item),
            answer,
            page: "faq.html",
            section: item.id || slugify(question),
            type: "faq",
          };
        })
        .filter(Boolean);
    } catch (error) {
      console.warn("Skyshade FAQ search could not load:", error);
      faqIndex = [];
    }
  }

  function scoreItem(item, queryWords, expandedWords, rawQuery) {
    const title = item.title.toLowerCase();
    const description = (item.description || "").toLowerCase();
    const answer = (item.answer || "").toLowerCase();
    const keywords = (item.keywords || "").toLowerCase();
    const category = (item.category || "").toLowerCase();
    const concepts = (item.concepts || []).join(" ").toLowerCase();

    let score = 0;
    let matched = 0;

    // Exact phrase matches deserve a substantial boost.
    if (title.includes(rawQuery)) score += 20;
    if (answer.includes(rawQuery)) score += 12;
    if (description.includes(rawQuery)) score += 10;
    if (concepts.includes(rawQuery)) score += 12;

    expandedWords.forEach((word) => {
      let wordScore = 0;

      if (title.includes(word)) wordScore = Math.max(wordScore, 9);
      if (keywords.includes(word)) wordScore = Math.max(wordScore, 6);
      if (concepts.includes(word)) wordScore = Math.max(wordScore, 6);
      if (description.includes(word)) wordScore = Math.max(wordScore, 4);
      if (answer.includes(word)) wordScore = Math.max(wordScore, 3);
      if (category.includes(word)) wordScore = Math.max(wordScore, 2);

      if (wordScore > 0) {
        score += wordScore;
        matched++;
      }
    });

    // Reward results that cover multiple parts of the question.
    if (queryWords.length > 1) {
      score += (matched / queryWords.length) * 8;
    }

    return score;
  }

  function findRelatedPages(query) {
    const words = expandWords(tokenize(query));
    const titles = new Set();

    RELATED_GROUPS.forEach((group) => {
      if (
        group.terms.some(
          (term) =>
            words.includes(term) || words.some((word) => term.includes(word)),
        )
      ) {
        group.titles.forEach((title) => titles.add(title));
      }
    });

    return [...titles]
      .map((title) => PAGE_INDEX.find((item) => item.title === title))
      .filter(Boolean);
  }

  function searchPages(query) {
    const rawQuery = query.toLowerCase().trim();
    const queryWords = tokenize(rawQuery);
    const expandedWords = expandWords(queryWords);

    if (!queryWords.length) return { faqs: [], pages: [], related: [] };

    const scored = [...faqIndex, ...PAGE_INDEX].map((item) => ({
      ...item,
      score: scoreItem(item, queryWords, expandedWords, rawQuery),
    }));

    const faqs = scored
      .filter((item) => item.type === "faq" && item.score >= 3)
      .sort((a, b) => b.score - a.score);

    const pages = scored
      .filter((item) => item.type !== "faq" && item.score >= 3)
      .sort((a, b) => b.score - a.score);

    const related = findRelatedPages(rawQuery).filter(
      (item) => !pages.some((page) => page.title === item.title),
    );

    return {
      faqs: faqs.slice(0, 5),
      pages: pages.slice(0, 5),
      related: related.slice(0, 4),
    };
  }

  function resultCard(item, index) {
    const destination =
      item.page + (item.section ? `#${encodeURIComponent(item.section)}` : "");

    if (item.type === "faq") {
      return `
        <article class="sky-search-result sky-search-faq">
          <div class="sky-search-result-footer">
            <span class="sky-search-category">
              FAQ · ${escapeHTML(item.category)}
            </span>
          </div>

          <h3>${escapeHTML(item.title)}</h3>

          <p class="sky-search-answer">
            ${escapeHTML(item.answer)}
          </p>

          <div class="sky-search-result-footer">
            <span></span>
            <a class="sky-search-destination"
              href="${escapeHTML(destination)}">
              Read full answer →
            </a>
          </div>
        </article>
      `;
    }

    return `
      <a class="sky-search-result"
        href="${escapeHTML(destination)}">
        <div class="sky-search-result-footer">
          <span class="sky-search-category">
            ${escapeHTML(item.category)}
          </span>
        </div>

        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>

        <div class="sky-search-result-footer">
          <span></span>
          <span class="sky-search-destination">
            View page →
          </span>
        </div>
      </a>
    `;
  }

  function renderResults(query) {
    const result = searchPages(query);
    const combined = [...result.faqs, ...result.pages, ...result.related];

    allResults = combined;
    activeResult = -1;

    if (!query.trim()) {
      resultsContainer.innerHTML = `
        <div class="sky-search-empty">
          <strong>What are you looking for?</strong>
          Try describing what you want to achieve.
          For example: "I need customers to pay online".
        </div>
      `;
      return;
    }

    if (!combined.length) {
      resultsContainer.innerHTML = `
        <div class="sky-search-empty">
          <strong>No direct match found</strong>
          Try describing the problem differently, or browse our
          <a href="services.html">services</a> and
          <a href="contact.html">contact us</a>.
        </div>
      `;
      return;
    }

    let html = `
      <p class="sky-search-meta">
        Showing ${combined.length} useful result${combined.length === 1 ? "" : "s"}.
        Results include related information, not only exact matches.
      </p>
    `;

    if (result.faqs.length) {
      html += `<h3 class="sky-search-group-title">Answers to your question</h3>`;
      html += result.faqs.map(resultCard).join("");
    }

    if (result.pages.length) {
      html += `<h3 class="sky-search-group-title">Matching services and pages</h3>`;
      html += result.pages.map(resultCard).join("");
    }

    if (result.related.length) {
      html += `<h3 class="sky-search-group-title">Related information</h3>`;
      html += result.related.map(resultCard).join("");
    }

    resultsContainer.innerHTML = html;
  }

  function getNavigableResults() {
    return [
      ...resultsContainer.querySelectorAll(
        ".sky-search-result:not(.sky-search-faq), .sky-search-faq a",
      ),
    ];
  }

  function moveSelection(direction) {
    const items = getNavigableResults();

    if (!items.length) return;

    activeResult += direction;

    if (activeResult < 0) activeResult = items.length - 1;
    if (activeResult >= items.length) activeResult = 0;

    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeResult);
    });

    items[activeResult].scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }

  function openSearch() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    trigger.focus();
  }

  trigger.addEventListener("click", openSearch);
  closeButton.addEventListener("click", closeSearch);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeSearch();
  });

  input.addEventListener("input", () => renderResults(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection(1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(-1);
    }

    if (event.key === "Enter") {
      const items = getNavigableResults();

      if (activeResult >= 0 && items[activeResult]) {
        items[activeResult].click();
      } else if (items.length === 1) {
        items[0].click();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    const shortcut = isMac ? event.metaKey : event.ctrlKey;

    if (shortcut && event.key.toLowerCase() === "k") {
      event.preventDefault();

      if (overlay.classList.contains("is-open")) {
        closeSearch();
      } else {
        openSearch();
      }
    }

    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeSearch();
    }
  });

  // Load actual FAQ questions and answers.
  loadFAQs().then(() => {
    if (input.value.trim()) renderResults(input.value);
  });
})();
