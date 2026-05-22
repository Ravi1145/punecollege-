type Status = 'draft' | 'pending' | 'published' | 'rejected'

const styles: Record<Status, string> = {
  draft:     'bg-gray-100 text-gray-600',
  pending:   'bg-yellow-100 text-yellow-700',
  published: 'bg-green-100 text-green-700',
  rejected:  'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  )
}
