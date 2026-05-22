interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  hint?: string
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  children: React.ReactNode
}
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  hint?: string
}

const baseCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

export function InputField({ label, name, hint, className, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input id={name} name={name} className={className ? `${baseCls} ${className}` : baseCls} {...props} />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

export function SelectField({ label, name, children, className, ...props }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select id={name} name={name} className={className ? `${baseCls} ${className}` : baseCls} {...props}>
        {children}
      </select>
    </div>
  )
}

export function TextareaField({ label, name, hint, className, ...props }: TextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea id={name} name={name} className={className ? `${baseCls} ${className}` : baseCls} {...props} />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}
