import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%&*+/<>'

export function ScrambleText({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(children)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = (el.closest('a, button, h3') as HTMLElement | null) ?? el
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      setShown(children)
    }
    const start = () => {
      reset()
      if (reduced.matches) return
      const t0 = performance.now()
      last = 0
      const step = (now: number) => {
        const progress = Math.max(0, (now - t0 - 120) / 520)
        if (progress >= 1 || document.hidden) {
          reset()
          return
        }
        if (now - last > 40) {
          setShown(
            Array.from(children, (ch, i) =>
              /\s/.test(ch) || i < progress * children.length
                ? ch
                : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? ch),
            ).join(''),
          )
          last = now
        }
        frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    target.addEventListener('pointerenter', start)
    target.addEventListener('focusin', start)
    target.addEventListener('pointerleave', reset)
    target.addEventListener('focusout', reset)
    reduced.addEventListener('change', reset)
    setShown(children)
    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('pointerenter', start)
      target.removeEventListener('focusin', start)
      target.removeEventListener('pointerleave', reset)
      target.removeEventListener('focusout', reset)
      reduced.removeEventListener('change', reset)
    }
  }, [children])

  const glyphs = Array.from(shown)
  return (
    <span ref={ref} className="scramble-text" aria-label={children}>
      {Array.from(children, (ch, i) => (
        <span key={i} className="scramble-character" aria-hidden="true">
          <span className="scramble-original">{ch}</span>
          <span className="scramble-glyph">{glyphs[i] ?? ch}</span>
        </span>
      ))}
    </span>
  )
}
