// Docs site interactions: nav scroll-spy, code toggles, tabs demo, modal demo, copy-to-clipboard.
(function () {
  "use strict";

  // ---- Scroll-spy for sidebar nav -----------------------------------
  var sections = Array.prototype.slice.call(document.querySelectorAll(".docs-section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".docs-sidebar a[href^='#']"));

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // ---- Code sample toggles -------------------------------------------
  document.querySelectorAll(".demo-code-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("aria-controls"));
      if (!target) return;
      var isHidden = target.hasAttribute("hidden");
      if (isHidden) {
        target.removeAttribute("hidden");
        btn.textContent = "Hide code";
      } else {
        target.setAttribute("hidden", "");
        btn.textContent = "Show code";
      }
    });
  });

  // ---- Copy-to-clipboard for swatches ---------------------------------
  // Delegated on document because swatches are injected asynchronously
  // (after the tokens.json fetch resolves), so they don't exist yet if we
  // bind listeners directly at script-load time.
  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-copy]");
    if (!el) return;
    var value = el.getAttribute("data-copy");
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(function () {
      var meta = el.querySelector(".swatch-hex");
      if (!meta) return;
      var original = meta.textContent;
      meta.textContent = "Copied!";
      setTimeout(function () { meta.textContent = original; }, 1200);
    });
  });

  // ---- Tabs demo --------------------------------------------------------
  document.querySelectorAll("[data-tabs]").forEach(function (tabGroup) {
    var tabs = Array.prototype.slice.call(tabGroup.querySelectorAll(".tab"));
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        var panels = tabGroup.parentElement.querySelectorAll(".tab-panel");
        panels.forEach(function (p) { p.setAttribute("hidden", ""); });
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) panel.removeAttribute("hidden");
      });
    });
  });

  // ---- Modal demo ---------------------------------------------------------
  var modalTriggers = document.querySelectorAll("[data-modal-open]");
  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var modal = document.getElementById(trigger.getAttribute("data-modal-open"));
      if (modal) modal.removeAttribute("hidden");
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var overlay = btn.closest(".modal-overlay");
      if (overlay) overlay.setAttribute("hidden", "");
    });
  });

  // ---- Switch demo state (purely cosmetic, no persistence) --------------
  document.querySelectorAll(".switch input").forEach(function (input) {
    input.addEventListener("change", function () {});
  });
})();
