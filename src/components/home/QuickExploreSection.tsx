import Link from "next/link"

const categories = [
  {
    href: "/engineering-colleges-pune",
    icon: "⚙️",
    label: "Engineering",
    sub: "B.Tech / BE",
    count: "40+ Colleges",
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    badge: "Most Popular",
    badgeColor: "bg-blue-600 text-white",
    hoverBorder: "hover:border-blue-300",
  },
  {
    href: "/mba-colleges-pune",
    icon: "💼",
    label: "MBA",
    sub: "Management",
    count: "25+ Colleges",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-100",
    badge: "CAT / SNAP",
    badgeColor: "bg-orange-500 text-white",
    hoverBorder: "hover:border-orange-300",
  },
  {
    href: "/medical-colleges-pune",
    icon: "🏥",
    label: "Medical",
    sub: "MBBS / BDS",
    count: "12+ Colleges",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-100",
    badge: "NEET",
    badgeColor: "bg-red-500 text-white",
    hoverBorder: "hover:border-red-300",
  },
  {
    href: "/arts-colleges-pune",
    icon: "🎓",
    label: "Arts & Science",
    sub: "BA / BSc / BCom",
    count: "30+ Colleges",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
    badge: "CUET",
    badgeColor: "bg-purple-500 text-white",
    hoverBorder: "hover:border-purple-300",
  },
  {
    href: "/law-colleges-pune",
    icon: "⚖️",
    label: "Law",
    sub: "LLB / BA LLB",
    count: "10+ Colleges",
    bg: "bg-slate-50",
    border: "border-slate-200",
    iconBg: "bg-slate-200",
    badge: "CLAT",
    badgeColor: "bg-slate-600 text-white",
    hoverBorder: "hover:border-slate-300",
  },
  {
    href: "/design-colleges-pune",
    icon: "🎨",
    label: "Design",
    sub: "B.Des / B.Arch",
    count: "8+ Colleges",
    bg: "bg-pink-50",
    border: "border-pink-100",
    iconBg: "bg-pink-100",
    badge: "NATA",
    badgeColor: "bg-pink-500 text-white",
    hoverBorder: "hover:border-pink-300",
  },
  {
    href: "/bca-colleges-pune",
    icon: "💻",
    label: "BCA / BSc IT",
    sub: "Computer Apps",
    count: "20+ Colleges",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    iconBg: "bg-cyan-100",
    badge: "MHT-CET",
    badgeColor: "bg-cyan-600 text-white",
    hoverBorder: "hover:border-cyan-300",
  },
  {
    href: "/pharmacy-colleges-pune",
    icon: "💊",
    label: "Pharmacy",
    sub: "B.Pharm / D.Pharm",
    count: "15+ Colleges",
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
    badge: "MHT-CET",
    badgeColor: "bg-green-600 text-white",
    hoverBorder: "hover:border-green-300",
  },
]


export default function QuickExploreSection() {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stream Cards */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Browse by Stream</h2>
              <p className="text-sm text-gray-500 mt-0.5">Find the right college for your stream & career goal</p>
            </div>
            <Link href="/colleges" className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 ${cat.bg} ${cat.border} ${cat.hoverBorder} hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl ${cat.iconBg} flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{cat.label}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">{cat.sub}</p>
                  <span className={`mt-1 inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
