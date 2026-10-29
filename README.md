# Joel Novio García — Portfolio

Personal portfolio of Joel Novio García, a Computer Engineering student (Software Engineering) at UPC in Barcelona, focused on frontend development.

**Live:** https://portfolio-sigma-roan-wlb4xykmfi.vercel.app/

## Features

- Single-page site with sections for work, about and contact
- Three languages: English, Catalan and Spanish
- Light and dark theme
- Project cards with links to each repository and live demo
- Section navigation that highlights the section in view, plus a skip-to-content link
- Page title and Open Graph title update with the selected language

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Fonts: Fraunces and Atkinson Hyperlegible (`@fontsource`)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the build
```

## Deploy (Vercel)

Import the repository in Vercel with the **Vite** preset. No environment variables are needed. `vercel.json` sets the build command (`npm run build`), the output directory (`dist`) and some security headers.

## Project structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx              # page layout and sections
│   ├── content.ts           # all texts and projects (EN/CA/ES)
│   ├── components/
│   │   ├── ExternalLink.tsx
│   │   └── ScreenshotSlot.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vercel.json
└── vite.config.ts
```

## Contact

- GitHub: [github.com/joelng25](https://github.com/joelng25)
- LinkedIn: [linkedin.com/in/joel-novio](https://www.linkedin.com/in/joel-novio)
