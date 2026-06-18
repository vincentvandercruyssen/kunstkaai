# RESOLE Eco-Arcade Mini-Game

An interactive HTML5 Canvas mini-game built from scratch using **HTML5, CSS3, and Vanilla JavaScript**. Designed as an embeddable component to support the RESOLE sustainable footwear crowdfunding campaign.

---

## 👟 The RESOLE Concept
Traditional sneakers are glued together, making them impossible to recycle. **RESOLE** uses a modular shoe system where individual parts (mesh, soles, cushioning) can be snapped off and replaced, cutting down global landfill waste.

---

## 🎮 Game Rules & Mechanics
Players manage a recycling and assembly pipeline in real time. Catch sustainable parts to score points and avoid toxic manufacturing waste.

* **Good Items (Catch):**
  * **Good Mesh** (+10 pts) – Recycled upper fabric.
  * **Eco Sole** (+15 pts) – Biodegradable outsoles.
  * **Plant Foam** (+20 pts) – Natural cushioning.
* **Bad Items (Avoid):**
  * **Toxic Waste / Chemicals** (-25% Shield Health).

*The game ends instantly if your Shield Health drops to 0%.*

---

## 🕹️ Controls
* **Move Left:** Press **Left Arrow** or **A**
* **Move Right:** Press **Right Arrow** or **D**

---

## 🎨 Brand Design System
Built using the official RESOLE eco-conscious color palette:
* `Charcoal (#222222)` — Main background.
* `Deep Forest Green (#1E3D2F)` — Player platform.
* `Sage Green (#6B8F71)` & `Moss Green (#53775D)` — Sustainable items.
* `Sand Beige (#CDBFA6)` — Highlight text, borders, and soles.

---

## 📂 Project Structure
* `index.html` — Handles the app states (Start, Game, Results Screen).
* `style.css` — Controls layouts, responsiveness, and brand colors.
* `app.js` — Powers the canvas animations, controls, and collision logic.

---

## 🚀 How to Run
1. Save `index.html`, `style.css`, and `app.js` into the same folder.
2. Double-click `index.html` to launch the game instantly in any browser.