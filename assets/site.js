(() => {
  "use strict";

  const root = document.documentElement;
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================

  const getTheme = () => root.dataset.theme || "light";

  function updateThemeButton() {
    if (!themeButton) return;

    const dark = getTheme() === "dark";

    themeButton.textContent = dark ? "☀" : "☾";

    themeButton.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
  }

  updateThemeButton();

  themeButton?.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem("skyshade-theme", nextTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved.", error);
    }

    updateThemeButton();
  });

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuButton?.setAttribute("aria-expanded", "false");

      if (menuButton) {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });
  });

  // ==========================================
  // AUTOMATIC COPYRIGHT YEAR
  // ==========================================

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // ==========================================
  // CONTACT FORM - FORMSPREE
  // ==========================================

  const form = document.querySelector("[data-contact-form]");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeaakjdq";

  if (form) {
    // Keep the HTML form action consistent with this endpoint.
    form.setAttribute("action", FORMSPREE_ENDPOINT);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = form.querySelector("[data-form-status]");
      const submitButton = form.querySelector('button[type="submit"]');

      if (!submitButton) return;

      const originalText = submitButton.textContent;

      // Prevent duplicate submissions.
      if (submitButton.disabled) return;

      // Clear previous messages.
      if (status) {
        status.textContent = "";
        status.style.color = "";
      }

      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      try {
        const formData = new FormData(form);

        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        let result = {};

        try {
          result = await response.json();
        } catch (error) {
          result = {};
        }

        if (!response.ok) {
          let errorMessage = "Unable to send your enquiry.";

          if (result.errors?.length) {
            errorMessage = result.errors
              .map((error) => error.message)
              .join(" ");
          } else if (response.status === 404) {
            errorMessage =
              "Formspree could not find this form. Please verify your form endpoint.";
          } else if (response.status === 422) {
            errorMessage =
              "Some submitted information was rejected. Please check your entries.";
          } else if (response.status === 429) {
            errorMessage =
              "Too many requests. Please wait a moment and try again.";
          } else if (response.status >= 500) {
            errorMessage =
              "Formspree is temporarily unavailable. Please try again later.";
          }

          throw new Error(errorMessage);
        }

        // Successful submission.
        form.reset();

        if (status) {
          status.textContent =
            "Thank you! Your enquiry has been sent successfully. We'll be in touch.";

          status.style.color = "var(--primary)";
        }
      } catch (error) {
        console.error("Contact form error:", error);

        if (status) {
          status.textContent =
            error.message || "Something went wrong. Please try again.";

          status.style.color = "#dc5555";
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }
})();
