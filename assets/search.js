(() => {
  "use strict";

  /* ---------- Config ---------- */
  const CLEAN_URLS = true;
  const href = (page, section) =>
    (CLEAN_URLS ? page.replace(/\.html$/, "") : page) +
    (section ? "#" + encodeURIComponent(section) : "");

  const E = (
    title,
    category,
    page,
    description,
    keywords,
    concepts,
    section,
  ) => ({
    title,
    category,
    page,
    description,
    keywords,
    concepts,
    section,
  });

  /* ---------- Content index ---------- */
  const PAGE_INDEX = [
    E(
      "Website Development",
      "Services",
      "services.html",
      "Responsive websites for businesses, organisations and individuals.",
      "website web design web development business site corporate landing page portfolio responsive mobile online presence",
      ["website", "web", "design", "business", "online presence"],
      "web",
    ),
    E(
      "E-commerce Development",
      "Services",
      "services.html",
      "Online stores with product catalogues, shopping carts, checkout and payment integration.",
      "ecommerce e-commerce online shop store shopping products catalogue cart checkout selling retail",
      ["online shop", "ecommerce", "selling online", "online store"],
      "web",
    ),
    E(
      "Custom Software Development",
      "Services",
      "services.html",
      "Custom software designed around organisational processes and requirements.",
      "custom software applications systems database automation management platform workflow business process",
      ["software", "automation", "management system", "custom application"],
      "software",
    ),
    E(
      "Booking and Ordering Systems",
      "Services",
      "services.html",
      "Systems for appointments, reservations, customer orders and service management.",
      "booking reservation appointments ordering restaurant orders scheduling queue appointment calendar",
      ["booking system", "ordering system", "appointments", "reservations"],
    ),
    E(
      "Android Application Development",
      "Services",
      "services.html",
      "Android applications designed around practical business and user needs.",
      "android mobile app application smartphone mobile development play store",
      ["mobile application", "android app"],
    ),
    E(
      "IT Consulting and Support",
      "Services",
      "services.html",
      "Technical guidance, troubleshooting, maintenance and ongoing IT support.",
      "IT support consulting maintenance troubleshooting computers networks technology technical assistance",
      ["technical support", "IT support", "computer problems"],
      "consulting",
    ),
    E(
      "Business Solutions",
      "Solutions",
      "solutions.html",
      "Digital tools to improve business operations, customer experiences and productivity.",
      "business digital transformation operations productivity workflow automation organisation",
      ["business management", "business automation"],
    ),
    E(
      "Institutional Solutions",
      "Solutions",
      "solutions.html",
      "Digital platforms and management systems for schools and institutions.",
      "institution school university college student management portal administration records education",
      ["school management", "student management", "institution portal"],
    ),
    E(
      "Payment Integration",
      "Solutions",
      "solutions.html",
      "Payment-enabled websites and systems, including M-Pesa integration.",
      "payment mpesa m-pesa daraja mobile money checkout transactions stk push gateway online payment",
      ["accept payments", "pay online", "mobile money"],
    ),
    E(
      "Website Pricing",
      "Pricing",
      "pricing.html",
      "Explore website development packages and estimated investment ranges.",
      "website price cost budget affordable package starter business website charges",
      ["website cost", "website price", "how much website"],
    ),
    E(
      "Business Website with Payments",
      "Pricing",
      "pricing.html",
      "Estimated investment for a business website with payment functionality.",
      "90k 180k business website payments ecommerce payment online shop",
      ["website with payments", "online business website"],
    ),
    E(
      "Booking and Ordering System Pricing",
      "Pricing",
      "pricing.html",
      "Estimated investment for custom booking and ordering systems.",
      "150k 350k booking ordering reservation system",
      ["booking system cost", "ordering system price"],
    ),
    E(
      "Android Application Pricing",
      "Pricing",
      "pricing.html",
      "Estimated investment for Android application development.",
      "250k 1.2m android app mobile application cost price",
      ["android app cost", "mobile app price"],
    ),
    E(
      "Institution Portal Pricing",
      "Pricing",
      "pricing.html",
      "Estimated investment for institutional portals and custom systems.",
      "400k 2.5m institution portal school university management system",
      ["school system cost", "institution portal price"],
    ),
    E(
      "Website Care Plans",
      "Pricing",
      "pricing.html",
      "Ongoing website maintenance and technical support plans.",
      "maintenance care support monthly updates backups security 4k 10k 25k",
      ["website maintenance cost", "monthly website support"],
    ),
    E(
      "Our Work",
      "Portfolio",
      "work.html",
      "Explore sample concepts demonstrating the types of solutions Skyshade can develop.",
      "portfolio projects examples showcase designs concepts work",
      ["previous projects", "examples", "portfolio"],
    ),
    E(
      "About Skyshade",
      "Company",
      "about.html",
      "Learn about Skyshade, its vision and its approach to technology.",
      "about company story vision mission founder technology",
      ["who are you", "about company"],
    ),
    E(
      "Frequently Asked Questions",
      "Help",
      "faq.html",
      "Quick answers to common questions about working with Skyshade.",
      "faq questions answers help common questions",
      ["common questions", "help"],
    ),
    E(
      "Contact Skyshade",
      "Contact",
      "contact.html",
      "Discuss a project, request a quotation or send an enquiry.",
      "contact email enquiry inquiry consultation quote quotation message",
      ["talk to someone", "request quote", "get in touch"],
    ),
  ];

  const STOP = new Set(
    "a an the is are am do does did can could would should i we you my our your me us to for of in on with and or what how where when who want need looking please tell about it kes ksh kshs".split(
      " ",
    ),
  );

  const SYNONYMS = {
    website: ["web", "site", "webpage", "websites"],
    ecommerce: ["e-commerce", "shop", "store"],
    payment: ["pay", "payments", "checkout", "transaction"],
    mpesa: ["m-pesa", "daraja"],
    cost: ["price", "pricing", "budget", "charges", "fees"],
    booking: ["reservation", "appointment", "schedule"],
    ordering: ["orders", "order", "purchase"],
    application: ["app", "software", "program"],
    android: ["mobile", "smartphone"],
    maintenance: ["support", "updates", "care", "repairs"],
    hosting: ["server", "domain"],
    security: ["secure", "protection", "ssl", "https"],
    school: ["college", "university", "institution", "education"],
    student: ["students", "learner", "learners"],
    management: ["admin", "administration", "records"],
    redesign: ["improve", "update", "refresh", "rebuild"],
    quotation: ["quote", "estimate", "proposal"],
  };
  const SYN_ENTRIES = Object.entries(SYNONYMS);

  // Multi-word phrases rewritten before matching
  const PHRASES = [
    [/\bhow much\b/g, "cost"],
    [/\bonline (shop|store)\b/g, "ecommerce"],
    [/\b(stk push|mobile money|lipa na mpesa)\b/g, "mpesa"],
    [/\b(pay online|accept payments?|take payments?)\b/g, "payment"],
    [/\b(get in touch|talk to someone)\b/g, "contact"],
  ];

  const RELATED_GROUPS = [
    {
      terms: ["shop", "store", "ecommerce", "sell", "selling", "products"],
      titles: [
        "E-commerce Development",
        "Payment Integration",
        "Business Website with Payments",
      ],
    },
    {
      terms: ["mpesa", "payment", "checkout", "pay"],
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
      terms: ["website", "web", "site"],
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

  const SUGGESTIONS = [
    "How much does a website cost?",
    "Accept M-Pesa payments",
    "School management system",
    "Build an Android app",
    "Website maintenance",
  ];

  const FIELD_WEIGHT = { title: 9, kw: 6, con: 6, desc: 4, ans: 3, cat: 2 };

  /* ---------- Text helpers ---------- */
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/e-commerce/g, "ecommerce")
      .replace(/m-pesa/g, "mpesa")
      .replace(/[^\p{L}\p{N}\s]+/gu, " ")
      .replace(/\s+/g, " ")
      .trim();

  const stem = (w) =>
    w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w;
  const words = (s) => norm(s).split(" ").filter(Boolean).map(stem);
  const esc = (v) =>
    String(v).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[c],
    );
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugify = (v) => norm(v).replace(/ /g, "-");
  const snippet = (t, n = 190) =>
    t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n)) + "…";

  /* ---------- Search engine ---------- */
  const VOCAB = new Set();
  let faqIndex = [];
  let liveIndex = [];

  function prepare(it) {
    it._f = {
      title: words(it.title),
      kw: words(it.keywords),
      con: words((it.concepts || []).join(" ")),
      desc: words(it.description),
      ans: words(it.answer),
      cat: words(it.category),
    };
    it._n = {
      title: norm(it.title),
      desc: norm(it.description),
      ans: norm(it.answer),
      con: norm((it.concepts || []).join(" | ")),
    };
    Object.values(it._f).forEach((a) => a.forEach((w) => VOCAB.add(w)));
  }
  PAGE_INDEX.forEach(prepare);
  SYN_ENTRIES.forEach(([k, s]) =>
    [k, ...s].forEach((w) => !w.includes(" ") && VOCAB.add(stem(norm(w)))),
  );
  const RELATED = RELATED_GROUPS.map((g) => ({
    ...g,
    terms: g.terms.map(norm),
  }));

  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let min = i;
      for (let j = 1; j <= b.length; j++) {
        const v = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
        );
        cur[j] = v;
        if (v < min) min = v;
      }
      if (min > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  // Typo tolerance: "websit", "ecomerce", "pyment" -> nearest known word
  function correct(t) {
    if (t.length < 4 || /\d/.test(t)) return t;
    const s = stem(t);
    if (VOCAB.has(s)) return t;
    for (const w of VOCAB) if (w.startsWith(s)) return t; // still typing a longer word
    const max = t.length > 6 ? 2 : 1;
    let best = null,
      bd = max + 1;
    for (const w of VOCAB) {
      if (w[0] !== s[0]) continue;
      const d = lev(s, w, max);
      if (d < bd) {
        bd = d;
        best = w;
      }
    }
    return best || t;
  }

  // "100k", "KES 150,000", "1.2m" -> number (so budgets can match package price ranges)
  function parseAmount(q) {
    for (const m of String(q)
      .toLowerCase()
      .matchAll(
        /(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(k|m|million|thousand)?\b/g,
      )) {
      let n = parseFloat(m[1].replace(/,/g, ""));
      if (m[2] === "k" || m[2] === "thousand") n *= 1e3;
      else if (m[2] === "m" || m[2] === "million") n *= 1e6;
      if (n >= 1000 && n <= 1e8) return n;
    }
    return 0;
  }

  function parseQuery(q) {
    let n = norm(q);
    PHRASES.forEach(([re, to]) => (n = n.replace(re, to)));
    const direct = [],
      fixes = [];
    n.split(" ")
      .filter((w) => w.length > 1 && !STOP.has(w))
      .forEach((w) => {
        const c = correct(w);
        if (c !== w) fixes.push([w, c]);
        direct.push(c);
      });
    const terms = new Map();
    direct.forEach((t) => terms.set(stem(t), 1));
    direct.forEach((t) => {
      SYN_ENTRIES.forEach(([k, syn]) => {
        if (k === t || syn.includes(t)) {
          [k, ...syn].forEach((x) => {
            if (x.includes(" ")) return;
            const s = stem(norm(x));
            if (!terms.has(s)) terms.set(s, 0.6);
          });
        }
      });
    });
    const core = [...terms.values()].filter((v) => v === 1).length;
    return {
      direct,
      terms,
      fixes,
      core,
      phrase: n,
      amount: parseAmount(q),
      monthly: /\bmonth(ly)?\b/i.test(q),
    };
  }

  function score(it, Q) {
    let s = 0,
      matched = 0;
    const p = Q.phrase;
    if (p.length > 2) {
      if (it._n.title.includes(p)) s += 20;
      if (it._n.ans.includes(p)) s += 12;
      if (it._n.desc.includes(p)) s += 10;
      if (it._n.con.includes(p)) s += 12;
    }
    Q.terms.forEach((w, t) => {
      let best = 0;
      for (const f in FIELD_WEIGHT) {
        for (const x of it._f[f]) {
          const m =
            x === t
              ? 1
              : w === 1 && t.length >= 3 && x.startsWith(t)
                ? 0.75
                : 0;
          if (m && m * FIELD_WEIGHT[f] > best) best = m * FIELD_WEIGHT[f];
        }
      }
      if (best) {
        s += best * w;
        if (w === 1) matched++;
      }
    });
    if (Q.core > 1) s += (matched / Q.core) * 8;
    if (Q.amount && it.range && !!it.monthly === Q.monthly) {
      const [lo, hi] = it.range;
      if (Q.amount >= lo && Q.amount <= hi)
        s += 14; // budget falls inside this package's range
      else if (Q.amount > hi) s += 5; // package costs less than the budget
    }
    return [s, Q.core ? matched / Q.core : 0];
  }

  function search(query) {
    const Q = parseQuery(query);
    if (!Q.core) return { Q, faqs: [], pages: [], related: [] };

    const scored = [...faqIndex, ...liveIndex, ...PAGE_INDEX]
      .map((it) => {
        const [s, cov] = score(it, Q);
        return { it, s, cov };
      })
      // FAQs must cover most of what was typed, otherwise one shared word ("website") pulls in unrelated questions
      .filter((r) => r.s >= 3 && (r.it.type !== "faq" || r.cov >= 0.6))
      .sort((a, b) => b.s - a.s)
      .map((r) => r.it);

    const faqs = scored.filter((i) => i.type === "faq").slice(0, 4);
    const pages = scored.filter((i) => i.type !== "faq").slice(0, 6);

    const titles = new Set();
    RELATED.forEach((g) => {
      if (
        Q.direct.some(
          (t) =>
            t.length >= 3 && g.terms.some((x) => x === t || x.startsWith(t)),
        )
      ) {
        g.titles.forEach((t) => titles.add(t));
      }
    });
    const related = [...titles]
      .map((t) => PAGE_INDEX.find((i) => i.title === t))
      .filter((i) => i && !pages.includes(i))
      .slice(0, 3);

    return { Q, faqs, pages, related };
  }

  /* ---------- UI ---------- */
  const styles = `
    .sky-search-trigger,.sky-search-overlay{
      --s-bg:var(--bg,#101b20);--s-surface:var(--surface,#17272d);--s-alt:var(--surface-alt,#1c302f);
      --s-line:var(--line,rgba(255,255,255,.14));--s-text:var(--text,#edf5f1);
      --s-muted:var(--muted,#a9b9b7);--s-accent:var(--primary,#36a66b)}
    .sky-search-trigger{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:10px 15px;min-height:42px;
      border:1px solid var(--s-line);border-radius:12px;background:var(--s-surface);color:var(--s-text);font:inherit;font-weight:600;cursor:pointer;
      transition:border-color .2s,transform .2s}
    .sky-search-trigger:hover{border-color:var(--s-accent);transform:translateY(-1px)}
    .sky-search-trigger svg{width:17px;height:17px}
    .sky-search-trigger kbd{font:600 10px/1 inherit;opacity:.65;padding:4px 5px;border:1px solid currentColor;border-radius:5px}
    .sky-search-overlay{position:fixed;inset:0;z-index:99999;display:none;align-items:flex-start;justify-content:center;
      padding:min(10vh,80px) 18px 25px;background:rgba(8,20,24,.66);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
    .sky-search-overlay.is-open{display:flex;animation:skyFadeIn .18s ease}
    .sky-search-modal{width:min(100%,700px);max-height:82vh;display:flex;flex-direction:column;overflow:hidden;color:var(--s-text);
      background:var(--s-surface);border:1px solid var(--s-line);border-radius:20px;box-shadow:0 25px 90px rgba(0,0,0,.35);animation:skyModalIn .22s ease}
    .sky-search-header{padding:20px;border-bottom:1px solid var(--s-line)}
    .sky-search-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
    .sky-search-heading h2{margin:0;font-size:19px;font-weight:700}
    .sky-search-close{display:grid;place-items:center;width:35px;height:35px;border:0;border-radius:10px;color:inherit;background:var(--s-alt);cursor:pointer;font-size:20px}
    .sky-search-input-wrap{display:flex;align-items:center;gap:12px;padding:0 14px;min-height:54px;border:1px solid var(--s-line);border-radius:13px;background:var(--s-bg);
      transition:border-color .2s,box-shadow .2s}
    .sky-search-input-wrap:focus-within{border-color:var(--s-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--s-accent) 18%,transparent)}
    .sky-search-input-wrap svg{width:19px;height:19px;flex-shrink:0;opacity:.65}
    .sky-search-input{width:100%;min-width:0;border:0;outline:none;background:transparent;color:inherit;font:inherit;font-size:15px}
    .sky-search-input::placeholder{color:var(--s-muted)}
    .sky-search-results{overflow-y:auto;padding:15px}
    .sky-search-meta{margin:0 4px 12px;color:var(--s-muted);font-size:12px}
    .sky-search-meta strong{color:var(--s-text)}
    .sky-search-group-title{margin:20px 4px 10px;color:var(--s-muted);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
    .sky-search-result{display:block;padding:15px;margin-bottom:9px;border:1px solid var(--s-line);border-radius:13px;color:inherit;text-decoration:none;
      background:var(--s-alt);transition:border-color .18s,transform .18s,background .18s}
    .sky-search-result:hover,.sky-search-result.is-active{border-color:var(--s-accent);background:color-mix(in srgb,var(--s-accent) 8%,var(--s-alt))}
    .sky-search-result.is-active{transform:translateX(3px)}
    .sky-search-result h3{margin:10px 0 6px;font-size:15px;font-weight:700;letter-spacing:0}
    .sky-search-result p{margin:0 0 12px;color:var(--s-muted);font-size:13px;line-height:1.65}
    .sky-search-category{display:inline-block;padding:4px 9px;border-radius:30px;font-size:11px;font-weight:700;
      background:color-mix(in srgb,var(--s-accent) 14%,transparent);color:var(--s-accent)}
    .sky-search-destination{color:var(--s-accent);font-size:12px;font-weight:800}
    .sky-search-result mark{background:color-mix(in srgb,var(--s-accent) 26%,transparent);color:inherit;border-radius:3px;padding:0 2px}
    .sky-search-empty{padding:28px 15px 18px;text-align:center;color:var(--s-muted);line-height:1.7}
    .sky-search-empty strong{display:block;margin-bottom:6px;color:var(--s-text);font-size:16px}
    .sky-search-empty a{color:var(--s-accent);font-weight:700}
    .sky-search-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 4px}
    .sky-search-chip{padding:8px 13px;border:1px solid var(--s-line);border-radius:30px;background:var(--s-alt);color:var(--s-text);
      font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .2s,color .2s,transform .2s}
    .sky-search-chip:hover{border-color:var(--s-accent);color:var(--s-accent);transform:translateY(-1px)}
    .sky-search-footer{padding:12px 18px;border-top:1px solid var(--s-line);color:var(--s-muted);font-size:11px;display:flex;justify-content:space-between;gap:10px}
    @keyframes skyFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes skyModalIn{from{opacity:0;transform:translateY(12px) scale(.99)}to{opacity:1;transform:none}}
    @media(max-width:600px){
      .sky-search-overlay{padding:12px;align-items:center}
      .sky-search-modal{max-height:90vh;border-radius:17px}
      .sky-search-header{padding:16px}
      .sky-search-trigger kbd,.sky-search-trigger span{display:none}
      .sky-search-trigger{padding:10px 12px}
      .sky-search-footer{display:none}
    }
    @media(prefers-reduced-motion:reduce){.sky-search-overlay,.sky-search-modal,.sky-search-result,.sky-search-trigger,.sky-search-chip{animation:none;transition:none}}
  `;

  const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>`;
  const isMac = /Mac|iPhone|iPad/.test(
    navigator.userAgentData?.platform || navigator.platform || "",
  );

  document.head.appendChild(
    Object.assign(document.createElement("style"), { textContent: styles }),
  );

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "sky-search-trigger";
  trigger.setAttribute("aria-label", "Search Skyshade");
  trigger.innerHTML = `${icon}<span>Search</span><kbd>${isMac ? "⌘ K" : "Ctrl K"}</kbd>`;

  const overlay = document.createElement("div");
  overlay.className = "sky-search-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <section class="sky-search-modal" role="dialog" aria-modal="true" aria-labelledby="sky-search-title">
      <header class="sky-search-header">
        <div class="sky-search-heading">
          <h2 id="sky-search-title">Search Skyshade</h2>
          <button class="sky-search-close" type="button" aria-label="Close search">&times;</button>
        </div>
        <div class="sky-search-input-wrap">
          ${icon}
          <input class="sky-search-input" type="search" placeholder="Describe what you're looking for..." autocomplete="off" aria-label="Search website">
        </div>
      </header>
      <div class="sky-search-results" aria-live="polite"></div>
      <footer class="sky-search-footer">
        <span>Search across Skyshade</span>
        <span>ESC to close · ↑ ↓ to navigate · Enter to open</span>
      </footer>
    </section>`;
  document.body.appendChild(overlay);

  const navActions = document.querySelector(".nav-actions");
  if (navActions) {
    navActions.prepend(trigger);
  } else {
    Object.assign(trigger.style, {
      position: "fixed",
      right: "22px",
      bottom: "22px",
      zIndex: "1000",
    });
    document.body.appendChild(trigger);
  }

  const input = overlay.querySelector(".sky-search-input");
  const resultsEl = overlay.querySelector(".sky-search-results");
  const closeBtn = overlay.querySelector(".sky-search-close");

  let active = 0;
  let HL = null;
  let lastQ = null;

  const getItems = () => [...resultsEl.querySelectorAll("a.sky-search-result")];
  const hl = (t) =>
    HL
      ? t
          .split(HL)
          .map((p, i) => (i % 2 ? `<mark>${esc(p)}</mark>` : esc(p)))
          .join("")
      : esc(t);

  /* Recent searches (per browser) */
  const RECENT_KEY = "skyshade-recent-searches";
  const getRecent = () => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch (e) {
      return [];
    }
  };
  const saveRecent = (q) => {
    q = q.trim();
    if (q.length < 3) return;
    try {
      const list = [
        q,
        ...getRecent().filter((r) => r.toLowerCase() !== q.toLowerCase()),
      ].slice(0, 4);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    } catch (e) {}
  };

  const chips = (list) =>
    `<div class="sky-search-chips">${list
      .map(
        (s) =>
          `<button type="button" class="sky-search-chip" data-q="${esc(s)}">${esc(s)}</button>`,
      )
      .join("")}</div>`;

  function renderEmpty() {
    HL = null;
    const recent = getRecent();
    resultsEl.innerHTML = `
      <div class="sky-search-empty"><strong>What are you looking for?</strong>
        Describe what you want to achieve, or try one of these.</div>
      ${chips(SUGGESTIONS)}
      ${recent.length ? `<h3 class="sky-search-group-title">Recent searches</h3>${chips(recent)}` : ""}`;
  }

  function card(item, i) {
    const faq = item.type === "faq";
    const fits =
      lastQ &&
      lastQ.amount &&
      item.range &&
      !!item.monthly === lastQ.monthly &&
      lastQ.amount >= item.range[0] &&
      lastQ.amount <= item.range[1];
    return `<a class="sky-search-result" href="${esc(href(item.page, item.section))}" data-i="${i}">
      <span class="sky-search-category">${faq ? "FAQ · " : ""}${esc(item.category)}${fits ? " · Fits your budget" : ""}</span>
      <h3>${hl(item.title)}</h3>
      <p>${hl(faq ? snippet(item.answer) : item.description)}</p>
      <span class="sky-search-destination">${faq ? "Read full answer" : "View page"} →</span></a>`;
  }

  function render() {
    const q = input.value;
    if (!q.trim()) return renderEmpty();

    const { Q, faqs, pages, related } = search(q);
    lastQ = Q;
    const uniq = [...new Set(Q.direct)].sort((a, b) => b.length - a.length);
    HL = uniq.length
      ? new RegExp(`(?<![\\p{L}\\p{N}])(${uniq.map(escRe).join("|")})`, "giu")
      : null;

    const total = faqs.length + pages.length + related.length;
    if (!total) {
      HL = null;
      resultsEl.innerHTML = `<div class="sky-search-empty"><strong>No direct match found</strong>
        Try describing it differently, or browse our <a href="${href("services.html")}">services</a>
        or <a href="${href("contact.html")}">contact us</a>.</div>${chips(SUGGESTIONS.slice(0, 3))}`;
      return;
    }

    let n = 0;
    const group = (title, list) =>
      list.length
        ? `<h3 class="sky-search-group-title">${title}</h3>${list.map((it) => card(it, n++)).join("")}`
        : "";

    const budget = Q.amount
      ? `Budget: <strong>KES ${Q.amount.toLocaleString("en-US")}</strong> · `
      : "";
    const fixed = Q.fixes.length
      ? `Showing results for <strong>${esc(Q.fixes.map((f) => f[1]).join(" "))}</strong> · `
      : "";
    resultsEl.innerHTML =
      `<p class="sky-search-meta">${budget}${fixed}${total} result${total === 1 ? "" : "s"}</p>` +
      group("Best matches", pages) +
      group("Answers from our FAQ", faqs) +
      group("Related information", related);

    setActive(0, false);
  }

  function setActive(i, scroll = true) {
    const items = getItems();
    if (!items.length) return;
    active = (i + items.length) % items.length;
    items.forEach((el, idx) =>
      el.classList.toggle("is-active", idx === active),
    );
    if (scroll)
      items[active].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function openSearch() {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    startLive();
    if (!input.value.trim()) renderEmpty();
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch(restoreFocus = true) {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (restoreFocus) trigger.focus();
  }

  trigger.addEventListener("click", openSearch);
  closeBtn.addEventListener("click", () => closeSearch());
  overlay.addEventListener(
    "click",
    (e) => e.target === overlay && closeSearch(),
  );
  input.addEventListener("input", render);

  resultsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".sky-search-chip");
    if (chip) {
      input.value = chip.dataset.q;
      render();
      input.focus();
      return;
    }
    if (e.target.closest("a.sky-search-result")) {
      saveRecent(input.value);
      closeSearch(false); // also closes when the link only changes the #hash on the same page
    }
  });

  resultsEl.addEventListener("mousemove", (e) => {
    const a = e.target.closest("a.sky-search-result");
    if (a && +a.dataset.i !== active) setActive(+a.dataset.i, false);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(active + 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(active - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      getItems()[active]?.click();
    }
  });

  // Keep Tab focus inside the dialog
  overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const f = [...overlay.querySelectorAll("button, input, a[href]")].filter(
      (el) => el.offsetParent !== null,
    );
    if (!f.length) return;
    const first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay.classList.contains("is-open") ? closeSearch() : openSearch();
    }
    if (e.key === "Escape" && overlay.classList.contains("is-open"))
      closeSearch();
  });

  /* ---------- FAQ content ---------- */
  function faqCategory(item) {
    for (let p = item.parentElement; p; p = p.parentElement) {
      const h = p.querySelector(":scope > .eyebrow");
      if (h && h.textContent.trim()) return h.textContent.trim();
    }
    return "Frequently Asked Questions";
  }

  function parseFAQs(root) {
    return [...root.querySelectorAll("details.faq-item")]
      .map((item) => {
        const q = item.querySelector("summary")?.textContent.trim();
        const a = [...item.querySelectorAll("p")]
          .map((p) => p.textContent.trim())
          .join(" ");
        if (!q || !a) return null;
        if (!item.id) item.id = slugify(q);
        return {
          title: q,
          category: faqCategory(item),
          answer: a,
          page: "faq.html",
          section: item.id,
          type: "faq",
        };
      })
      .filter(Boolean);
  }

  async function loadFAQs() {
    let list = parseFAQs(document);
    if (!list.length) {
      try {
        const r = await fetch(href("faq.html"), { cache: "no-cache" });
        if (!r.ok) throw new Error("HTTP " + r.status);
        list = parseFAQs(
          new DOMParser().parseFromString(await r.text(), "text/html"),
        );
      } catch (err) {
        console.warn("Skyshade search: FAQ page could not be loaded", err);
        list = [];
      }
    }
    faqIndex = list;
    list.forEach(prepare);
  }

  /* ---------- Live content from your own pages ---------- */
  // Headings, cards, prices and table rows on these pages are indexed automatically.
  const LIVE_PAGES = [
    ["services.html", "Services"],
    ["solutions.html", "Solutions"],
    ["pricing.html", "Pricing"],
    ["work.html", "Portfolio"],
    ["about.html", "Company"],
  ];
  const LIVE_KEY = "skyshade-live-index-v2";
  const LIVE_TTL = 6 * 60 * 60 * 1000; // refresh cached content every 6 hours
  const DEV = /^(localhost|127\.|192\.168\.)/.test(location.hostname); // no caching while developing
  const clean = (t) =>
    String(t || "")
      .replace(/\s+/g, " ")
      .trim();
  const generated = new Set();

  // We give headings stable ids (identical on the live page and when crawled) so results can deep-link to them
  function ensureIds(root) {
    const used = new Set(
      [...root.ownerDocument.querySelectorAll("[id]")].map((e) => e.id),
    );
    root.querySelectorAll("h2, h3").forEach((h) => {
      if (h.id) return;
      const base = slugify(h.textContent) || "section";
      let id = base,
        n = 2;
      while (used.has(id)) id = base + "-" + n++;
      h.id = id;
      used.add(id);
      generated.add(id);
    });
  }

  function extractLive(doc, page, category) {
    const main = doc.querySelector("main") || doc.body;
    ensureIds(main);
    const out = [],
      seen = new Set();
    const push = (e) => {
      const k = norm(e.title) + "|" + page;
      if (e.title.length < 3 || seen.has(k)) return;
      seen.add(k);
      out.push({ ...e, page, category, type: "live" });
    };

    const f = (n) => Number(n).toLocaleString("en-US");
    const kw = (n) =>
      [
        n % 1000 === 0 ? n / 1000 + "k" : "",
        n >= 1e6 && n % 1e5 === 0 ? n / 1e6 + "m" : "",
        String(n),
      ]
        .filter(Boolean)
        .join(" ");

    main.querySelectorAll("h2, h3").forEach((h) => {
      if (h.closest(".cta-band, .site-footer, header, footer, details")) return;
      let title = clean(h.textContent);
      const box = h.closest(".card, article, li, .price-card, .project-card");
      const priceEl = box?.querySelector(".price");
      let body = "";
      const extra = {};

      if (priceEl) {
        // Package card. The page's currency switcher rewrites the visible price, so rebuild the KES price from data-* attributes.
        const d = priceEl.dataset,
          plus = d.plus ? "+" : "";
        let price = clean(priceEl.textContent),
          keywords = "";
        if (d.custom) price = "Custom quote";
        else if (d.kesMin && d.kesMax) {
          price = `KES ${f(d.kesMin)}–${f(d.kesMax)}${plus}`;
          extra.range = [+d.kesMin, d.plus ? 1e12 : +d.kesMax];
          keywords = kw(+d.kesMin) + " " + kw(+d.kesMax);
        } else if (d.kesVal) {
          price = `KES ${f(d.kesVal)}${plus}${d.suffix || ""}`;
          extra.range = [+d.kesVal, d.plus ? 1e12 : +d.kesVal];
          keywords = kw(+d.kesVal);
        }
        extra.monthly = !!d.suffix;
        extra.keywords =
          keywords +
          " price cost pricing package" +
          (d.suffix ? " monthly month plan" : "");
        const tl = [...box.querySelectorAll("p strong")].find((x) =>
          /timeline/i.test(x.textContent),
        );
        const timeline = tl
          ? clean(tl.parentElement.textContent).replace(
              /^estimated timeline:\s*/i,
              "",
            )
          : "";
        const label = clean(box.querySelector(".eyebrow")?.textContent);
        const feats = [...box.querySelectorAll("li")].map((li) =>
          clean(li.textContent),
        );
        extra.description = snippet(
          [price, timeline, label].filter(Boolean).join(" · ") +
            (feats.length ? ". Includes " + feats.slice(0, 3).join(", ") : ""),
          230,
        );
        body = clean(box.textContent.replace(h.textContent, ""));
      } else {
        let first = null;
        if (box) {
          body = clean(box.textContent.replace(h.textContent, ""));
          first = box.querySelector("p");
        } else {
          let el = h.nextElementSibling,
            n = 0;
          first = el && el.matches("p") ? el : null;
          for (
            ;
            el && n < 4 && !/^H[1-6]$/.test(el.tagName);
            el = el.nextElementSibling, n++
          )
            body += " " + el.textContent;
          body = clean(body);
        }
        extra.description = snippet(
          clean(first ? first.textContent : body),
          200,
        );
        // Very short card titles ("Scope") are meaningless alone: we prefix the section heading
        if (h.tagName === "H3" && title.length < 14) {
          const sec = clean(
            h.closest("section")?.querySelector("h2")?.textContent,
          );
          if (sec && sec !== title) title = sec + " · " + title;
        }
      }
      push({ title, answer: snippet(body, 600), section: h.id, ...extra });
    });

    // Pricing / comparison tables: one result per row
    main.querySelectorAll("tbody tr").forEach((tr) => {
      const cells = [...tr.children]
        .map((c) => clean(c.textContent))
        .filter(Boolean);
      if (cells.length < 2) return;
      push({
        title: cells[0],
        description: snippet(cells.slice(1).join(" · "), 200),
        answer: cells.join(" "),
        section: tr.closest("[id]")?.id,
      });
    });
    return out;
  }

  // Curated entries win (they carry synonyms); live ones add anchors, real prices and extra text
  const tset = (t) =>
    new Set(
      norm(t)
        .split(" ")
        .filter((w) => w && !STOP.has(w))
        .map(stem),
    );
  function mergeLive(items) {
    const cur = PAGE_INDEX.map((p) => [tset(p.title), p]);
    return items.filter((it) => {
      const a = tset(it.title);
      const hit = cur.find(([b, p]) => {
        if (p.page !== it.page || !a.size || !b.size) return false;
        let n = 0;
        a.forEach((w) => b.has(w) && n++);
        const m = Math.min(a.size, b.size);
        return n / m >= 0.75 && (m >= 2 || a.size === b.size);
      });
      if (!hit) return true;
      const p = hit[1];
      if (!p.section && it.section) p.section = it.section;
      if (!p.answer && it.answer) p.answer = it.answer;
      if (it.range) {
        p.range = it.range;
        p.monthly = it.monthly;
        p.description = it.description;
        p.keywords = (p.keywords + " " + (it.keywords || "")).trim();
      }
      prepare(p);
      return false;
    });
  }

  async function loadLive() {
    let items = null;
    if (!DEV) {
      try {
        const c = JSON.parse(localStorage.getItem(LIVE_KEY));
        if (c && Date.now() - c.t < LIVE_TTL) items = c.items;
      } catch (e) {}
    }
    if (!items) {
      const here = location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop()
        .replace(/\.html$/, "");
      const jobs = LIVE_PAGES.map(async ([page, cat]) => {
        if (page.replace(/\.html$/, "") === here)
          return extractLive(document, page, cat);
        const r = await fetch(href(page), { cache: "no-cache" });
        if (!r.ok) throw new Error(page + " " + r.status);
        return extractLive(
          new DOMParser().parseFromString(await r.text(), "text/html"),
          page,
          cat,
        );
      });
      items = (await Promise.allSettled(jobs)).flatMap((r) =>
        r.status === "fulfilled" ? r.value : [],
      );
      if (items.length && !DEV) {
        try {
          localStorage.setItem(
            LIVE_KEY,
            JSON.stringify({ t: Date.now(), items }),
          );
        } catch (e) {}
      }
    }
    liveIndex = mergeLive(items);
    liveIndex.forEach(prepare);
  }

  let liveStarted = false;
  function startLive() {
    if (liveStarted) return;
    liveStarted = true;
    loadLive()
      .then(() => input.value.trim() && render())
      .catch((err) =>
        console.warn("Skyshade search: live content could not be loaded", err),
      );
  }

  /* ---------- Deep links: #heading or #faq-question ---------- */
  function scrollToHash(initial) {
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch (e) {
      return;
    }
    const el = id && document.getElementById(id);
    if (!el) return;
    const isDetails = el.matches("details");
    if (isDetails) el.open = true;
    // On first load the browser already handles ids that exist in the HTML; we only handle the ones we created
    if (initial && !isDetails && !generated.has(id)) return;
    setTimeout(
      () =>
        el.scrollIntoView({
          block: isDetails ? "center" : "start",
          behavior: "smooth",
        }),
      60,
    );
  }

  ensureIds(document.querySelector("main") || document.body);
  scrollToHash(true);
  addEventListener("hashchange", () => scrollToHash(false));
  (window.requestIdleCallback || ((f) => setTimeout(f, 1500)))(startLive);

  loadFAQs().then(() => {
    scrollToHash(true);
    if (input.value.trim()) render();
  });
})();
