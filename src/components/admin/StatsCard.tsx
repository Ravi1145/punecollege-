interface StatsCardProps {
  label: string
  value: number | string
  icon: string
  trend?: string
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'
}

const colors = {
  blue:   'bg-blue-50 text-blue-600 border-blue-100',
  green:  'bg-green-50 text-green-600 border-green-100',
  orange: 'bg-orange-50 text-orange-600 border-orange-100',
  red:    'bg-red-50 text-red-600 border-red-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
}

export default function StatsCard({
  label, value, icon, trend, color = 'blue',
}: StatsCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && <span className="text-xs font-medium opacity-70">{trend}</span>}
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm font-medium mt-1 opacity-80">{label}</div>
    </div>
  )
}
