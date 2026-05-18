export const PLOTS = [
  {
    id: 'p1',
    name: 'Premium Estate',
    description: 'Located under a quiet heritage tree with a private granite bench.',
    price: 450000,
    badge: 'Most Selected',
  },
  {
    id: 'p2',
    name: 'Serenity Path',
    description: 'East-facing plots near a central reflection area.',
    price: 280000,
    badge: null,
  },
  {
    id: 'p3',
    name: 'Celestial Garden',
    description: 'Open lawn plots with garden views and morning sunlight.',
    price: 185000,
    badge: null,
  },
  {
    id: 'p4',
    name: 'Heritage Row',
    description: 'A practical family plot option near main walkways.',
    price: 125000,
    badge: 'Budget Friendly',
  },
]

export const PLOT_NAMES = PLOTS.reduce<Record<string, string>>((acc, plot) => {
  acc[plot.id] = plot.name
  return acc
}, {})

export function getPlotName(plotId?: string | null) {
  if (!plotId) return 'Plot Package'
  return PLOT_NAMES[plotId] || plotId
}
