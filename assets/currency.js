/* Skyshade shared currency helper.
   Prices are stored in KES and converted for display only.
   Live rates come from ExchangeRate-API's open endpoint (updates once a day, attribution required),
   are cached in the browser for 24 hours, and fall back to the fixed rates below if anything fails. */
(function () {
  "use strict";
  var KEY = "skyshade-currency";
  var RATES_KEY = "skyshade-rates";
  var TTL = 24 * 60 * 60 * 1000;
  var API = "https://open.er-api.com/v6/latest/KES";

  var LIST = [
    { code: "KES", flag: "🇰🇪", sym: "KSh", rate: 1 },
    { code: "USD", flag: "🇺🇸", sym: "$", rate: 0.0077 },
    { code: "EUR", flag: "🇪🇺", sym: "€", rate: 0.0071 },
    { code: "GBP", flag: "🇬🇧", sym: "£", rate: 0.0061 },
    { code: "AED", flag: "🇦🇪", sym: "", rate: 0.028 },
    { code: "CAD", flag: "🇨🇦", sym: "CA$", rate: 0.0105 },
    { code: "ZAR", flag: "🇿🇦", sym: "R", rate: 0.14 },
    { code: "UGX", flag: "🇺🇬", sym: "USh", rate: 28.5 },
    { code: "TZS", flag: "🇹🇿", sym: "TSh", rate: 20 }
  ];
  var FALLBACK = LIST.map(function (c) { return c.rate; });
  var live = false;
  var asOf = "October 2026"; // describes the fixed fallback rates; update it if you change them

  function find(code) {
    for (var i = 0; i < LIST.length; i++) if (LIST[i].code === code) return LIST[i];
    return null;
  }
  function has(code) { return !!find(code); }
  function getSaved() {
    try { var c = localStorage.getItem(KEY); return has(c) ? c : "KES"; } catch (e) { return "KES"; }
  }
  function save(code) { try { localStorage.setItem(KEY, code); } catch (e) {} }

  // Accept live rates only if every currency is present and within half to double of the fixed rate.
  function applyRates(rates, label) {
    var next = {};
    for (var i = 0; i < LIST.length; i++) {
      var c = LIST[i];
      if (c.code === "KES") continue;
      var r = rates && rates[c.code];
      if (typeof r !== "number" || !isFinite(r) || r < FALLBACK[i] / 2 || r > FALLBACK[i] * 2) return false;
      next[c.code] = r;
    }
    LIST.forEach(function (c) { if (c.code !== "KES") c.rate = next[c.code]; });
    live = true;
    asOf = label;
    return true;
  }
  function dateLabel(v) {
    var d = new Date(v);
    return isNaN(d) ? null : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function loadCache() {
    try {
      var j = JSON.parse(localStorage.getItem(RATES_KEY));
      return !!(j && Date.now() - j.t < TTL && applyRates(j.rates, j.label));
    } catch (e) { return false; }
  }
  function fetchLive() {
    if (typeof fetch !== "function") return;
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
    fetch(API, ctl ? { signal: ctl.signal } : undefined)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) {
        if (!d || d.result !== "success") return;
        var label = dateLabel(d.time_last_update_utc) || dateLabel(Date.now());
        if (!applyRates(d.rates, label)) return;
        var keep = {};
        LIST.forEach(function (c) { if (c.code !== "KES") keep[c.code] = d.rates[c.code]; });
        try { localStorage.setItem(RATES_KEY, JSON.stringify({ t: Date.now(), rates: keep, label: label })); } catch (e) {}
        window.dispatchEvent(new CustomEvent("skyshade:rates"));
      })
      .catch(function () {})
      .then(function () { if (timer) clearTimeout(timer); });
  }

  // Keep two significant digits for converted amounts (270, 1,400, 19,000) so they read as estimates.
  function nice(v) {
    if (v <= 0) return 0;
    var step = Math.pow(10, Math.floor(Math.log10(v)) - 1);
    return Math.round(v / step) * step;
  }
  function amount(kes, code) {
    var c = find(code) || LIST[0];
    var v = kes * c.rate;
    if (c.code !== "KES") v = nice(v);
    return Math.round(v).toLocaleString("en-US");
  }
  function range(min, max, code) {
    return code + " " + amount(min, code) + "–" + amount(max, code);
  }
  function populate(select, short) {
    if (!select) return;
    select.innerHTML = LIST.map(function (c) {
      var label = c.flag + " " + c.code + (!short && c.sym ? " (" + c.sym + ")" : "");
      return '<option value="' + c.code + '">' + label + "</option>";
    }).join("");
  }

  var api = { list: LIST, has: has, getSaved: getSaved, save: save, amount: amount, range: range, populate: populate };
  Object.defineProperty(api, "asOf", { get: function () { return asOf; } });
  Object.defineProperty(api, "isLive", { get: function () { return live; } });
  window.SkyCurrency = api;

  if (!loadCache()) fetchLive();
})();
