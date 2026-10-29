let ctx: AudioContext | null = null
let enabled = true

export function setSoundEnabled(on: boolean) {
  enabled = on
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  ctx ||= new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export function playClick(kind: 'tap' | 'link' | 'toggle' = 'tap') {
  if (!enabled) return
  const c = getContext()
  if (!c) return
  const now = c.currentTime
  const freq = kind === 'toggle' ? 660 : kind === 'link' ? 520 : 880
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, now)
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.07)
  gain.gain.setValueAtTime(1e-4, now)
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.008)
  gain.gain.exponentialRampToValueAtTime(1e-4, now + 0.12)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(now)
  osc.stop(now + 0.14)
}
