// components/AuthorBox.tsx
// Editorial authorship model: Panos writes, 5-expert Greek team informs.
// Strong EEAT signals: real people, real specialties, cross-references /about page.

import Link from 'next/link'

const TEAM = [
  { emoji: '🧑‍💻', name: 'Panos',      expertise: 'Athens & Saronic' },
  { emoji: '🏛️',  name: 'Vaggelis',   expertise: 'Peloponnese' },
  { emoji: '🚐',  name: 'Panagiotis', expertise: 'Athens · Mykonos · Santorini' },
  { emoji: '🏨',  name: 'Kostas',     expertise: 'Crete' },
  { emoji: '⛰️',  name: 'Tasos',      expertise: 'Northern Greece' },
]

export default function AuthorBox() {
  return (
    <div className="border-t border-[#E6DAD1] mt-12 pt-8 space-y-6">

      {/* Primary author */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#180204]/40 mb-4 font-sans">
          Written by
        </p>

        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF5635]/10 border-2 border-[#FF5635]/20 flex items-center justify-center text-xl select-none">
            🧑‍💻
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-[#180204] font-semibold text-base font-sans">Panos</span>
              <span className="inline-flex items-center bg-[#FF5635]/10 text-[#FF5635] text-xs font-semibold px-2.5 py-0.5 rounded-full font-sans">
                🇬🇷 Founder · Greek Trip Planner
              </span>
            </div>

            <p className="text-xs text-[#180204]/50 font-sans mb-2">
              Athens-born engineer · Coordinates a 5-expert Greek team · 50+ years combined field experience
            </p>

            <p className="text-sm text-[#180204]/65 leading-relaxed font-sans">
              I write every article on this site drawing on real, first-hand expertise — mine and that
              of four colleagues who live and work across Greece daily: a Peloponnese tour operator, a
              transfer specialist across Athens, Mykonos &amp; Santorini, a Cretan hotel owner, and a
              Northern Greece hotel supplier. Nothing here comes from a single visit or desk research.
            </p>
          </div>
        </div>
      </div>

      {/* Team expertise strip */}
      <div className="bg-[#FAF6F3] rounded-2xl border border-[#E6DAD1]/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#180204]/40 mb-3 font-sans">
          Informed by 5 Greek experts
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center gap-1 px-2 py-2.5 bg-white rounded-xl border border-[#E6DAD1]/60"
            >
              <span className="text-lg leading-none">{member.emoji}</span>
              <span className="text-[#180204] font-semibold text-xs font-sans leading-tight">
                {member.name}
              </span>
              <span className="text-[#FF5635] text-[10px] font-semibold font-sans leading-tight">
                {member.expertise}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#180204]/45 font-sans mt-3 leading-relaxed">
          Every destination we cover has been visited and vetted by at least one team member — not for
          a review, but as part of their daily work in Greek tourism.
        </p>
      </div>

      {/* Link to about */}
      <Link
        href="/about"
        className="text-xs font-semibold text-[#FF5635] hover:text-[#FF5635]/80 transition-colors font-sans"
      >
        Meet the full team →
      </Link>

    </div>
  )
}
