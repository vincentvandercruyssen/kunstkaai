# 🎧 Energy Field — Interactief Webexperiment

## 📌 Concept

Energy Field is een generatieve, interactieve installatie die reageert op beweging en geluid.

Op het scherm zie je een levend veld van deeltjes dat:
- autonoom beweegt
- reageert op de muis
- chaotischer wordt door geluid

Het werk nodigt bezoekers uit om te experimenteren:
- beweeg je muis → deeltjes volgen je
- maak geluid → alles explodeert in chaos
- klik → tijdelijke verstoring van het systeem

---

## 🎯 Doel

Het doel is om een visuele blikvanger te creëren die:
- mensen doet stoppen
- intuïtief werkt zonder uitleg
- continu blijft evolueren

---

## 🧠 Hoe werkt het?

### 1. Canvas
De animatie wordt getekend met de HTML5 Canvas API.

### 2. Particles
Er worden 300 deeltjes gegenereerd met:
- positie (x, y)
- snelheid (vx, vy)

### 3. Animatie
Met `requestAnimationFrame` wordt het scherm continu opnieuw getekend.

### 4. Interactie

#### 🖱️ Muis
Deeltjes worden aangetrokken door de muispositie.

#### 🔊 Microfoon
Via de Web Audio API wordt geluidsinput gemeten:
- luider geluid = meer chaos
- deeltjes bewegen sneller en onvoorspelbaarder

#### 🖱️ Klik
Klikken zorgt voor een "explosie" in het systeem.

---

## ⚙️ Technologieën

- HTML5 Canvas
- JavaScript (ES6)
- Web Audio API
- CSS

---

## 🎨 Artistieke keuzes

- Zwarte achtergrond → focus op beweging en kleur
- HSL kleuren → vloeiende regenboog
- Trails effect → motion blur / flow gevoel
- Geen UI → pure ontdekking

---

## 🔁 Autonoom gedrag

Zelfs zonder interactie blijft het systeem:
- bewegen
- veranderen
- visueel interessant

---

## 🧪 Inspiratie & bronnen

- Generative art (CodePen, OpenProcessing)
- Creative coding experiments
- Vibecoding met AI

---

## 🚀 Mogelijke uitbreidingen

- Webcam input (bewegingsdetectie)
- 3D versie met Three.js
- Shader effecten (WebGL)
- Geluid genereren i.p.v. enkel analyseren

---

## 👤 Auteur

[ jouw naam hier ]
