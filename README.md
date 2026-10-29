# Joel Novio Garcia — Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://portfolio-joelng25s-projects.vercel.app)

Personal portfolio. I'm a Computer Engineering student at UPC in Barcelona. I build tools, browser extensions and full-stack apps with C++, Python and the web.

**Live site:** https://portfolio-joelng25s-projects.vercel.app

![Desktop view of the portfolio hero](docs/screenshots/desktop-hero.png)

## Screenshots

| Selected work | Mobile |
| --- | --- |
| ![Selected work section](docs/screenshots/projects.png) | ![Mobile view (390×844)](docs/screenshots/mobile.png) |

## Features

- Single page with hero, selected work, about and contact sections
- Three languages: English, Catalan and Spanish (saved in `localStorage`)
- Dark theme by default, with a light theme toggle
- Optional click sounds (Web Audio), with a toggle
- Animated ASCII name and text scramble effects on hover (disabled with `prefers-reduced-motion`)
- CV download in the selected language
- Live Barcelona clock in the footer
- Contact form that opens the visitor's mail client with the message filled in
- Responsive design from mobile to wide desktop

## Projects shown

| Project | Stack | Links |
| --- | --- | --- |
| Pulso Ciudadano | React, TypeScript, Vercel | [code](https://github.com/joelng25/pulso-ciudadano) · [demo](https://pulso-ciudadano-green.vercel.app) |
| Task Tracker | C++, React, TypeScript, Docker | [code](https://github.com/joelng25/Task-Tracker) · [demo](https://task-tracker-web-4uqz.onrender.com) |
| Lingua Check | TypeScript, Chrome Extension, LanguageTool | [code](https://github.com/joelng25/lingua-check) |
| YouTube Remaining Time | JavaScript, Chrome Extension | [code](https://github.com/joelng25/youtube-remaining-time-speed) |
| Task Tracker CLI | C++, GoogleTest, Make | [code](https://github.com/joelng25/Task-Tracker-CLI) · [release v2.2.0](https://github.com/joelng25/Task-Tracker-CLI/releases/tag/v2.2.0) |
| Basic Calculator | Python, Tkinter, pytest | [code](https://github.com/joelng25/basic-calculator) |
| Number Guessing Game | C++, CLI | [code](https://github.com/joelng25/Number-Guessing-Game-CLI) |

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) with `@vitejs/plugin-react`
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`
- Fonts: system Helvetica Neue / Arial stack (no web fonts)
- Hosting: [Vercel](https://vercel.com/)

## Project structure

```
├── docs/screenshots/        # images used in this README
├── public/
│   ├── cv/                  # CV_Joel_Novio_{en,ca,es}.pdf
│   ├── favicon.ico
│   └── og-portfolio.jpg
├── src/
│   ├── components/
│   │   ├── AsciiArt.tsx     # animated ASCII name and footer wave
│   │   ├── Contact.tsx      # contact form
│   │   ├── icons.tsx
│   │   └── ScrambleText.tsx
│   ├── App.tsx              # page layout and sections
│   ├── content.ts           # all texts and projects (EN/CA/ES)
│   ├── sound.ts             # click sounds
│   ├── index.css            # theme colors and animations
│   └── main.tsx
├── index.html
├── package.json
├── vercel.json
└── vite.config.ts
```

## Run locally

Requires Node.js 20.19+ and npm.

```bash
git clone https://github.com/joelng25/portfolio.git
cd portfolio
npm install
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server at http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

All texts and project data live in `src/content.ts`.

## Deploy

Deployed on Vercel from `main`. Every push to `main` triggers a production deploy and pull requests get preview deployments. `vercel.json` sets the build command, the output directory (`dist`) and security headers.

## Contact

- Email: [joelnogao625@gmail.com](mailto:joelnogao625@gmail.com)
- GitHub: [github.com/joelng25](https://github.com/joelng25)
- LinkedIn: [linkedin.com/in/joel-novio](https://www.linkedin.com/in/joel-novio)
