// Batch-injects "Related Guides" cross-links into all SEO landing pages
// that are missing them.
//
// Two strategies:
//   A) SEOLandingPage-based pages  -> add `relatedGuides={[...]}` prop
//   B) Custom-layout pages         -> inject JSX section before the CTA comment

const fs = require("fs")
const path = require("path")

const BASE = path.join(__dirname, "..", "src", "app")

// ─── Guide sets by topic cluster ─────────────────────────────────────────────

const GUIDES = {
  engineering: [
    { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
    { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
    { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
    { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
    { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
    { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
    { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
    { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
    { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
  ],
  mba: [
    { label: "Best MBA Colleges in Pune 2026", href: "/mba-colleges-pune", icon: "🏛️" },
    { label: "Top 10 MBA Colleges — Ranked", href: "/top-10-mba-colleges-in-pune", icon: "🏆" },
    { label: "MBA Placement Guide — LPA Stats", href: "/mba-colleges-pune-placement", icon: "💼" },
    { label: "Low Fees MBA Colleges in Pune", href: "/low-fees-mba-colleges-pune", icon: "💰" },
    { label: "MBA Scholarships in Pune", href: "/mba-colleges-pune-scholarship", icon: "🎓" },
    { label: "CAT Score Colleges in Pune", href: "/cat-colleges-pune", icon: "📝" },
    { label: "PGDM Colleges in Pune", href: "/pgdm-colleges-pune", icon: "📊" },
    { label: "Admission Without CAT (MAH-CET)", href: "/mba-admission-pune-without-cat", icon: "🚀" },
  ],
  medical: [
    { label: "All Medical Colleges in Pune 2026", href: "/medical-colleges-pune", icon: "🏥" },
    { label: "MBBS Colleges — NEET Cutoffs & Fees", href: "/mbbs-colleges-pune", icon: "🎓" },
    { label: "NEET Colleges & Category Cutoffs", href: "/neet-colleges-pune", icon: "📝" },
    { label: "Top 10 Medical Colleges — Ranked", href: "/top-10-medical-colleges-in-pune", icon: "🏆" },
    { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
    { label: "Pharmacy Colleges in Pune", href: "/pharmacy-colleges-pune", icon: "💊" },
    { label: "Free Medical Counselling", href: "/counselling", icon: "📞" },
  ],
  quality: [
    { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
    { label: "Low Fee Colleges in Pune", href: "/low-fee-colleges-pune", icon: "💰" },
    { label: "Pune Colleges Fees Guide 2026", href: "/colleges-pune-fees", icon: "📊" },
    { label: "Top Placement Colleges in Pune", href: "/top-placement-colleges-pune", icon: "💼" },
    { label: "College Fees Calculator", href: "/pune-college-fees-calculator", icon: "🧮" },
    { label: "Placement Comparator Tool", href: "/pune-college-placement-comparator", icon: "📈" },
    { label: "Engineering vs MBA Comparison", href: "/pune-colleges-comparison-engineering-mba", icon: "⚖️" },
    { label: "Admission Deadline Tracker 2026", href: "/pune-admission-deadline-tracker-2026", icon: "📅" },
  ],
  arts: [
    { label: "Arts & Science Colleges in Pune", href: "/arts-colleges-pune", icon: "📚" },
    { label: "Commerce Colleges in Pune", href: "/commerce-colleges-pune", icon: "📊" },
    { label: "Science Colleges in Pune", href: "/science-colleges-pune", icon: "🔬" },
    { label: "BCA Colleges in Pune", href: "/bca-colleges-pune", icon: "💻" },
    { label: "BBA Colleges in Pune", href: "/bba-colleges-pune", icon: "📈" },
    { label: "BSc IT Colleges in Pune", href: "/bsc-it-colleges-pune", icon: "🖥️" },
    { label: "Law Colleges in Pune", href: "/law-colleges-pune", icon: "⚖️" },
    { label: "Design Colleges in Pune", href: "/design-colleges-pune", icon: "🎨" },
  ],
  location: [
    { label: "Colleges in Hadapsar Pune", href: "/colleges-hadapsar-pune", icon: "📍" },
    { label: "Colleges in Kothrud Pune", href: "/colleges-kothrud-pune", icon: "📍" },
    { label: "Colleges in Wakad Pune", href: "/colleges-wakad-pune", icon: "📍" },
    { label: "Colleges with Hostel in Pune", href: "/colleges-in-pune-with-hostel", icon: "🏠" },
    { label: "All Colleges in Pune — Browse", href: "/colleges", icon: "🏛️" },
    { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
    { label: "Best Engineering Colleges Pune", href: "/engineering-colleges-pune", icon: "⚙️" },
    { label: "Best MBA Colleges in Pune", href: "/mba-colleges-pune", icon: "📈" },
  ],
}

// ─── Page → { cluster, heading, ownHref } ────────────────────────────────────

const PAGE_CONF = {
  // ── SEOLandingPage-based pages ──────────────────────────────────────────────
  "btech-colleges-pune":                    { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/btech-colleges-pune" },
  "best-mba-colleges-pune":                 { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/best-mba-colleges-pune" },
  "cat-colleges-pune":                      { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/cat-colleges-pune" },
  "colleges-hadapsar-pune":                 { cluster: "location",    heading: "Explore More Pune Colleges",       ownHref: "/colleges-hadapsar-pune" },
  "colleges-kothrud-pune":                  { cluster: "location",    heading: "Explore More Pune Colleges",       ownHref: "/colleges-kothrud-pune" },
  "colleges-pune-fees":                     { cluster: "quality",     heading: "Related Fees & Rankings Guides",   ownHref: "/colleges-pune-fees" },
  "colleges-wakad-pune":                    { cluster: "location",    heading: "Explore More Pune Colleges",       ownHref: "/colleges-wakad-pune" },
  "commerce-colleges-pune":                 { cluster: "arts",        heading: "Related Arts & Commerce Guides",   ownHref: "/commerce-colleges-pune" },
  "computer-engineering-colleges-pune":     { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/computer-engineering-colleges-pune" },
  "jee-colleges-pune":                      { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/jee-colleges-pune" },
  "low-fee-colleges-pune":                  { cluster: "quality",     heading: "Related Fees & Rankings Guides",   ownHref: "/low-fee-colleges-pune" },
  "mbbs-colleges-pune":                     { cluster: "medical",     heading: "Related Medical College Guides",   ownHref: "/mbbs-colleges-pune" },
  "mechanical-engineering-colleges-pune":   { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/mechanical-engineering-colleges-pune" },
  "mht-cet-colleges-pune":                  { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/mht-cet-colleges-pune" },
  "naac-a-plus-colleges-pune":              { cluster: "quality",     heading: "Related Rankings & Quality Guides",ownHref: "/naac-a-plus-colleges-pune" },
  "neet-colleges-pune":                     { cluster: "medical",     heading: "Related Medical College Guides",   ownHref: "/neet-colleges-pune" },
  "pgdm-colleges-pune":                     { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/pgdm-colleges-pune" },
  "science-colonies-pune":                  { cluster: "arts",        heading: "Related Arts & Science Guides",    ownHref: "/science-colleges-pune" },
  "science-colleges-pune":                  { cluster: "arts",        heading: "Related Arts & Science Guides",    ownHref: "/science-colleges-pune" },
  "top-engineering-colleges-pune":          { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/top-engineering-colleges-pune" },
  "top-placement-colleges-pune":            { cluster: "quality",     heading: "Related Placement Guides",         ownHref: "/top-placement-colleges-pune" },
  // ── Custom-layout pages ─────────────────────────────────────────────────────
  "top-10-engineering-colleges-in-pune":    { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/top-10-engineering-colleges-in-pune" },
  "top-10-mba-colleges-in-pune":            { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/top-10-mba-colleges-in-pune" },
  "engineering-colleges-pune-placement":    { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/engineering-colleges-pune-placement" },
  "low-fees-engineering-colleges-pune":     { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/low-fees-engineering-colleges-pune" },
  "engineering-colleges-pune-scholarship":  { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/engineering-colleges-pune-scholarship" },
  "direct-admission-engineering-colleges-pune": { cluster: "engineering", heading: "Related Engineering Guides",  ownHref: "/direct-admission-engineering-colleges-pune" },
  "engineering-admission-pune-without-jee": { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/engineering-admission-pune-without-jee" },
  "private-engineering-colleges-pune":      { cluster: "engineering", heading: "Related Engineering Guides",       ownHref: "/private-engineering-colleges-pune" },
  "mba-colleges-pune-placement":            { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/mba-colleges-pune-placement" },
  "low-fees-mba-colleges-pune":             { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/low-fees-mba-colleges-pune" },
  "direct-admission-mba-colleges-pune":     { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/direct-admission-mba-colleges-pune" },
  "mba-admission-pune-without-cat":         { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/mba-admission-pune-without-cat" },
  "private-mba-colleges-pune":              { cluster: "mba",         heading: "Related MBA Guides",               ownHref: "/private-mba-colleges-pune" },
  "medical-colleges-pune":                  { cluster: "medical",     heading: "Related Medical College Guides",   ownHref: "/medical-colleges-pune" },
  "bba-colleges-pune":                      { cluster: "arts",        heading: "Related BBA & Commerce Guides",    ownHref: "/bba-colleges-pune" },
  "bsc-it-colleges-pune":                   { cluster: "arts",        heading: "Related Technology & IT Guides",   ownHref: "/bsc-it-colleges-pune" },
  "architecture-colleges-pune":             { cluster: "arts",        heading: "Related Design & Architecture Guides", ownHref: "/architecture-colleges-pune" },
  "pune-admission-deadline-tracker-2026":   { cluster: "quality",     heading: "Related Admission Guides",         ownHref: "/pune-admission-deadline-tracker-2026" },
  "pune-college-fees-calculator":           { cluster: "quality",     heading: "Related Fees & Admission Guides",  ownHref: "/pune-college-fees-calculator" },
  "pune-college-placement-comparator":      { cluster: "quality",     heading: "Related Placement Guides",         ownHref: "/pune-college-placement-comparator" },
  "pune-colleges-comparison-engineering-mba":{ cluster: "quality",   heading: "Related Comparison Guides",        ownHref: "/pune-colleges-comparison-engineering-mba" },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns guides for this page, filtering out its own href */
function guidesFor(pageDir) {
  const conf = PAGE_CONF[pageDir]
  if (!conf) return null
  return {
    ...conf,
    guides: GUIDES[conf.cluster].filter(g => g.href !== conf.ownHref),
  }
}

/** Builds the TSX array literal string for the relatedGuides prop (inline) */
function buildPropArray(guides) {
  const items = guides
    .map(g => `        { label: "${g.label}", href: "${g.href}", icon: "${g.icon}" }`)
    .join(",\n")
  return `[\n${items},\n      ]`
}

/** Builds the standalone JSX block for custom pages */
function buildCustomJSX(heading, guides, indent) {
  const i = indent
  const items = guides
    .map(g => `${i}              { label: "${g.label}", href: "${g.href}", icon: "${g.icon}" }`)
    .join(",\n")

  return (
    `${i}          {/* Related Guides */}\n` +
    `${i}          <div className="mb-8">\n` +
    `${i}            <h2 className="text-xl font-bold text-gray-900 mb-4">${heading}</h2>\n` +
    `${i}            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">\n` +
    `${i}              {[\n` +
    `${items},\n` +
    `${i}              ].map(({ label, href, icon }) => (\n` +
    `${i}                <Link key={href} href={href} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 hover:border-orange-200 hover:shadow transition-all group">\n` +
    `${i}                  <span className="text-xl">{icon}</span>\n` +
    `${i}                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{label}</span>\n` +
    `${i}                </Link>\n` +
    `${i}              ))}\n` +
    `${i}            </div>\n` +
    `${i}          </div>\n\n`
  )
}

// ─── Strategy A: SEOLandingPage prop injection ────────────────────────────────

const SEO_LANDING_PAGES = new Set([
  "btech-colleges-pune", "best-mba-colleges-pune", "cat-colleges-pune",
  "colleges-hadapsar-pune", "colleges-kothrud-pune", "colleges-pune-fees",
  "colleges-wakad-pune", "commerce-colleges-pune", "computer-engineering-colleges-pune",
  "jee-colleges-pune", "low-fee-colleges-pune", "mbbs-colleges-pune",
  "mechanical-engineering-colleges-pune", "mht-cet-colleges-pune",
  "naac-a-plus-colleges-pune", "neet-colleges-pune", "pgdm-colleges-pune",
  "science-colleges-pune", "top-engineering-colleges-pune", "top-placement-colleges-pune",
])

function patchSEOLandingPage(pageDir) {
  const filePath = path.join(BASE, pageDir, "page.tsx")
  if (!fs.existsSync(filePath)) { console.log(`  SKIP (not found): ${pageDir}`); return false }

  const info = guidesFor(pageDir)
  if (!info) { console.log(`  SKIP (no conf): ${pageDir}`); return false }

  let src = fs.readFileSync(filePath, "utf8")

  // Guard: already patched
  if (src.includes("relatedGuides={")) { console.log(`  SKIP (already has relatedGuides): ${pageDir}`); return false }

  // Inject relatedGuides prop before the unique closing pattern `\n      />\n    </>`
  const closingPattern = "\n      />\n    </>"
  const idx = src.lastIndexOf(closingPattern)
  if (idx === -1) {
    console.log(`  WARN: closing pattern not found in ${pageDir}`)
    return false
  }

  const propArray = buildPropArray(info.guides)
  const injection = `\n      relatedGuides={${propArray}}`

  src = src.slice(0, idx) + injection + src.slice(idx)
  fs.writeFileSync(filePath, src, "utf8")
  console.log(`  ✅ SEOLandingPage prop → ${pageDir}`)
  return true
}

// ─── Strategy B: Custom JSX injection before {/* CTA */} ─────────────────────

function patchCustomPage(pageDir) {
  const filePath = path.join(BASE, pageDir, "page.tsx")
  if (!fs.existsSync(filePath)) { console.log(`  SKIP (not found): ${pageDir}`); return false }

  const info = guidesFor(pageDir)
  if (!info) { console.log(`  SKIP (no conf): ${pageDir}`); return false }

  let src = fs.readFileSync(filePath, "utf8")

  // Guard: already patched
  if (src.includes("Related Guides")) { console.log(`  SKIP (already has Related Guides): ${pageDir}`); return false }

  // Find {/* CTA */} with any leading whitespace
  const ctaRegex = /^([ \t]*)\{\/\* CTA \*\/\}/m
  const match = src.match(ctaRegex)
  if (!match) {
    console.log(`  WARN: {/* CTA */} not found in ${pageDir}`)
    return false
  }

  const leadingWhitespace = match[1]
  const ctaLine = match[0]

  // Detect which extra indent to use for the inner content
  // The CTA line has `leadingWhitespace` spaces; inner content uses same level
  const extraIndent = leadingWhitespace.length >= 10 ? "" : ""  // same indent level

  const insertion = buildCustomJSX(info.heading, info.guides, extraIndent)
  src = src.replace(ctaLine, insertion + ctaLine)

  fs.writeFileSync(filePath, src, "utf8")
  console.log(`  ✅ Custom JSX     → ${pageDir}`)
  return true
}

// ─── Step 1: Update SEOLandingPage.tsx component ────────────────────────────

function updateSEOLandingPageComponent() {
  const compPath = path.join(__dirname, "..", "src", "components", "seo", "SEOLandingPage.tsx")
  let src = fs.readFileSync(compPath, "utf8")

  if (src.includes("relatedGuides")) {
    console.log("SEOLandingPage.tsx already has relatedGuides prop — skipping")
    return
  }

  // 1. Add RelatedGuide type + extend interface
  src = src.replace(
    "interface FAQ {",
    `interface RelatedGuide {
  label: string
  href: string
  icon: string
}

interface FAQ {`
  )

  src = src.replace(
    "  // CTA\n  ctaHeading: string\n  ctaSubtext: string\n}",
    `  // CTA
  ctaHeading: string
  ctaSubtext: string

  // Related Guides (optional cross-links)
  relatedGuides?: RelatedGuide[]
}`
  )

  // 2. Add relatedGuides to destructured params
  src = src.replace(
    "  ctaHeading,\n  ctaSubtext,\n}: SEOLandingPageProps)",
    "  ctaHeading,\n  ctaSubtext,\n  relatedGuides,\n}: SEOLandingPageProps)"
  )

  // 3. Render the section between FAQs and CTA
  const ctaSection = `        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">`

  const relatedSection = `        {/* Related Guides */}
        {relatedGuides && relatedGuides.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedGuides.map(({ label, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 hover:border-orange-200 hover:shadow transition-all group">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">`

  if (!src.includes(ctaSection)) {
    console.log("WARN: CTA section anchor not found in SEOLandingPage.tsx")
    return
  }

  src = src.replace(ctaSection, relatedSection)
  fs.writeFileSync(compPath, src, "utf8")
  console.log("✅ SEOLandingPage.tsx updated with relatedGuides prop")
}

// ─── Run ─────────────────────────────────────────────────────────────────────

console.log("\n── Step 1: Update SEOLandingPage component ─────────────────────────────────")
updateSEOLandingPageComponent()

console.log("\n── Step 2: Patch SEOLandingPage-based pages ─────────────────────────────────")
for (const pageDir of SEO_LANDING_PAGES) {
  patchSEOLandingPage(pageDir)
}

console.log("\n── Step 3: Patch custom-layout pages ────────────────────────────────────────")
const CUSTOM_PAGES = Object.keys(PAGE_CONF).filter(d => !SEO_LANDING_PAGES.has(d))
for (const pageDir of CUSTOM_PAGES) {
  patchCustomPage(pageDir)
}

console.log("\n── Done ─────────────────────────────────────────────────────────────────────\n")
