import Link from 'next/link'

interface Props {
  title: string
  subtitle?: string
  action?: { label: string; href?: string; form?: boolean }
}

export default function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && action.href && (
        <Link href={action.href}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          {action.label}
        </Link>
      )}
    </div>
  )
}
