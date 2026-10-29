export type Lang = 'en' | 'ca' | 'es'

export const LANGS: Lang[] = ['en', 'ca', 'es']
export const GITHUB = 'https://github.com/joelng25'
export const LINKEDIN = 'https://www.linkedin.com/in/joel-novio'

export type Copy = Record<
  | 'cv'
  | 'statement'
  | 'findOutMore'
  | 'getInTouch'
  | 'bio'
  | 'selectedWork'
  | 'live'
  | 'code'
  | 'demo'
  | 'theme'
  | 'sound'
  | 'light'
  | 'dark'
  | 'about'
  | 'aboutText'
  | 'contact'
  | 'basedIn'
  | 'role',
  string
>

export type Project = {
  name: string
  repo: string
  year: string
  desc: Record<Lang, string>
  tags: string[]
  demo?: string
  extra?: { label: string; href: string }
}

export const copy: Record<Lang, Copy> = {
  en: {
    cv: `Download CV`,
    statement: `Computer engineering student from Barcelona. I build tools, browser extensions and full-stack apps with C++, Python and the web.`,
    findOutMore: `Find out more`,
    getInTouch: `Get in touch`,
    bio: `Computer Engineering student at UPC, Barcelona. I design and build tools with C++, Python and the web.`,
    selectedWork: `Selected work`,
    live: `live`,
    code: `code`,
    demo: `demo`,
    theme: `Theme`,
    sound: `Sound`,
    light: `light`,
    dark: `dark`,
    about: `About`,
    aboutText: `I'm Joel, a Computer Engineering student at UPC in Barcelona. I like software that does one thing well: small tools, browser extensions and full-stack apps with tests, CI and Docker underneath.`,
    contact: `Contact`,
    basedIn: `Barcelona, ES`,
    role: `Computer Engineering · UPC`,
  },
  ca: {
    cv: `Descarrega el CV`,
    statement: `Estudiant d'enginyeria informàtica de Barcelona. Construeixo eines, extensions de navegador i aplicacions web amb C++, Python i TypeScript.`,
    findOutMore: `Descobreix més`,
    getInTouch: `Contacta'm`,
    bio: `Estudiant d'Enginyeria Informàtica a la UPC, Barcelona. Dissenyo i construeixo eines amb C++, Python i el web.`,
    selectedWork: `Projectes seleccionats`,
    live: `en directe`,
    code: `codi`,
    demo: `demo`,
    theme: `Tema`,
    sound: `So`,
    light: `clar`,
    dark: `fosc`,
    about: `Sobre mi`,
    aboutText: `Sóc en Joel, estudiant d'Enginyeria Informàtica a la UPC de Barcelona. M'agraden els programes que fan una cosa ben feta: petites eines, extensions de navegador i aplicacions full-stack amb tests, CI i Docker a sota.`,
    contact: `Contacte`,
    basedIn: `Barcelona, ES`,
    role: `Enginyeria Informàtica · UPC`,
  },
  es: {
    cv: `Descargar CV`,
    statement: `Estudiante de ingeniería informática de Barcelona. Construyo herramientas, extensiones de navegador y aplicaciones web con C++, Python y TypeScript.`,
    findOutMore: `Descubre más`,
    getInTouch: `Contáctame`,
    bio: `Estudiante de Ingeniería Informática en la UPC, Barcelona. Diseño y construyo herramientas en C++, Python y la web.`,
    selectedWork: `Proyectos seleccionados`,
    live: `en vivo`,
    code: `código`,
    demo: `demo`,
    theme: `Tema`,
    sound: `Sonido`,
    light: `claro`,
    dark: `oscuro`,
    about: `Sobre mí`,
    aboutText: `Soy Joel, estudiante de Ingeniería Informática en la UPC de Barcelona. Me gusta el software que hace una cosa bien: pequeñas herramientas, extensiones de navegador y aplicaciones full-stack con tests, CI y Docker debajo.`,
    contact: `Contacto`,
    basedIn: `Barcelona, ES`,
    role: `Ingeniería Informática · UPC`,
  },
}

export const projects: Project[] = [
  {
    name: `Pulso Ciudadano`,
    repo: `pulso-ciudadano`,
    year: `2026`,
    desc: {
      en: `Live electoral opinion poll where visitors vote for a candidate and see updated results.`,
      ca: `Sondeig d'opinió electoral en directe on els visitants voten una candidatura i veuen els resultats actualitzats.`,
      es: `Sondeo de opinión electoral en directo donde los visitantes votan una candidatura y ven los resultados actualizados.`,
    },
    tags: [`React`, `TypeScript`, `Vercel`],
    demo: `https://pulso-ciudadano-green.vercel.app`,
  },
  {
    name: `Task Tracker`,
    repo: `Task-Tracker`,
    year: `2026`,
    desc: {
      en: `Full-stack task manager: C++ REST API and React + Vite frontend. Docker, CI and deployed on Render.`,
      ca: `Gestor de tasques full-stack: API REST en C++ i frontend en React + Vite. Docker, CI i desplegat a Render.`,
      es: `Gestor de tareas full-stack: API REST en C++ y frontend en React + Vite. Docker, CI y desplegado en Render.`,
    },
    tags: [`C++`, `React`, `TypeScript`, `Docker`],
    demo: `https://task-tracker-web-4uqz.onrender.com`,
  },
  {
    name: `Lingua Check`,
    repo: `lingua-check`,
    year: `2026`,
    desc: {
      en: `Chrome extension for real-time spelling and grammar checking on websites, powered by the LanguageTool API.`,
      ca: `Extensió de Chrome per revisar l'ortografia i la gramàtica en temps real als webs amb l'API de LanguageTool.`,
      es: `Extensión de Chrome para revisar ortografía y gramática en tiempo real en páginas web con la API de LanguageTool.`,
    },
    tags: [`TypeScript`, `Chrome Extension`, `LanguageTool`],
  },
  {
    name: `YouTube Remaining Time`,
    repo: `youtube-remaining-time-speed`,
    year: `2025`,
    desc: {
      en: `Chrome extension that shows a video's total duration adjusted to the playback speed.`,
      ca: `Extensió de Chrome que mostra la durada total d'un vídeo ajustada a la velocitat de reproducció.`,
      es: `Extensión de Chrome que muestra la duración total de un vídeo ajustada a la velocidad de reproducción.`,
    },
    tags: [`JavaScript`, `Chrome Extension`],
  },
  {
    name: `Task Tracker CLI`,
    repo: `Task-Tracker-CLI`,
    year: `2025`,
    desc: {
      en: `Terminal task manager with JSON persistence and GoogleTest tests.`,
      ca: `Gestor de tasques per terminal amb persistència en JSON i tests amb GoogleTest.`,
      es: `Gestor de tareas desde la terminal con persistencia en JSON y tests con GoogleTest.`,
    },
    tags: [`C++`, `GoogleTest`, `Make`],
    extra: {
      label: `release v2.2.0`,
      href: `${GITHUB}/Task-Tracker-CLI/releases/tag/v2.2.0`,
    },
  },
  {
    name: `Basic Calculator`,
    repo: `basic-calculator`,
    year: `2025`,
    desc: {
      en: `Desktop calculator built with Tkinter and a safe expression evaluator (no eval).`,
      ca: `Calculadora d'escriptori amb Tkinter i un avaluador d'expressions segur (sense eval).`,
      es: `Calculadora de escritorio con Tkinter y un evaluador seguro de expresiones (sin eval).`,
    },
    tags: [`Python`, `Tkinter`, `pytest`],
  },
  {
    name: `Number Guessing Game`,
    repo: `Number-Guessing-Game-CLI`,
    year: `2025`,
    desc: {
      en: `Terminal number guessing game with difficulty levels, hints and a high score.`,
      ca: `Joc d'endevinar números al terminal amb nivells de dificultat, pistes i rècord.`,
      es: `Juego de adivinar números en la terminal con niveles de dificultad, pistas y récord.`,
    },
    tags: [`C++`, `CLI`],
  },
]

export const stack = [`C++`, `Python`, `TypeScript`, `React`, `Vite`, `Docker`, `GitHub Actions`, `Linux`]
