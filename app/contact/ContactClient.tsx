'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Mail, MapPin, Clock, Send,
  CheckCircle, AlertCircle, Sparkles, MessageSquare,
  Handshake, HelpCircle,
} from 'lucide-react'

// ─── CONTACT REASONS ─────────────────────────────────────────────────────────

const reasons = [
  { icon: HelpCircle,    label: 'Trip Planning Help',   desc: 'Questions about your Greece itinerary' },
  { icon: Handshake,     label: 'Partnership / B2B',    desc: 'Tour operators, hotels, travel brands' },
  { icon: MessageSquare, label: 'Media & Press',        desc: 'Interviews, features, collaborations' },
  { icon: Sparkles,      label: 'Something Else',       desc: 'We read every message' },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ContactClient() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xpwzwpkj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF6F3]">

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 bg-[#180204] overflow-hidden">
        {/* Background texture dots */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FAF6F3 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5635]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <Mail className="w-3.5 h-3.5 text-[#FF5635]" />
              <span className="text-white/70 text-sm font-sans font-medium">Get in Touch</span>
            </div>
            <h1 className="text-5xl sm:text-6xl text-white mb-5 leading-tight">
              Let&apos;s Talk<br />
              <span className="text-[#FF5635]">Greece.</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed font-sans max-w-lg">
              Whether you&apos;re planning a trip, exploring a partnership, or just curious about Greek tourism — Panos reads every message personally.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ── LEFT PANEL ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Person card */}
              <div className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF5635]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#FF5635] font-sans">P</span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#180204] font-sans">Panos</div>
                    <div className="text-sm text-[#180204]/45 font-sans">Founder, Greek Trip Planner</div>
                  </div>
                </div>
                <p className="text-[#180204]/60 text-sm leading-relaxed font-sans mb-6">
                  Born and raised in Greece, I built this platform to share genuine local knowledge — not the generic advice you find everywhere else. I personally reply to every message.
                </p>
                <a
                  href="mailto:panos@greektriplanner.me"
                  className="group flex items-center gap-3 text-sm font-semibold text-[#180204] hover:text-[#FF5635] transition-colors font-sans"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FF5635]/10 flex items-center justify-center group-hover:bg-[#FF5635] transition-colors">
                    <Mail className="w-4 h-4 text-[#FF5635] group-hover:text-white transition-colors" />
                  </div>
                  panos@greektriplanner.me
                </a>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60 space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#180204]/35 font-sans">Details</h3>
                {[
                  { icon: MapPin, label: 'Based in',      value: 'Athens, Greece' },
                  { icon: Clock,  label: 'Response time', value: 'Usually within 24 hours' },
                  { icon: Mail,   label: 'Email',         value: 'panos@greektriplanner.me', href: 'mailto:panos@greektriplanner.me' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F3] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-[#180204]/40" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#180204]/30 font-sans">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#180204]/70 hover:text-[#FF5635] transition-colors font-sans">{item.value}</a>
                      ) : (
                        <div className="text-sm text-[#180204]/70 font-sans">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reason pills */}
              <div className="bg-white rounded-3xl p-8 border border-[#E6DAD1]/60">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#180204]/35 font-sans mb-5">What can I help with?</h3>
                <div className="space-y-3">
                  {reasons.map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF5635]/8 flex items-center justify-center flex-shrink-0">
                        <r.icon className="w-4 h-4 text-[#FF5635]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#180204] font-sans leading-tight">{r.label}</div>
                        <div className="text-xs text-[#180204]/40 font-sans">{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT PANEL — FORM ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E6DAD1]/60">

                {status === 'success' ? (
                  /* Success state */
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl text-[#180204] mb-3">Message sent!</h3>
                    <p className="text-[#180204]/55 font-sans max-w-sm mb-8">
                      Thanks for reaching out. Panos will reply to <strong className="text-[#180204]">{form.email || 'your email'}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm font-semibold text-[#FF5635] hover:underline font-sans"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl text-[#180204] mb-2">Send a message</h2>
                      <p className="text-[#180204]/50 font-sans text-sm">All fields required. No spam, ever.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                      {/* Name + Email row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#180204]/40 font-sans mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Maria"
                            className="w-full px-4 py-3.5 rounded-xl border border-[#E6DAD1] bg-[#FAF6F3] text-[#180204] placeholder-[#180204]/25 font-sans text-sm focus:outline-none focus:border-[#FF5635] focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-[#180204]/40 font-sans mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3.5 rounded-xl border border-[#E6DAD1] bg-[#FAF6F3] text-[#180204] placeholder-[#180204]/25 font-sans text-sm focus:outline-none focus:border-[#FF5635] focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#180204]/40 font-sans mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E6DAD1] bg-[#FAF6F3] text-[#180204] font-sans text-sm focus:outline-none focus:border-[#FF5635] focus:bg-white transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select a topic…</option>
                          <option value="Trip Planning Help">Trip Planning Help</option>
                          <option value="Partnership / B2B">Partnership / B2B</option>
                          <option value="Media & Press">Media & Press</option>
                          <option value="Something Else">Something Else</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#180204]/40 font-sans mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder="Tell Panos what's on your mind…"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E6DAD1] bg-[#FAF6F3] text-[#180204] placeholder-[#180204]/25 font-sans text-sm focus:outline-none focus:border-[#FF5635] focus:bg-white transition-colors resize-none"
                        />
                      </div>

                      {/* Error state */}
                      {status === 'error' && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <p className="text-sm text-red-600 font-sans">
                            Something went wrong. Try emailing{' '}
                            <a href="mailto:panos@greektriplanner.me" className="underline font-semibold">
                              panos@greektriplanner.me
                            </a>{' '}
                            directly.
                          </p>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full btn-accent py-4 rounded-xl font-semibold font-sans flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                      >
                        {status === 'sending' ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-[#180204]/30 font-sans">
                        Or email directly:{' '}
                        <a href="mailto:panos@greektriplanner.me" className="text-[#180204]/50 hover:text-[#FF5635] transition-colors">
                          panos@greektriplanner.me
                        </a>
                      </p>

                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#180204] py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <Image src="/logo.png" alt="Greek Trip Planner" width={70} height={21} className="brightness-0 invert mb-6" />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/how-it-works"     className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">How it Works</Link>
              <Link href="/destinations"     className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Destinations</Link>
              <Link href="/blog"             className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Blog</Link>
              <Link href="/insights"         className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Insights</Link>
              <Link href="/about"            className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">About</Link>
              <Link href="/contact"          className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Contact</Link>
              <Link href="/editorial-policy" className="text-white/60 hover:text-[#FF5635] transition-colors text-sm font-sans">Editorial Policy</Link>
            </div>
            <div className="border-t border-white/10 w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm font-sans">&copy; 2026 Greek Trip Planner. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  )
}
