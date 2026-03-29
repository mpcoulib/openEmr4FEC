interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  seeAll?: { label: string; href: string }
}

export function SectionHeader({ label, title, subtitle, seeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-11">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#AAAAAA] mb-2.5">
          {label}
        </p>
        <h2
          className="font-serif font-black text-[clamp(30px,3.5vw,46px)] leading-[1.05] tracking-[-0.02em] mb-2"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#666] max-w-lg">{subtitle}</p>
        )}
      </div>
      {seeAll && (
        <a
          href={seeAll.href}
          className="text-[13px] font-semibold text-[#EA5800] border-b border-transparent hover:border-[#EA5800] pb-px transition-colors whitespace-nowrap"
        >
          {seeAll.label}
        </a>
      )}
    </div>
  )
}
