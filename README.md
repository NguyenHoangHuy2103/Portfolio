# Nguyễn Hoàng Huy — Personal Portfolio

Personal portfolio website of Nguyễn Hoàng Huy — Backend / Full-stack Developer.

**Live:** [huycoder2103.github.io/Portfolio](https://huycoder2103.github.io/Portfolio)

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, CSS Grid, Flexbox, animations
- **Vanilla JavaScript** — no frameworks, no dependencies
- **Google Fonts** — Space Grotesk + Inter

## Features

- Typewriter effect cycling through roles
- Scroll reveal animations via IntersectionObserver
- Scrollspy navigation with active link highlighting
- Scroll progress bar
- Live clock (GMT+7)
- Click-to-copy email
- Mobile hamburger drawer
- Open Graph / Twitter meta tags for social sharing
- Fully responsive (mobile-first)

## Project Structure

```
Portfolio/
├── index.html              # Main entry point
├── assets/
│   ├── css/
│   │   └── style.css       # All styles
│   └── js/
│       └── main.js         # All scripts
├── archive/
│   └── index-v1.html       # Original design (archived)
├── portfolio.md            # Content source
└── server.js               # Local dev server (Node.js)
```

## Run Locally

```bash
node server.js
# → http://localhost:3000
```

## Deploy to GitHub Pages

1. Push to `main` branch
2. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
3. Site live at `https://huycoder2103.github.io/Portfolio`

---

© 2026 Nguyễn Hoàng Huy
