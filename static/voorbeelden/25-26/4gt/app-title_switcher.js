/* app-title_switcher.js - Simplified */

let originalTitle = null;

// Helper: titel instellen en origineel bewaren
const setTitle = (newTitle) => {
  if (!newTitle || typeof newTitle !== "string") return;
  if (originalTitle === null && document.title !== newTitle) {
    originalTitle = document.title;
  }
  document.title = newTitle;
};

// Helper: titel herstellen als geen enkele actieve iframe meer over is
const tryRestoreTitle = () => {
  const hasActive = Array.from(document.querySelectorAll("iframe")).some(
    (iframe) => iframe.__tsAttached
  );
  if (!hasActive && originalTitle !== null) {
    document.title = originalTitle;
    originalTitle = null;
  }
};

// Hoofdlogica
function attachToIframe(iframe) {
  if (!iframe) return;

  // Als src leeg is, beschouwen we dit als een 'gesloten' iframe -> detach
  const src = iframe.getAttribute("src");
  if (!src) {
    detachFromIframe(iframe);
    return;
  }

  if (iframe.__tsAttached) return; // Reeds gekoppeld
  iframe.__tsAttached = true;

  // Handler voor de load event en directe aanroep
  const checkTitle = () => {
    try {
      // Same-origin poging
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc?.title) setTitle(doc.title);
    } catch {
      // Cross-origin fallback
      iframe.contentWindow?.postMessage({ type: "requestTitle" }, "*");
    }
  };

  iframe.__tsCheckTitle = checkTitle;
  iframe.addEventListener("load", checkTitle, { passive: true });
  checkTitle(); // Direct proberen
}

function detachFromIframe(iframe) {
  if (!iframe || !iframe.__tsAttached) return;

  // Opruimen
  if (iframe.__tsCheckTitle) {
    iframe.removeEventListener("load", iframe.__tsCheckTitle);
    delete iframe.__tsCheckTitle;
  }
  iframe.__tsAttached = false;

  tryRestoreTitle();
}

// Globale message listener (slechts 1 keer nodig)
window.addEventListener("message", (e) => {
  if (e.data?.type === "documentTitle") setTitle(e.data.title);
});

function init(selector) {
  // Specifieke selector mode
  if (selector) {
    const el = document.querySelector(selector);
    if (el?.tagName === "IFRAME") attachToIframe(el);
    return;
  }

  // Init bestaande iframes
  document.querySelectorAll("iframe").forEach(attachToIframe);

  // Observer voor DOM changes én attribuut changes (src)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      // 1. SRC wijzigingen
      if (m.type === "attributes" && m.target.tagName === "IFRAME") {
        attachToIframe(m.target); // De functie checkt zelf of src leeg of gevuld is
      }
      // 2. Nieuwe nodes (Iframes toegevoegd)
      m.addedNodes.forEach((node) => {
        if (node.tagName === "IFRAME") attachToIframe(node);
        else if (node.querySelectorAll)
          node.querySelectorAll("iframe").forEach(attachToIframe);
      });
      // 3. Verwijderde nodes (Iframes weggehaald)
      m.removedNodes.forEach((node) => {
        if (node.tagName === "IFRAME") detachFromIframe(node);
        else if (node.querySelectorAll)
          node.querySelectorAll("iframe").forEach(detachFromIframe);
      });
    });
  });

  observer.observe(document.body.parentNode || document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"], // We reageren alleen op src changes, niet op style/class etc.
  });
}

// Auto-start
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => init())
  : init();

window.appTitleSwitcher = { init, attachToIframe, detachFromIframe };
