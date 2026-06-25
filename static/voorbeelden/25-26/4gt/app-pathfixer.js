/**
 * Verwijdert een leading slash uit een pad.
 * "/style.css" → "style.css"
 * "/footage/img.png" → "footage/img.png"
 */
function removeLeadingSlash(str) {
  if (typeof str !== "string") return str;
  return str.startsWith("/") ? str.slice(1) : str;
}

function fixDocumentPaths(doc) {
  if (!doc) return;

  // link
  const links = doc.querySelectorAll("link[href]");
  links.forEach((link) => {
    link.href = removeLeadingSlash(link.getAttribute("href"));
  });

  // a
  const anchors = doc.querySelectorAll("a[href]");
  anchors.forEach((a) => {
    a.href = removeLeadingSlash(a.getAttribute("href"));
  });

  // img
  const images = doc.querySelectorAll("img[src]");
  images.forEach((img) => {
    img.src = removeLeadingSlash(img.getAttribute("src"));
  });

  // ook voor style="background-image: url('/../.....');"
  const elementsWithStyle = doc.querySelectorAll("[style]");
  elementsWithStyle.forEach((el) => {
    const style = el.getAttribute("style");
    const fixedStyle = style.replace(/url\(['"]?\/(.*?)['"]?\)/g, (match, p1) => {
      return `url('${p1}')`;
    });
    el.setAttribute("style", fixedStyle);
  });
}

/**
 * Controleer alle iframes op de pagina, bestaande en iframes die inladen
 */
function processIframes() {
  document.querySelectorAll("iframe").forEach((iframe) => {
    iframe.addEventListener("load", () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        fixDocumentPaths(doc);
      } catch (error) {
        // Cross-origin iframe → niets doen
        console.warn("Kan iframe niet aanpassen (cross-origin).");
      }
    });
  });
}

// Start na DOM-load
document.addEventListener("DOMContentLoaded", processIframes);
