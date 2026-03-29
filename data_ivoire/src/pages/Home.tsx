import { useState, useRef, useEffect } from 'react'
import {
  Search, FileText, Download, Users, Award,
  Grid, Navigation, TrendingUp, CreditCard,
  GraduationCap, Globe, ChevronRight, ArrowRight, Linkedin,
} from 'lucide-react'
import { BentoCard } from '../components/ui/BentoCard'
import { Badge } from '../components/ui/Badge'
import { SectionHeader } from '../components/ui/SectionHeader'
import { categories } from '../data/categories'
import { datasets } from '../data/datasets'
import { news } from '../data/news'
import { team } from '../data/team'
import { orgs } from '../data/orgs'
import type { AccentColor } from '../types'

// ── helpers ──────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); io.unobserve(el) } },
      { threshold: 0.06 }
    )
    io.observe(el)
    // If already visible on mount (e.g. hero section), trigger immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) el.classList.add('visible')
    return () => io.disconnect()
  }, [])
  return ref
}

const catIconMap: Record<string, JSX.Element> = {
  grid:        <Grid size={18} />,
  map:         <Navigation size={18} />,
  trending:    <TrendingUp size={18} />,
  users:       <Users size={18} />,
  vote:        <FileText size={18} />,
  creditcard:  <CreditCard size={18} />,
  graduation:  <GraduationCap size={18} />,
  society:     <Users size={18} />,
  demography:  <Users size={18} />,
}

const accentBg: Record<AccentColor, string> = {
  orange: 'bg-[#FFF3ED]',
  green:  'bg-[#ECFDF5]',
  blue:   'bg-[#EFF6FF]',
  teal:   'bg-[#ECFEFF]',
}
const accentText: Record<AccentColor, string> = {
  orange: 'text-[#EA5800]',
  green:  'text-[#059669]',
  blue:   'text-[#2563EB]',
  teal:   'text-[#0891B2]',
}
const accentBorder: Record<AccentColor, string> = {
  orange: 'hover:border-[#EA5800]/30',
  green:  'hover:border-[#059669]/30',
  blue:   'hover:border-[#2563EB]/30',
  teal:   'hover:border-[#0891B2]/30',
}
const accentBar: Record<AccentColor, string> = {
  orange: 'bg-[#EA5800]',
  green:  'bg-[#059669]',
  blue:   'bg-[#2563EB]',
  teal:   'bg-[#0891B2]',
}
const pillColor: Record<AccentColor, string> = {
  orange: 'bg-[#FFF3ED] text-[#EA5800]',
  green:  'bg-[#ECFDF5] text-[#059669]',
  blue:   'bg-[#EFF6FF] text-[#2563EB]',
  teal:   'bg-[#ECFEFF] text-[#0891B2]',
}
const avatarColor: Record<AccentColor, string> = {
  orange: 'bg-[#FFF3ED] text-[#EA5800]',
  green:  'bg-[#ECFDF5] text-[#059669]',
  blue:   'bg-[#EFF6FF] text-[#2563EB]',
  teal:   'bg-[#ECFEFF] text-[#0891B2]',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Home() {
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState('')

  const filtered = datasets.filter(
    d =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.org.toLowerCase().includes(query.toLowerCase()) ||
      d.category.toLowerCase().includes(query.toLowerCase())
  )

  // section refs for reveal
  const heroRef    = useReveal()
  const catRef     = useReveal()
  const dsRef      = useReveal()
  const newsRef    = useReveal()
  const teamRef    = useReveal()
  const orgsRef    = useReveal()
  const ctaRef     = useReveal()

  return (
    <>
      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section id="hero" className="bg-white border-b border-[#E8E8E8] pt-20 pb-24">
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={heroRef} className="fade-up grid grid-cols-[1fr_420px] gap-18 items-center" style={{ gap: '72px' }}>

            {/* Left */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#EA5800] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA5800] pulse-dot" />
                Plateforme citoyenne d'opendata
              </div>

              <h1 className="font-serif font-black text-[clamp(44px,5vw,74px)] leading-[1.02] tracking-[-0.02em] mb-5">
                La Côte d'Ivoire<br />
                en <em className="italic text-[#EA5800]">données.</em>
              </h1>

              <p className="text-[16px] leading-[1.72] text-[#666] max-w-[500px] mb-9">
                Retrouvez des indicateurs sur chaque ville, département, région ou district.
                Des données ouvertes, gratuites et réutilisables pour tous.
              </p>

              {/* Search */}
              <div className="flex items-center border-[1.5px] border-[#E8E8E8] rounded-md bg-white overflow-hidden shadow-sm focus-within:border-[#EA5800] focus-within:shadow-[0_0_0_3px_rgba(234,88,0,0.09)] transition-all">
                <Search size={15} className="ml-3.5 text-[#AAA] flex-shrink-0" />
                <input
                  type="text"
                  className="flex-1 py-3.5 px-3 text-[14px] text-[#0A0A0A] outline-none bg-transparent placeholder:text-[#C0C0C0]"
                  placeholder="Rechercher un dataset… ex : population Abidjan, budget 2026"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <button className="m-1.5 px-5 py-2.5 bg-[#EA5800] text-white text-[13px] font-semibold rounded flex-shrink-0 hover:bg-[#FF7A2F] transition-colors">
                  Rechercher
                </button>
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 items-center">
                <span className="text-[11px] text-[#AAA] font-medium">Populaires :</span>
                {['Démographie 2021', 'Finances publiques', 'Élections 2023', 'PIB régional'].map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="text-[11px] text-[#666] border border-[#E8E8E8] rounded-full px-2.5 py-0.5 hover:border-[#EA5800] hover:text-[#EA5800] transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — bento grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <BentoCard value="22"    label="Jeux de données"   color="orange" icon={<FileText size={36} color="white" />} />
              <BentoCard value="1.4k+" label="Téléchargements"   color="green"  icon={<Download size={36} color="white" />} />
              <BentoCard value="39"    label="Utilisateurs actifs" color="blue" icon={<Users size={36} color="white" />} />
              <BentoCard value="14"    label="Partenaires"        color="teal"  icon={<Award size={36} color="white" />} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ════════════════════════════════════════════════════ */}
      <section id="categories" className="py-22 bg-[#F7F7F7]" style={{ padding: '88px 0' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={catRef} className="fade-up">
            <SectionHeader
              label="Catalogue"
              title="Explorez nos catégories"
              subtitle="Des données structurées par domaine pour faciliter vos recherches"
              seeAll={{ label: 'Explorer toutes les données →', href: '#' }}
            />
            <div className="grid grid-cols-3 gap-3.5">
              {categories.map(cat => (
                <a
                  key={cat.id}
                  href="#"
                  className={`
                    group relative bg-white border border-[#E8E8E8] rounded-xl p-5
                    flex items-center gap-3.5 overflow-hidden no-underline text-inherit
                    transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]
                    ${accentBorder[cat.color]}
                  `}
                >
                  {/* colored left bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity ${accentBar[cat.color]}`} />

                  <div className={`w-[42px] h-[42px] rounded-[10px] flex items-center justify-center flex-shrink-0 ${accentBg[cat.color]} ${accentText[cat.color]}`}>
                    {catIconMap[cat.icon]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px] text-[#0A0A0A] mb-0.5">{cat.name}</div>
                    <div className="font-mono text-[10px] text-[#666]">
                      {String(cat.count).padStart(2, '0')} dataset{cat.count !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <ChevronRight
                    size={14}
                    className={`flex-shrink-0 text-[#AAA] group-hover:translate-x-0.5 transition-all ${accentText[cat.color]} opacity-0 group-hover:opacity-100`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DATASETS ══════════════════════════════════════════════════════ */}
      <section id="datasets" className="bg-white border-t border-[#E8E8E8]" style={{ padding: '88px 0' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={dsRef} className="fade-up">
            <SectionHeader
              label="Catalogue de données"
              title="Tous les jeux de données"
              subtitle={`${filtered.length} dataset${filtered.length !== 1 ? 's' : ''} ouverts, gratuits et réutilisables`}
            />

            {/* Search bar */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex-1 flex items-center gap-2.5 border border-[#E8E8E8] rounded-md px-3.5 h-10 bg-[#F7F7F7] focus-within:border-[#EA5800] transition-colors">
                <Search size={13} className="text-[#AAA] flex-shrink-0" />
                <input
                  type="text"
                  className="flex-1 text-[13px] bg-transparent outline-none text-[#0A0A0A] placeholder:text-[#AAA]"
                  placeholder="Rechercher dans les jeux de données…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <span className="font-mono text-[11px] text-[#AAA] flex-shrink-0">
                {filtered.length} dataset{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E8E8E8]">
                  {['#', 'Titre', 'Catégorie', 'Vues', 'Téléch.', ''].map((h, i) => (
                    <th
                      key={i}
                      className={`
                        py-2.5 px-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#AAA] text-left
                        ${i === 0 ? 'pl-0 w-7' : ''}
                        ${i >= 3 && i <= 4 ? 'text-right' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((ds, i) => (
                  <tr
                    key={ds.id}
                    className="group border-b border-[#E8E8E8] last:border-none hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 pl-0 pr-3.5 font-mono text-[10px] text-[#AAA]">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div className="font-semibold text-[13px] text-[#0A0A0A]">{ds.title}</div>
                      <div className="text-[11px] text-[#666] mt-0.5">{ds.org}</div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <Badge label={ds.category} color={ds.categoryColor} />
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-[12px] text-[#0A0A0A] font-semibold text-right">{ds.views}</td>
                    <td className="py-3.5 px-3.5 font-mono text-[12px] text-[#0A0A0A] font-semibold text-right">{ds.downloads}</td>
                    <td className="py-3.5 px-3.5">
                      <span className="text-[12px] font-semibold text-[#EA5800] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 justify-end whitespace-nowrap">
                        Voir <ArrowRight size={12} />
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[14px] text-[#AAA]">
                      Aucun résultat pour « {query} »
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ NEWS ══════════════════════════════════════════════════════════ */}
      <section id="news" className="border-t border-[#E8E8E8]" style={{ padding: '88px 0', background: '#F7F7F7' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={newsRef} className="fade-up">
            <SectionHeader
              label="Actualités"
              title="Dernières mises à jour"
              subtitle="Restez informé des nouvelles données et annonces de la plateforme"
            />
            <div className="grid grid-cols-3 gap-[18px]">
              {news.map(item => (
                <a
                  key={item.id}
                  href="#"
                  className="bg-white border border-[#E8E8E8] rounded-xl p-6 flex flex-col gap-2.5 no-underline text-inherit hover:-translate-y-[3px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${pillColor[item.tagColor]}`}>
                      {item.tag}
                    </span>
                    <span className="font-mono text-[10px] text-[#AAA]">{item.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-[15px] leading-[1.3] text-[#0A0A0A]">{item.title}</h3>
                  <p className="text-[12px] leading-[1.65] text-[#666] flex-1">{item.excerpt}</p>
                  <span className="text-[11px] font-bold text-[#EA5800] flex items-center gap-1 mt-1">
                    Lire la suite <ArrowRight size={11} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ══════════════════════════════════════════════════════════ */}
      <section id="team" className="bg-white border-t border-[#E8E8E8]" style={{ padding: '88px 0' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={teamRef} className="fade-up">
            <SectionHeader
              label="Communauté"
              title="Notre équipe"
              subtitle="Des bénévoles passionnés par la transparence et l'accessibilité des données publiques ivoiriennes"
              seeAll={{ label: 'Rejoindre l\'équipe →', href: 'mailto:infos@dataivoire.ci' }}
            />
            <div className="grid grid-cols-4 gap-[18px]">
              {team.map(member => (
                <a
                  key={member.id}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#E8E8E8] rounded-xl p-7 text-center flex flex-col items-center gap-2.5 no-underline text-inherit hover:-translate-y-[3px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-all"
                >
                  <div className={`w-[68px] h-[68px] rounded-full flex items-center justify-center font-serif font-black text-[20px] ${avatarColor[member.color]}`}>
                    {member.initials}
                  </div>
                  <div className="font-bold text-[13px] text-[#0A0A0A]">{member.name}</div>
                  <div className="text-[11px] text-[#666] leading-[1.45] text-center">{member.role}</div>
                  <span className="text-[11px] font-semibold text-[#2563EB] flex items-center gap-1 mt-1">
                    <Linkedin size={11} /> LinkedIn
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ORGS ══════════════════════════════════════════════════════════ */}
      <section id="orgs" className="bg-[#F7F7F7] border-t border-[#E8E8E8]" style={{ padding: '52px 0' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={orgsRef} className="fade-up">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#AAA] text-center mb-6">
              14 organisations partenaires
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {orgs.map(org => (
                <span
                  key={org.id}
                  className="text-[12px] font-medium text-[#666] bg-white border border-[#E8E8E8] rounded-full px-4 py-1.5 whitespace-nowrap hover:border-[#EA5800] hover:text-[#EA5800] transition-all cursor-default"
                >
                  {org.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════════ */}
      <section id="cta" className="bg-[#0A0A0A] text-center" style={{ padding: '96px 0' }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div ref={ctaRef} className="fade-up">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#EA5800] mb-3.5">
              Restez informé
            </p>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,50px)] leading-[1.05] tracking-[-0.02em] text-white mb-3">
              Les données ivoiriennes,<br />dans votre boîte.
            </h2>
            <p className="text-[15px] text-white/50 mb-9 max-w-[440px] mx-auto">
              Recevez les dernières mises à jour de données, analyses et nouveautés directement dans votre boîte mail.
            </p>
            <div className="flex gap-2 max-w-[420px] mx-auto">
              <input
                type="email"
                className="flex-1 px-4 py-3 bg-white/[0.07] border border-white/14 rounded-md text-[14px] text-white placeholder:text-white/28 outline-none focus:border-[#EA5800] transition-colors"
                placeholder="votre@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="px-6 py-3 bg-[#EA5800] text-white text-[14px] font-semibold rounded-md hover:bg-[#FF7A2F] transition-colors flex-shrink-0">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
