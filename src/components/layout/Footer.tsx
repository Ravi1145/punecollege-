import Link from "next/link"
import { Mail, Phone, MapPin, Share2, ExternalLink, Rss, Play } from "lucide-react"

const footerLinks = {
  "Top Colleges": [
    { label: "COEP Pune", href: "/colleges/coep-college-of-engineering-pune" },
    { label: "SIBM Pune", href: "/colleges/sibm-symbiosis-institute-business-management-pune" },
    { label: "AFMC Pune", href: "/colleges/afmc-armed-forces-medical-college-pune" },
    { label: "PICT Pune", href: "/colleges/pict-pune-institute-of-computer-technology" },
    { label: "VIT Pune", href: "/colleges/vit-pune-vishwakarma-institute-of-technology" },
    { label: "Fergusson College", href: "/colleges/fergusson-college-pune" },
  ],
  "Engineering Guides": [
    { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
    { label: "Top 10 Engineering Colleges", href: "/top-10-engineering-colleges-in-pune" },
    { label: "Placement Rankings", href: "/engineering-colleges-pune-placement" },
    { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune" },
    { label: "Scholarships for Engineering", href: "/engineering-colleges-pune-scholarship" },
    { label: "Admission Without JEE", href: "/engineering-admission-pune-without-jee" },
  ],
  "MBA Guides": [
    { label: "MBA Colleges Pune", href: "/mba-colleges-pune" },
    { label: "Top 10 MBA Colleges", href: "/top-10-mba-colleges-in-pune" },
    { label: "MBA Placement Rankings", href: "/mba-colleges-pune-placement" },
    { label: "Low Fees MBA Colleges", href: "/low-fees-mba-colleges-pune" },
    { label: "MBA Without CAT", href: "/mba-admission-pune-without-cat" },
    { label: "MBA Scholarships Pune", href: "/mba-colleges-pune-scholarship" },
  ],
  "Tools & Quick Links": [
    { label: "AI College Finder", href: "/ai-finder" },
    { label: "Compare Colleges", href: "/compare" },
    { label: "Fees Calculator", href: "/pune-college-fees-calculator" },
    { label: "Placement Comparator", href: "/pune-college-placement-comparator" },
    { label: "Admission Deadlines 2026", href: "/pune-admission-deadline-tracker-2026" },
    { label: "Free Counselling", href: "/counselling" },
  ],
}

const seoLinks = [
  { label: "Best College in Pune", href: "/" },
  { label: "Best BTech College in Pune", href: "/engineering-colleges-pune" },
  { label: "Best MBA College in Pune", href: "/mba-colleges-pune" },
  { label: "Top Engineering Colleges Pune", href: "/top-10-engineering-colleges-in-pune" },
  { label: "Top MBA Colleges Pune", href: "/top-10-mba-colleges-in-pune" },
  { label: "Medical Colleges Pune", href: "/colleges?stream=Medical" },
  { label: "Private Engineering Colleges Pune", href: "/private-engineering-colleges-pune" },
  { label: "Private MBA Colleges Pune", href: "/private-mba-colleges-pune" },
  { label: "Engineering Placement 2026", href: "/engineering-colleges-pune-placement" },
  { label: "MBA Placement 2026", href: "/mba-colleges-pune-placement" },
  { label: "Cheapest Engineering Colleges Pune", href: "/low-fees-engineering-colleges-pune" },
  { label: "Cheapest MBA Colleges Pune", href: "/low-fees-mba-colleges-pune" },
  { label: "Direct Admission Engineering Pune", href: "/direct-admission-engineering-colleges-pune" },
  { label: "Direct Admission MBA Pune", href: "/direct-admission-mba-colleges-pune" },
  { label: "Colleges in Pune with Fees", href: "/pune-college-fees-calculator" },
  { label: "Pune University Colleges List", href: "/colleges" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="CollegePune" height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              India&apos;s AI-powered college discovery portal for Pune. Find and compare the best engineering, MBA, medical, and arts colleges with real fees, placements, and student reviews.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                Undri, Pune, Maharashtra 411060
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:Support@collegepune.com" className="hover:text-orange-400 transition-colors">Support@collegepune.com</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="tel:+917753831118" className="hover:text-orange-400 transition-colors">+91 77538 31118</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Share2, href: "#" },
                { icon: ExternalLink, href: "#" },
                { icon: Rss, href: "#" },
                { icon: Play, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SEO keyword links */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {seoLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2026 CollegePune.com. All rights reserved. AI-powered college discovery for Pune.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
