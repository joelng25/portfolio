import { useEffect, useRef, useState } from 'react'

const RAMP = '.:-=+*!?238ON#'
const NAME = 'Joel Novio Garcia'
const triggerClass =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground ascii-name-trigger'

/** `name` renders the hoverable ASCII version of the name; otherwise the footer wave. */
export function AsciiArt({ name = false }: { name?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<SVGTextElement>(null)
  const pointer = useRef({ x: -1, y: -1 })
  const touch = useRef(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let visible = false
    let raf = 0
    let lastDraw = 0
    let disposed = false
    let mask: Uint8ClampedArray | undefined

    const buildMask = () => {
      const big = document.createElement('canvas')
      big.width = 1400
      big.height = 180
      const b = big.getContext('2d')
      if (!b) return
      const text = textRef.current
      b.font = text ? getComputedStyle(text).font : '800 148px "Helvetica Neue", Helvetica, Arial, sans-serif'
      const width = Math.max(b.measureText(NAME).width, text?.getBBox().width ?? 0)
      const scale = Math.min(1, 1368 / Math.max(1, width))
      text?.setAttribute('transform', `translate(16 140) scale(${scale}) translate(-16 -140)`)
      b.translate(16, 140)
      b.scale(scale, scale)
      b.fillText(NAME, 0, 0)
      const small = document.createElement('canvas')
      small.width = 200
      small.height = 32
      const s = small.getContext('2d')
      if (s) {
        s.drawImage(big, 0, 0, 200, 32)
        mask = s.getImageData(0, 0, 200, 32).data
      }
    }

    const draw = (time: number) => {
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = getComputedStyle(wrap).color
      const cols = name ? 200 : Math.max(45, Math.floor(w / 8))
      const rows = name ? 32 : Math.floor(h / 10)
      const cw = w / cols
      const ch = h / rows
      ctx.font = `${name ? cw * 1.55 : 10}px ui-monospace, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const t = reduced.matches ? 0 : time / 1800
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let v = 0
          let dy = 0
          if (name) {
            v = (mask?.[(y * 200 + x) * 4 + 3] ?? 0) / 255
            if (v < 0.18) continue
            const dist = Math.hypot(x / 200 - pointer.current.x, (y / 32 - pointer.current.y) * 0.3)
            dy = reduced.matches ? 0 : Math.sin(x * 0.18 + t * 3) * Math.max(0, 1 - dist * 5) * ch * 0.8
          } else {
            const nx = x / cols
            const ny = y / rows
            const center = 0.5 + Math.sin(nx * 11 + t) * 0.23
            const d = Math.abs(ny - center)
            v = Math.max(0, 1 - d * 4.5) * (0.55 + Math.sin(nx * 19 - t * 1.4) * 0.4)
            if (v < 0.1) continue
          }
          const jitter = Math.sin(x * 0.7 + y * 0.5 + t * 2) * 0.2
          const idx = Math.max(0, Math.min(13, Math.floor((v * 0.7 + jitter + 0.1) * 13)))
          ctx.fillText(RAMP[idx] ?? '.', (x + 0.5) * cw, (y + 0.5) * ch + dy)
        }
      }
    }

    const loop = (time: number) => {
      if (visible && !document.hidden && (!name || active) && time - lastDraw > 65) {
        draw(time)
        lastDraw = time
      }
      raf = requestAnimationFrame(loop)
    }

    const resize = new ResizeObserver(() => {
      const r = wrap.getBoundingClientRect()
      w = r.width
      h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(0)
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
    })
    resize.observe(wrap)
    io.observe(wrap)
    buildMask()
    void document.fonts.ready.then(() => {
      if (!disposed) {
        buildMask()
        draw(0)
      }
    })
    draw(0)
    raf = requestAnimationFrame(loop)
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      resize.disconnect()
      io.disconnect()
    }
  }, [active, name])

  const inner = (
    <>
      {name && (
        <svg aria-hidden="true" viewBox="0 0 1400 180" className="ascii-name-original">
          <text ref={textRef} x="16" y="140">
            {NAME}
          </text>
        </svg>
      )}
      <canvas ref={canvasRef} aria-hidden="true" className="ascii-canvas" />
    </>
  )

  return (
    <div
      ref={wrapRef}
      className={name ? 'ascii-name' : 'ascii-wave text-muted-foreground'}
      data-active={active}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        pointer.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }
      }}
    >
      {name ? (
        <button
          type="button"
          className={triggerClass}
          aria-label={NAME}
          aria-pressed={active}
          onPointerDown={(e) => {
            touch.current = e.pointerType === 'touch'
          }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(false)}
          onFocus={() => {
            if (!touch.current) setActive(true)
          }}
          onBlur={() => setActive(false)}
          onClick={(e) => {
            if (e.detail === 0 || !window.matchMedia('(hover: hover)').matches) setActive((v) => !v)
          }}
        >
          {inner}
        </button>
      ) : (
        inner
      )}
    </div>
  )
}
