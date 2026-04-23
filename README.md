# 🌐 Web-KNEU

This repository contains lab assignments and an Individual Home Work (IHW) for the **"Web Programming"** course (1st semester, KNEU).

---

## 📁 Repository Structure

```
Web-KNEU/
├── Lab#1/          — HTML Basics: media content
├── Lab#2/          — CSS styling & audio player
├── Lab#3/          — JavaScript: DOM, events, math
├── Lab#4/          — Vinyl record store (JS + cart)
├── Lab#5/          — Extended store (survey form)
└── IHW/            — IHW: full multi-page website
```

---

## 🧪 Lab Assignments

### Lab#1 — HTML Basics
Static HTML pages with basic markup, tables, images, embedded video and audio.

- `wins.html` — table of Charles Leclerc's Formula 1 victories
- `video.html` — page with embedded video
- Media assets: `Images/`, `Audio/`, `Video/`

**Technologies:** HTML5 (tables, `<audio>`, `<video>`, `<img>`)

---

### Lab#2 — CSS & Audio Player
**NotSpotify** music web app — first version.

- `index.html` — main page with track cards and embedded audio
- `tickets.html` — event tickets page
- `style.css` — custom Spotify-style design (dark theme, sidebar, cards)

**Technologies:** HTML5, CSS3 (Flexbox, custom properties)

---

### Lab#3 — JavaScript & DOM
Extended **NotSpotify** with interactive JavaScript features.

- `index.html` — main page with dynamic quotes from Ukrainian writers
- `info.html` — quote of the day page (random, with `opacity` animation)
- `calculus.html` — math calculator (sum, difference, product, quotient)
- `tickets.html` — concert tickets page
- `info.js` — random quote display logic
- `math.js` — arithmetic operations on two numbers

**Technologies:** HTML5, CSS3, JavaScript (DOM, events, `Math.random()`)

---

### Lab#4 — Vinyl Record Store
**VinilLagann** online store — base version.

- `index.html` — product catalog (6 vinyl records)
- `product-N.html` / `product-N-en.html` — product pages (UA + EN versions)
- `cart.html` / `cart-en.html` — shopping cart
- `en.html` — English version of the main page
- `js/main.js` — catalog logic, filtering, quick page navigation
- `js/cart.js` — cart management via `localStorage`
- `css/style.css` — styling (Spotify-style dark theme, Montserrat font)

**Products:** Kenshi Yonezu — Kick Back, Kenshi Yonezu — IRIS OUT, Green Day — Boulevard of Broken Dreams, Franz Ferdinand — Take Me Out, Tame Impala — Dracula, SadSvit — Силуети

**Technologies:** HTML5, CSS3, JavaScript (`localStorage`, dynamic DOM)

---

### Lab#5 — Store with Survey Form
Extended **VinilLagann** with additional functionality.

- All pages from Lab#4 +
- `survey.html` — multi-step survey form
- `js/survey.js` — form validation and results display logic
- `css/style.css` — updated styles

**Technologies:** HTML5, CSS3, JavaScript (forms, validation, multi-step UX)

---

## 🏠 IHW — Individual Home Work

The final, most complete version of the **VinilLagann** store.

### Features
- 🛒 **Product Catalog** — 6 vinyl records with detailed pages (UA + EN)
- 🛍️ **Shopping Cart** — add/remove items via `localStorage`
- 📋 **Survey Form** — multi-step form with validation
- 🌐 **Bilingual** — full Ukrainian and English versions of the site
- 💬 **Dynamic Quotes** — random quotes from Ukrainian authors with animation
- 🍪 **Cookie Banner** — consent tracking with theme customization

### File Structure
```
IHW/
├── index.html              — main page (UA)
├── en.html                 — main page (EN)
├── product-1..6.html       — product pages (UA)
├── product-1..6-en.html    — product pages (EN)
├── cart.html / cart-en.html — shopping cart
├── survey.html             — survey form
├── css/style.css           — global styles
├── js/
│   ├── main.js             — main logic, quotes
│   ├── cart.js             — cart management
│   ├── cookies.js          — cookie banner, theme switching
│   └── survey.js           — survey logic
├── img/                    — album cover images
└── audio/                  — audio previews
```

**Technologies:** HTML5, CSS3, Vanilla JavaScript, `localStorage`, Cookies, Google Fonts (Montserrat)

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Semantic markup, media elements |
| CSS3 | Flexbox, CSS variables, responsive layout |
| JavaScript (ES6+) | DOM manipulation, events, `localStorage`, Cookies |
| Google Fonts | Montserrat typeface |

---

## 🚀 Getting Started

Clone the repository and open any `index.html` in your browser:

```bash
git clone https://github.com/uzzwarr/Web-KNEU.git
cd Web-KNEU
```

Open the desired lab folder and launch `index.html` in a browser. No dependencies or build steps required — pure HTML/CSS/JS.

---

## 📄 License

This repository is distributed under the MIT License. See [LICENSE](LICENSE) for details.
