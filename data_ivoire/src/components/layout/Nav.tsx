import { BarChart2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Accueil',         href: '#hero' },
  { label: 'Données',         href: '#datasets' },
  { label: 'Visualisation',   href: '#' },
  { label: 'Qui sommes-nous', href: '#team' },
]

export function Nav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'categories', 'datasets', 'news', 'team']
    const onScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 80) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A] border-b border-[#1E1E1E]">
      <div className="max-w-[1280px] mx-auto px-12 h-full flex items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 mr-12 flex-shrink-0 text-decoration-none">
          <div className="w-[30px] h-[30px] bg-[#EA5800] rounded-[7px] flex items-center justify-center">
            <BarChart2 size={15} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] text-white tracking-[-0.01em]">dataivoire</span>
        </a>

        {/* Links */}
        <ul className="flex gap-0 list-none flex-1">
          {links.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`
                    text-[13px] font-medium px-[18px] h-16 flex items-center
                    border-b-2 transition-colors
                    ${isActive
                      ? 'text-white border-[#EA5800]'
                      : 'text-white/55 border-transparent hover:text-white'}
                  `}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="#"
            className="text-[13px] font-semibold text-white/70 border border-white/[0.18] rounded-md px-[18px] py-2 hover:text-white hover:border-white/50 transition-all"
          >
            Se connecter
          </a>
          <a
            href="#"
            className="text-[13px] font-semibold text-white bg-[#EA5800] rounded-md px-[18px] py-2 hover:bg-[#FF7A2F] transition-colors"
          >
            + Publier
          </a>
        </div>
      </div>
    </nav>
  )
}
