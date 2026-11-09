(function () {
  var sp = document.getElementById("rh-sparks");
  if (!sp) return;
  for (var i = 0; i < 26; i++) {
    var s = document.createElement("i");
    s.className = "rh-spark";
    s.style.left = 15 + Math.random() * 60 + "%";
    s.style.top = 35 + Math.random() * 55 + "%";
    s.style.setProperty("--dx", Math.random() * 80 - 40 + "px");
    s.style.animationDuration = 4 + Math.random() * 5 + "s";
    s.style.animationDelay = -Math.random() * 8 + "s";
    s.style.transform = "scale(" + (0.5 + Math.random()) + ")";
    sp.appendChild(s);
  }
  if (
    matchMedia("(hover:hover)").matches &&
    !matchMedia("(prefers-reduced-motion:reduce)").matches
  ) {
    var L = document.querySelectorAll(".rh-layer");
    addEventListener("mousemove", function (e) {
      var x = e.clientX / innerWidth - 0.5,
        y = e.clientY / innerHeight - 0.5;
      L.forEach(function (l) {
        l.style.transform =
          "translate(" +
          -x * l.dataset.depth +
          "px," +
          -y * l.dataset.depth +
          "px)";
      });
    });
  }
})();

(function () {
  var header = document.querySelector(".site-header"),
    hero = document.querySelector(".rh");
  if (!header || !hero) return;
  var toggle = document.querySelector("[data-menu-toggle]");
  function update() {
    var menuOpen = toggle && toggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("is-top", scrollY < 40 && !menuOpen);
  }
  addEventListener("scroll", update, { passive: true });
  if (toggle)
    toggle.addEventListener("click", function () {
      setTimeout(update, 0);
    });
  update();
})();
