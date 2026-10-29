import { useEffect, useState } from 'react'
import { AsciiArt } from './components/AsciiArt'
import { Contact } from './components/Contact'
import { ArrowUpRight, Download, Github, Linkedin, Moon, Sun, Volume2, VolumeX } from './components/icons'
import { ScrambleText as S } from './components/ScrambleText'
import { copy, GITHUB, LANGS, LINKEDIN, projects, stack, type Lang } from './content'
import { playClick, setSoundEnabled } from './sound'

type Theme = 'dark' | 'light'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [theme, setTheme] = useState<Theme>('dark')
  const [sound, setSound] = useState(true)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored && LANGS.includes(stored)) setLang(stored)
    const t: Theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    setTheme(t)
    document.documentElement.dataset.theme = t
    const s = localStorage.getItem('sound') !== 'off'
    setSound(s)
    setSoundEnabled(s)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('button, a')
      if (el) playClick(el.tagName === 'A' ? 'link' : 'tap')
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const chooseLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('lang', l)
  }
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.dataset.theme = next
  }
  const toggleSound = () => {
    const next = !sound
    setSound(next)
    setSoundEnabled(next)
    localStorage.setItem('sound', next ? 'on' : 'off')
  }

  const d = copy[lang]

  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs uppercase tracking-widest">
        <span>Joel Novio Garcia</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={`${d.theme}: ${theme === 'dark' ? d.light : d.dark}`}
              className="p-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={d.sound}
              className="p-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => chooseLang(l)}
                aria-pressed={lang === l}
                className={`px-1.5 py-1 uppercase ${lang === l ? 'text-primary underline underline-offset-4' : 'text-muted-foreground hover:text-primary'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <Github className="h-4 w-4" />{' '}
            <span className="hidden sm:inline">
              <S>GitHub</S>
            </span>
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary">
            <Linkedin className="h-4 w-4" />{' '}
            <span className="hidden sm:inline">
              <S>LinkedIn</S>
            </span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="flex min-h-[88vh] flex-col justify-between gap-16 border-b border-border py-10 md:py-14">
          <p className="max-w-4xl font-sans text-3xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {d.statement}
          </p>
          <div className="grid gap-10 text-xs uppercase tracking-widest md:grid-cols-3">
            <span className="text-muted-foreground">{d.findOutMore}</span>
            <ul className="space-y-1.5">
              {projects.slice(0, 6).map((p) => (
                <li key={p.repo}>
                  <a href={`${GITHUB}/${p.repo}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
                    <S>{p.name}</S>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-5">
              <span className="max-w-xs normal-case tracking-normal text-muted-foreground">
                {d.role} — {d.basedIn}
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <S>{d.getInTouch}</S> <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`/cv/CV_Joel_Novio_${lang}.pdf`}
                download={`CV_Joel_Novio_${lang}.pdf`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Download className="h-4 w-4" /> <S>{d.cv}</S>
              </a>
            </div>
          </div>
          <h1 aria-label="Joel Novio Garcia" className="w-full">
            <AsciiArt name />
          </h1>
        </section>

        <section className="py-16 md:py-24">
          <div className="mb-10 flex items-baseline justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <h2>{d.selectedWork}</h2>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
          <div>
            {projects.map((p, i) => (
              <article
                key={p.repo}
                className="group border-t border-border py-10 transition-colors last:border-b hover:bg-card md:py-12"
              >
                <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                  <div className="text-xs text-muted-foreground md:col-span-2">
                    J{String(i + 1).padStart(3, '0')}
                    <span className="mt-1 block">{p.year}</span>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-sans text-3xl leading-tight transition-colors group-hover:text-primary md:text-4xl">
                      <S>{p.name}</S>
                      {p.demo && (
                        <span className="ml-3 align-middle font-sans text-xs uppercase tracking-widest text-primary">
                          [{d.live}]
                        </span>
                      )}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{p.desc[lang]}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-6 md:col-span-4">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-5 text-xs uppercase tracking-widest">
                      <a href={`${GITHUB}/${p.repo}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                        <S>{d.code}</S> <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          <S>{d.demo}</S> <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.extra && (
                        <a href={p.extra.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                          <S>{p.extra.label}</S> <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-border py-16 md:grid-cols-12 md:py-24">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-2">{d.about}</h2>
          <div className="md:col-span-10">
            <p className="max-w-2xl text-base leading-relaxed md:text-lg">{d.aboutText}</p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-muted-foreground">
              {stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        <div id="contact" className="scroll-mt-8">
          <Contact lang={lang} />
        </div>
      </main>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 text-xs uppercase tracking-widest text-muted-foreground md:grid-cols-3">
          <div>
            <span className="block">BCN</span>
            <span className="mt-1 block tabular-nums">
              {now ? `${now.toLocaleDateString(lang, { weekday: 'long' })} ${now.toLocaleTimeString(lang, { hour12: false })}` : '—'}
            </span>
          </div>
          <div>
            <span className="block">GitHub</span>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="mt-1 block transition-colors hover:text-primary">
              github.com/joelng25
            </a>
          </div>
          <div>
            <span className="block">LinkedIn</span>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="mt-1 block transition-colors hover:text-primary">
              linkedin.com/in/joel-novio
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Joel Novio Garcia</p>
        <AsciiArt />
      </footer>
    </div>
  )
}
