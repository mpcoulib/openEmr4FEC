export type AccentColor = 'orange' | 'green' | 'blue' | 'teal'

export interface Category {
  id: string
  name: string
  count: number
  color: AccentColor
  icon: string
}

export interface Dataset {
  id: number
  title: string
  org: string
  category: string
  categoryColor: AccentColor
  views: number
  downloads: number
}

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  tag: string
  tagColor: AccentColor
}

export interface TeamMember {
  id: number
  name: string
  initials: string
  role: string
  color: AccentColor
  linkedin: string
}

export interface Org {
  id: number
  name: string
}
