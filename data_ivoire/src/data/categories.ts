import type { Category } from '../types'

export const categories: Category[] = [
  { id: 'admin',      name: 'Administration territoriale', count: 1,  color: 'blue',   icon: 'grid' },
  { id: 'carto',      name: 'Cartographie',                count: 5,  color: 'teal',   icon: 'map' },
  { id: 'economie',   name: 'Économie',                    count: 0,  color: 'orange', icon: 'trending' },
  { id: 'pop-elec',   name: 'Population électorale',       count: 2,  color: 'orange', icon: 'users' },
  { id: 'elections',  name: "Résultats d'élections",       count: 2,  color: 'orange', icon: 'vote' },
  { id: 'budget',     name: 'Budget',                      count: 3,  color: 'blue',   icon: 'creditcard' },
  { id: 'education',  name: 'Éducation',                   count: 3,  color: 'green',  icon: 'graduation' },
  { id: 'societe',    name: 'Société',                     count: 5,  color: 'teal',   icon: 'society' },
  { id: 'demographie',name: 'Démographie',                 count: 1,  color: 'green',  icon: 'demography' },
]
