import type { AccentColor } from '../../types'

const styles: Record<AccentColor, string> = {
  orange: 'bg-[#FFF3ED] text-[#EA5800]',
  green:  'bg-[#ECFDF5] text-[#059669]',
  blue:   'bg-[#EFF6FF] text-[#2563EB]',
  teal:   'bg-[#ECFEFF] text-[#0891B2]',
}

interface BadgeProps {
  label: string
  color: AccentColor
  size?: 'sm' | 'xs'
}

export function Badge({ label, color, size = 'xs' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block font-bold uppercase tracking-wide rounded
        ${size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'}
        ${styles[color]}
      `}
    >
      {label}
    </span>
  )
}
