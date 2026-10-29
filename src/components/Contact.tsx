import { useState, type FormEvent } from 'react'
import type { Lang } from '../content'

const CONTACT_EMAIL = 'joelnogao625@gmail.com'

const labels: Record<Lang, Record<'title' | 'name' | 'email' | 'msg' | 'send' | 'sending' | 'ok' | 'err', string>> = {
  en: {
    title: 'contact/',
    name: 'Name',
    email: 'Email',
    msg: 'Message',
    send: 'Send',
    sending: 'Sending…',
    ok: "Thanks! I'll get back to you soon.",
    err: "Couldn't send it. Try again.",
  },
  ca: {
    title: 'contacte/',
    name: 'Nom',
    email: 'Correu',
    msg: 'Missatge',
    send: 'Envia',
    sending: 'Enviant…',
    ok: 'Gràcies! Et respondré aviat.',
    err: "No s'ha pogut enviar. Torna-ho a provar.",
  },
  es: {
    title: 'contacto/',
    name: 'Nombre',
    email: 'Correo',
    msg: 'Mensaje',
    send: 'Enviar',
    sending: 'Enviando…',
    ok: '¡Gracias! Te responderé pronto.',
    err: 'No se pudo enviar. Inténtalo de nuevo.',
  },
}

const field = 'w-full rounded-sm border border-border bg-card px-3 py-2 text-foreground outline-none focus:border-primary'

/**
 * Same form as the original site. The site is static on Vercel (no backend),
 * so submitting opens the visitor's mail client with the message prefilled.
 */
export function Contact({ lang }: { lang: Lang }) {
  const t = labels[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name')).trim().slice(0, 100)
    const email = String(data.get('email')).trim().slice(0, 255)
    const message = String(data.get('message')).trim().slice(0, 2000)
    setStatus('sending')
    try {
      const subject = encodeURIComponent(`Portfolio — ${name}`)
      const body = encodeURIComponent(`${message}\n\n${name} <${email}>`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    } catch {
      setStatus('err')
      return
    }
    form.reset()
    setStatus('ok')
  }

  return (
    <section className="pt-20 pb-28" id="contact">
      <h2 className="mb-8 font-sans text-sm text-accent">$ cat {t.title}</h2>
      <form onSubmit={onSubmit} className="grid max-w-xl gap-4">
        <input name="name" required maxLength={100} placeholder={t.name} aria-label={t.name} className={field} />
        <input name="email" type="email" required maxLength={255} placeholder={t.email} aria-label={t.email} className={field} />
        <textarea name="message" required maxLength={2000} rows={5} placeholder={t.msg} aria-label={t.msg} className={field} />
        <button
          disabled={status === 'sending'}
          className="w-fit rounded-sm bg-[oklch(52%_0.19_25)] px-5 py-2 font-sans text-sm text-primary-foreground disabled:opacity-60"
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
        {status === 'ok' && <p className="font-sans text-sm text-primary">{t.ok}</p>}
        {status === 'err' && <p className="font-sans text-sm text-destructive">{t.err}</p>}
      </form>
    </section>
  )
}
