import type { ReactNode } from 'react'
import type { AccentColor } from '../../types'

const numColors: Record<AccentColor, string> = {
  orange: 'text-[#EA5800]',
  green:  'text-[#34D399]',
  blue:   'text-[#60A5FA]',
  teal:   'text-[#22D3EE]',
}

const glowColors: Record<AccentColor, string> = {
  orange: 'bg-[#EA5800]',
  green:  'bg-[#34D399]',
  blue:   'bg-[#60A5FA]',
  teal:   'bg-[#22D3EE]',
}

interface BentoCardProps {
  value: string
  label: string
  color: AccentColor
  icon: ReactNode
}

export function BentoCard({ value, label, color, icon }: BentoCardProps) {
  return (
    <div className="relative bg-[#0A0A0A] rounded-xl p-6 overflow-hidden">
      {/* glow blob */}
      <div
        className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-[0.07] ${glowColors[color]}`}
      />
      {/* icon */}
      <div className="absolute top-4 right-4 opacity-15">{icon}</div>

      <div className={`font-mono text-[42px] font-semibold leading-none mb-2 ${numColors[color]}`}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
        {label}
      </div>
    </div>
  )
}
