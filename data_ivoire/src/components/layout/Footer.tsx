import { BarChart2, MapPin, Mail, Phone, Facebook, Linkedin } from 'lucide-react'

const navLinks = ['Données', 'Visualisation', 'Projets', 'Qui sommes-nous ?']
const usefulLinks = [
  { label: "Open data Côte d'Ivoire", href: 'https://data.gouv.ci' },
  { label: 'Anstat CI',               href: 'https://anstat.ci' },
  { label: 'Open data — Portail Privé', href: 'https://gouv-ci.koumoul.com/' },
  { label: 'Ministère du Plan',       href: 'https://plan.gouv.ci' },
]
const accountLinks = ['Se connecter', 'Créer un compte', 'Publier des données', 'Signaler une erreur']

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1E1E1E] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand col */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-3.5">
              <div className="w-[30px] h-[30px] bg-[#EA5800] rounded-[7px] flex items-center justify-center">
                <BarChart2 size={15} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[15px] text-white">dataivoire</span>
            </a>
            <p className="text-[13px] text-white/38 leading-relaxed max-w-[230px] mb-5">
              Une initiative citoyenne pour démocratiser l'accès aux données publiques et éclairer les prises de décisions.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { icon: <MapPin size={11} />, text: "Abidjan, Côte d'Ivoire" },
                { icon: <Mail size={11} />,   text: 'infos@dataivoire.ci' },
                { icon: <Phone size={11} />,  text: '+225 07 99 96 22 45' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[12px] text-white/40">
                  <span className="text-white/30">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {[
                { icon: <Facebook size={12} />, href: 'https://www.facebook.com/share/16bFfeDLoV/' },
                { icon: <Linkedin size={12} />, href: 'https://www.linkedin.com/company/data-ivoire-dai/' },
              ].map(({ icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/14 flex items-center justify-center text-white/40 hover:border-[#EA5800] hover:text-[#EA5800] transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-[10px] text-white/18 italic mt-3">Dernière mise à jour du site le 25 juillet 2025</p>
          </div>

          {/* Nav col */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28 mb-5">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(l => (
                <li key={l}><a href="#" className="text-[13px] text-white/48 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Useful links col */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28 mb-5">Liens utiles</p>
            <ul className="flex flex-col gap-2.5">
              {usefulLinks.map(l => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/48 hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Account col */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/28 mb-5">Compte</p>
            <ul className="flex flex-col gap-2.5">
              {accountLinks.map(l => (
                <li key={l}><a href="#" className="text-[13px] text-white/48 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-7 border-t border-[#1E1E1E]">
          <span className="text-[11px] text-white/25">© 2025 Dataivoire. Tous droits réservés.</span>
          <div className="flex gap-5">
            {['Politique de confidentialité', "Conditions générales d'utilisation"].map(l => (
              <a key={l} href="#" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
