import Link from 'next/link'
import { InputField, SelectField, TextareaField } from '@/components/admin/FormField'
import ImageUpload from '@/components/admin/ImageUpload'
import { createCollegeAction } from '../actions'

export default function NewCollegePage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/colleges" className="text-gray-400 hover:text-gray-600 text-lg">←</Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Add New College</h1>
          <p className="text-gray-500 text-sm mt-0.5">Fill all details for a rich college listing</p>
        </div>
      </div>

      <form action={createCollegeAction} className="space-y-6">

        {/* ── Basic Info ─────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="College Name *" name="name" required placeholder="College of Engineering Pune" />
            <InputField label="Short Name" name="short_name" placeholder="COEP" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Slug *" name="slug" required placeholder="coep-pune" className="font-mono"
              hint="URL: /colleges/coep-pune — use lowercase hyphens only" />
            <InputField label="Affiliation" name="affiliation" placeholder="Savitribai Phule Pune University" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Type" name="type" defaultValue="">
              <option value="">Select type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Deemed">Deemed</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Central University">Central University</option>
              <option value="State University">State University</option>
            </SelectField>
            <SelectField label="Stream" name="stream" defaultValue="">
              <option value="">Select stream</option>
              <option value="Engineering">Engineering</option>
              <option value="MBA">MBA / Management</option>
              <option value="Medical">Medical / MBBS</option>
              <option value="Law">Law</option>
              <option value="Architecture">Architecture</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts & Humanities</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Agriculture">Agriculture</option>
            </SelectField>
            <InputField label="Established Year" name="established" type="number" min="1800" max="2030" placeholder="1854" />
          </div>
          <TextareaField label="Description" name="description" rows={4} placeholder="Comprehensive description of the college — history, reputation, key achievements..." />
          <SelectField label="Status" name="status" defaultValue="draft">
            <option value="draft">Draft — not visible on site</option>
            <option value="published">Published — live on site</option>
            <option value="pending">Pending — awaiting review</option>
          </SelectField>
        </section>

        {/* ── Location ───────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="City" name="city" defaultValue="Pune" />
            <InputField label="State" name="state" defaultValue="Maharashtra" />
          </div>
          <InputField label="Location (short label)" name="location" placeholder="Shivajinagar, Pune"
            hint="Shown as a tag on college cards" />
          <TextareaField label="Full Address" name="address" rows={2} placeholder="Plot No., Street, Area, City, PIN Code" />
        </section>

        {/* ── Rankings & Accreditation ───────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Rankings & Accreditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="NAAC Grade" name="naac_grade" defaultValue="">
              <option value="">Not Accredited / Unknown</option>
              <option value="A++">A++ (Highest)</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B++">B++</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </SelectField>
            <InputField label="NIRF Rank" name="nirf_rank" type="number" min="1" max="1000" placeholder="e.g. 45" />
          </div>
        </section>

        {/* ── Courses & Academics ────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Courses & Academics</h2>
          <TextareaField label="Courses Offered" name="courses" rows={4}
            placeholder="B.Tech Computer Engineering&#10;B.Tech Mechanical&#10;M.Tech&#10;MBA"
            hint="One course per line (or comma-separated)" />
          <TextareaField label="Specializations" name="specializations" rows={3}
            placeholder="Artificial Intelligence&#10;Data Science&#10;Cyber Security"
            hint="One specialization per line" />
          <TextareaField label="Entrance Exams Accepted" name="entrance_exams" rows={2}
            placeholder="JEE Main, MHT-CET, GATE"
            hint="Comma-separated: JEE Main, MHT-CET, GATE" />
        </section>

        {/* ── Fees & Placements ──────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Fees & Placements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Fees Min (₹/year)" name="fees_min" type="number" min="0" placeholder="80000"
              hint="Minimum annual fee in rupees" />
            <InputField label="Fees Max (₹/year)" name="fees_max" type="number" min="0" placeholder="200000"
              hint="Maximum annual fee in rupees" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Avg Package (₹/year)" name="avg_placement" type="number" min="0" placeholder="700000"
              hint="Average CTC in rupees" />
            <InputField label="Highest Package (₹/year)" name="highest_pkg" type="number" min="0" placeholder="4200000"
              hint="Highest CTC in rupees" />
          </div>
          <TextareaField label="Top Recruiters" name="top_recruiters" rows={3}
            placeholder="TCS, Infosys, Wipro, Cognizant, Microsoft"
            hint="Comma-separated company names" />
        </section>

        {/* ── Admissions ─────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Admissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Total Seats" name="admissions_total_seats" type="number" min="0"
              placeholder="120" hint="Total approved intake" />
            <InputField label="Application Open Date" name="admissions_app_start" type="date" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Application Close Date" name="admissions_app_end" type="date" />
            <InputField label="Category Breakdown" name="admissions_categories"
              placeholder="Gen: 60, OBC: 27, SC: 13, ST: 6, EWS: 6" hint="Seat distribution by category" />
          </div>
          <TextareaField label="Admission Process" name="admissions_process" rows={4}
            placeholder="Describe step-by-step admission procedure — eligibility, entrance exams, merit list, counselling rounds..." />
          <TextareaField label="Important Dates" name="admissions_important_dates" rows={3}
            placeholder="MHT-CET Registration: Jan 15 - Mar 31&#10;Merit List: June 10&#10;Round 1 Allotment: July 5"
            hint="One date event per line" />
        </section>

        {/* ── Cutoffs ─────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Cutoffs</h2>
          <TextareaField label="Year-wise Cutoffs" name="cutoffs" rows={8}
            placeholder="2024 MHT-CET — Computer Engg:&#10;  General: 98.5 percentile&#10;  OBC: 96.2 percentile&#10;  SC: 88.0 percentile&#10;&#10;2023 MHT-CET — Computer Engg:&#10;  General: 97.8 percentile&#10;  OBC: 95.0 percentile"
            hint="Enter cutoffs in any format — year, branch, category-wise percentile/rank" />
        </section>

        {/* ── Extended Rankings ────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Additional Rankings</h2>
          <TextareaField label="Other Rankings & Recognition" name="rankings_extra" rows={5}
            placeholder="Outlook India 2024: #12 Engineering in Pune&#10;India Today 2024: #8 Tech Colleges Maharashtra&#10;Times Higher Ed: Top 200 Asia&#10;NBA Accredited: 6 Programs"
            hint="One ranking per line — agency, year, rank/band" />
        </section>

        {/* ── Scholarships ────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Scholarships</h2>
          <TextareaField label="Available Scholarships" name="scholarships" rows={5}
            placeholder="Merit Scholarship: Top 10 students — 50% tuition fee waiver&#10;EBC Scholarship: Family income < ₹1 lakh/year — full fee waiver&#10;SC/ST Scholarship: Full tuition + stipend&#10;OBC Non-Creamy Layer: 50% fee concession"
            hint="One scholarship per line — name, eligibility, benefit" />
        </section>

        {/* ── Facilities & Highlights ────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Facilities & Highlights</h2>
          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" name="hostel" id="hostel_new" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="hostel_new" className="text-sm font-medium text-gray-700">Hostel Available</label>
          </div>
          <TextareaField label="Detailed Facilities" name="facilities_detail" rows={6}
            placeholder="Central Library (1 lakh+ books, 24/7 access)&#10;Computer Labs (500 systems, high-speed internet)&#10;Sports Complex (cricket ground, basketball, badminton)&#10;Cafeteria & Food Court&#10;Wi-Fi Campus (100 Mbps)&#10;Medical Centre (resident doctor)"
            hint="One facility per line — name and brief description" />
          <TextareaField label="Key Highlights" name="highlights" rows={4}
            placeholder="Ranked #1 in Pune by NIRF 2024&#10;100% placement record for 5 years&#10;NBA accredited programs&#10;2000+ acre campus"
            hint="One highlight per line — shown as bullet points on the college page" />
          <TextareaField label="Tags" name="tags" rows={2}
            placeholder="top-engineering, placement-focused, government, autonomous"
            hint="Comma-separated: used for search and filtering" />
        </section>

        {/* ── FAQs ────────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">FAQs</h2>
          <TextareaField label="Frequently Asked Questions" name="faqs" rows={10}
            placeholder="Q: What is the fee structure for B.Tech?&#10;A: Annual fee is ₹1.2 lakh for government quota.&#10;---&#10;Q: Is hostel mandatory?&#10;A: No, hostel is optional.&#10;---&#10;Q: What entrance exams are accepted?&#10;A: MHT-CET and JEE Main."
            hint="Format: Q: question (newline) A: answer (newline) --- (separator between FAQs)" />
        </section>

        {/* ── Contact & Links ────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Contact & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Official Website" name="website" type="url" placeholder="https://www.coep.org.in" />
            <InputField label="Phone" name="phone" type="tel" placeholder="+91 20 2550 7000" />
          </div>
          <InputField label="Admission / Info Email" name="email" type="email" placeholder="admissions@coep.org.in" />
        </section>

        {/* ── Media ──────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Media</h2>
          <ImageUpload
            label="Cover Image"
            name="cover_url"
            folder="covers"
            aspectClass="h-40 w-full"
            hint="Banner shown on the college page — 1200×630 px recommended (JPG, PNG, WebP)"
          />
          <ImageUpload
            label="College Logo"
            name="logo_url"
            folder="logos"
            aspectClass="h-20"
            hint="Square logo — 200×200 px recommended (PNG, SVG, WebP)"
          />
        </section>

        {/* Actions */}
        <div className="flex gap-3 pb-6">
          <button type="submit"
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            Create College
          </button>
          <Link href="/admin/colleges"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
