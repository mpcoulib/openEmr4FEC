const items = [
  { label: 'Datasets',            value: '22' },
  { label: 'Téléchargements',     value: '1.4k+' },
  { label: 'Utilisateurs actifs', value: '39' },
  { label: 'Partenaires',         value: '14' },
  { label: 'Population CI',       value: '29.3M' },
  { label: 'Budget État',         value: '15 339 Mds FCFA' },
  { label: 'Balance commerciale', value: '+3.3 Mds $' },
  { label: 'Écoles secondaire',   value: '3 590' },
]

const allItems = [...items, ...items] // duplicate for seamless loop

export function Ticker() {
  return (
    <div className="overflow-hidden bg-[#111111] py-2.5 border-b border-[#1E1E1E]" aria-hidden>
      <div className="flex gap-14 w-max ticker-anim">
        {allItems.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[10px] text-white/35 flex items-center gap-2 whitespace-nowrap"
          >
            {item.label}
            <span className="text-[#EA5800] font-semibold">{item.value}</span>
            <span className="w-1 h-1 rounded-full bg-[#2A2A2A] inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}
