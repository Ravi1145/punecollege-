export interface CutoffYear {
  year: number
  open: number
  obc: number
  sc: number
  st?: number
}

export interface CollegeCutoff {
  college_slug: string
  college_name: string
  college_short: string
  exam: string
  stream: string
  unit?: string // "percentile" | "rank" | "score"
  cutoffs: CutoffYear[]
}

export const cutoffsData: CollegeCutoff[] = [
  // ─────────────────── ENGINEERING — MHT-CET ───────────────────
  {
    college_slug: "coep-college-of-engineering-pune",
    college_name: "College of Engineering Pune",
    college_short: "COEP",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 99.2, obc: 97.8, sc: 94.1, st: 90.0 },
      { year: 2021, open: 99.4, obc: 98.1, sc: 94.8, st: 91.2 },
      { year: 2022, open: 99.5, obc: 98.3, sc: 94.8, st: 91.5 },
      { year: 2023, open: 99.6, obc: 98.5, sc: 95.1, st: 92.0 },
      { year: 2024, open: 99.7, obc: 98.6, sc: 95.3, st: 92.5 },
      { year: 2025, open: 99.7, obc: 98.7, sc: 95.4, st: 92.8 },
      { year: 2026, open: 99.8, obc: 98.7, sc: 95.5, st: 93.0 },
    ],
  },
  {
    college_slug: "pict-pune-institute-computer-technology",
    college_name: "Pune Institute of Computer Technology",
    college_short: "PICT",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 98.1, obc: 96.2, sc: 91.5, st: 86.0 },
      { year: 2021, open: 98.3, obc: 96.5, sc: 92.0, st: 87.0 },
      { year: 2022, open: 98.5, obc: 96.8, sc: 92.5, st: 87.5 },
      { year: 2023, open: 98.7, obc: 97.0, sc: 93.0, st: 88.0 },
      { year: 2024, open: 98.9, obc: 97.2, sc: 93.5, st: 88.5 },
      { year: 2025, open: 99.0, obc: 97.4, sc: 93.8, st: 89.0 },
      { year: 2026, open: 99.1, obc: 97.5, sc: 94.0, st: 89.5 },
    ],
  },
  {
    college_slug: "vit-pune-vishwakarma-institute-of-technology",
    college_name: "Vishwakarma Institute of Technology",
    college_short: "VIT Pune",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 97.0, obc: 94.5, sc: 89.0, st: 83.0 },
      { year: 2021, open: 97.3, obc: 94.8, sc: 89.5, st: 83.5 },
      { year: 2022, open: 97.5, obc: 95.0, sc: 90.0, st: 84.0 },
      { year: 2023, open: 97.8, obc: 95.3, sc: 90.5, st: 84.5 },
      { year: 2024, open: 98.0, obc: 95.5, sc: 91.0, st: 85.0 },
      { year: 2025, open: 98.1, obc: 95.7, sc: 91.2, st: 85.3 },
      { year: 2026, open: 98.2, obc: 95.8, sc: 91.5, st: 85.5 },
    ],
  },
  {
    college_slug: "mit-wpu-mit-world-peace-university",
    college_name: "MIT World Peace University",
    college_short: "MIT-WPU",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 95.0, obc: 91.0, sc: 84.0, st: 78.0 },
      { year: 2021, open: 95.5, obc: 91.5, sc: 84.5, st: 78.5 },
      { year: 2022, open: 96.0, obc: 92.0, sc: 85.0, st: 79.0 },
      { year: 2023, open: 96.3, obc: 92.3, sc: 85.5, st: 79.5 },
      { year: 2024, open: 96.5, obc: 92.5, sc: 86.0, st: 80.0 },
      { year: 2025, open: 96.7, obc: 92.8, sc: 86.3, st: 80.3 },
      { year: 2026, open: 96.8, obc: 93.0, sc: 86.5, st: 80.5 },
    ],
  },
  {
    college_slug: "sit-pune-symbiosis-institute-of-technology",
    college_name: "Symbiosis Institute of Technology",
    college_short: "SIT Pune",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 94.0, obc: 90.0, sc: 83.0, st: 76.0 },
      { year: 2021, open: 94.5, obc: 90.5, sc: 83.5, st: 76.5 },
      { year: 2022, open: 95.0, obc: 91.0, sc: 84.0, st: 77.0 },
      { year: 2023, open: 95.3, obc: 91.3, sc: 84.5, st: 77.5 },
      { year: 2024, open: 95.5, obc: 91.5, sc: 85.0, st: 78.0 },
      { year: 2025, open: 95.7, obc: 91.8, sc: 85.3, st: 78.3 },
      { year: 2026, open: 95.8, obc: 92.0, sc: 85.5, st: 78.5 },
    ],
  },
  {
    college_slug: "jspm-narhe-technical-campus-pune",
    college_name: "JSPM Narhe Technical Campus",
    college_short: "JSPM",
    exam: "mht-cet",
    stream: "engineering",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 78.0, obc: 71.0, sc: 60.0, st: 52.0 },
      { year: 2021, open: 79.0, obc: 72.0, sc: 61.0, st: 53.0 },
      { year: 2022, open: 80.0, obc: 73.0, sc: 62.0, st: 54.0 },
      { year: 2023, open: 81.0, obc: 74.0, sc: 63.0, st: 55.0 },
      { year: 2024, open: 82.0, obc: 75.0, sc: 64.0, st: 56.0 },
      { year: 2025, open: 83.0, obc: 76.0, sc: 65.0, st: 57.0 },
      { year: 2026, open: 84.0, obc: 77.0, sc: 66.0, st: 58.0 },
    ],
  },

  // ─────────────────── ENGINEERING — JEE ────────────────────────
  {
    college_slug: "coep-college-of-engineering-pune",
    college_name: "College of Engineering Pune",
    college_short: "COEP",
    exam: "jee",
    stream: "engineering",
    unit: "rank",
    cutoffs: [
      { year: 2020, open: 8500, obc: 12000, sc: 22000, st: 35000 },
      { year: 2021, open: 8200, obc: 11500, sc: 21000, st: 33000 },
      { year: 2022, open: 7800, obc: 11000, sc: 20000, st: 31000 },
      { year: 2023, open: 7500, obc: 10500, sc: 19000, st: 29000 },
      { year: 2024, open: 7200, obc: 10200, sc: 18500, st: 28000 },
      { year: 2025, open: 7000, obc: 10000, sc: 18000, st: 27000 },
      { year: 2026, open: 6800, obc: 9800,  sc: 17500, st: 26500 },
    ],
  },
  {
    college_slug: "mit-wpu-mit-world-peace-university",
    college_name: "MIT World Peace University",
    college_short: "MIT-WPU",
    exam: "jee",
    stream: "engineering",
    unit: "rank",
    cutoffs: [
      { year: 2020, open: 45000, obc: 65000, sc: 90000, st: 120000 },
      { year: 2021, open: 43000, obc: 62000, sc: 87000, st: 115000 },
      { year: 2022, open: 41000, obc: 59000, sc: 84000, st: 110000 },
      { year: 2023, open: 39000, obc: 57000, sc: 81000, st: 107000 },
      { year: 2024, open: 37000, obc: 55000, sc: 78000, st: 104000 },
      { year: 2025, open: 35500, obc: 53000, sc: 76000, st: 101000 },
      { year: 2026, open: 34000, obc: 51000, sc: 74000, st: 99000 },
    ],
  },
  {
    college_slug: "vit-pune-vishwakarma-institute-of-technology",
    college_name: "Vishwakarma Institute of Technology",
    college_short: "VIT Pune",
    exam: "jee",
    stream: "engineering",
    unit: "rank",
    cutoffs: [
      { year: 2020, open: 50000, obc: 72000, sc: 100000, st: 140000 },
      { year: 2021, open: 48000, obc: 69000, sc: 97000, st: 135000 },
      { year: 2022, open: 46000, obc: 66000, sc: 94000, st: 130000 },
      { year: 2023, open: 44000, obc: 63000, sc: 91000, st: 126000 },
      { year: 2024, open: 42000, obc: 61000, sc: 88000, st: 122000 },
      { year: 2025, open: 40500, obc: 59000, sc: 86000, st: 119000 },
      { year: 2026, open: 39000, obc: 57000, sc: 84000, st: 116000 },
    ],
  },

  // ─────────────────── MEDICAL — NEET ───────────────────────────
  {
    college_slug: "afmc-armed-forces-medical-college-pune",
    college_name: "Armed Forces Medical College",
    college_short: "AFMC",
    exam: "neet",
    stream: "medical",
    unit: "score",
    cutoffs: [
      { year: 2020, open: 650, obc: 640, sc: 620, st: 610 },
      { year: 2021, open: 655, obc: 645, sc: 625, st: 613 },
      { year: 2022, open: 658, obc: 648, sc: 628, st: 615 },
      { year: 2023, open: 660, obc: 650, sc: 630, st: 618 },
      { year: 2024, open: 662, obc: 652, sc: 633, st: 620 },
      { year: 2025, open: 664, obc: 654, sc: 635, st: 622 },
      { year: 2026, open: 665, obc: 655, sc: 636, st: 623 },
    ],
  },
  {
    college_slug: "bj-government-medical-college-pune",
    college_name: "BJ Government Medical College",
    college_short: "BJMC",
    exam: "neet",
    stream: "medical",
    unit: "score",
    cutoffs: [
      { year: 2020, open: 612, obc: 595, sc: 568, st: 550 },
      { year: 2021, open: 618, obc: 600, sc: 572, st: 554 },
      { year: 2022, open: 622, obc: 604, sc: 576, st: 557 },
      { year: 2023, open: 625, obc: 607, sc: 579, st: 560 },
      { year: 2024, open: 628, obc: 610, sc: 582, st: 563 },
      { year: 2025, open: 630, obc: 612, sc: 584, st: 565 },
      { year: 2026, open: 632, obc: 614, sc: 586, st: 567 },
    ],
  },
  {
    college_slug: "dymims-dy-patil-medical-college-pune",
    college_name: "D.Y. Patil Medical College",
    college_short: "DYP Medical",
    exam: "neet",
    stream: "medical",
    unit: "score",
    cutoffs: [
      { year: 2020, open: 560, obc: 540, sc: 510, st: 490 },
      { year: 2021, open: 565, obc: 545, sc: 515, st: 494 },
      { year: 2022, open: 570, obc: 550, sc: 520, st: 498 },
      { year: 2023, open: 575, obc: 554, sc: 524, st: 502 },
      { year: 2024, open: 578, obc: 557, sc: 527, st: 505 },
      { year: 2025, open: 580, obc: 559, sc: 529, st: 507 },
      { year: 2026, open: 582, obc: 561, sc: 531, st: 509 },
    ],
  },

  // ─────────────────── MBA — SNAP ────────────────────────────────
  {
    college_slug: "sibm-symbiosis-institute-business-management-pune",
    college_name: "Symbiosis Institute of Business Management",
    college_short: "SIBM",
    exam: "snap",
    stream: "mba",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 98.5, obc: 96.0, sc: 90.0, st: 85.0 },
      { year: 2021, open: 98.7, obc: 96.2, sc: 90.5, st: 85.5 },
      { year: 2022, open: 98.8, obc: 96.5, sc: 91.0, st: 86.0 },
      { year: 2023, open: 99.0, obc: 96.7, sc: 91.5, st: 86.5 },
      { year: 2024, open: 99.1, obc: 97.0, sc: 92.0, st: 87.0 },
      { year: 2025, open: 99.2, obc: 97.1, sc: 92.3, st: 87.3 },
      { year: 2026, open: 99.3, obc: 97.2, sc: 92.5, st: 87.5 },
    ],
  },
  {
    college_slug: "scmhrd-symbiosis-centre-management-human-resource-pune",
    college_name: "Symbiosis Centre for Management & HRD",
    college_short: "SCMHRD",
    exam: "snap",
    stream: "mba",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 97.0, obc: 94.0, sc: 87.0, st: 82.0 },
      { year: 2021, open: 97.2, obc: 94.3, sc: 87.5, st: 82.5 },
      { year: 2022, open: 97.5, obc: 94.5, sc: 88.0, st: 83.0 },
      { year: 2023, open: 97.7, obc: 94.8, sc: 88.5, st: 83.5 },
      { year: 2024, open: 97.9, obc: 95.0, sc: 89.0, st: 84.0 },
      { year: 2025, open: 98.0, obc: 95.2, sc: 89.3, st: 84.3 },
      { year: 2026, open: 98.1, obc: 95.3, sc: 89.5, st: 84.5 },
    ],
  },

  // ─────────────────── MBA — CAT ─────────────────────────────────
  {
    college_slug: "sibm-symbiosis-institute-business-management-pune",
    college_name: "Symbiosis Institute of Business Management",
    college_short: "SIBM",
    exam: "cat",
    stream: "mba",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 90.0, obc: 85.0, sc: 75.0, st: 70.0 },
      { year: 2021, open: 90.5, obc: 85.5, sc: 75.5, st: 70.5 },
      { year: 2022, open: 91.0, obc: 86.0, sc: 76.0, st: 71.0 },
      { year: 2023, open: 91.5, obc: 86.5, sc: 76.5, st: 71.5 },
      { year: 2024, open: 92.0, obc: 87.0, sc: 77.0, st: 72.0 },
      { year: 2025, open: 92.3, obc: 87.3, sc: 77.3, st: 72.3 },
      { year: 2026, open: 92.5, obc: 87.5, sc: 77.5, st: 72.5 },
    ],
  },
  {
    college_slug: "iim-pune",
    college_name: "IIM Pune (IIM Nagpur — Pune Campus)",
    college_short: "IIM Pune",
    exam: "cat",
    stream: "mba",
    unit: "percentile",
    cutoffs: [
      { year: 2020, open: 97.0, obc: 93.0, sc: 87.0, st: 80.0 },
      { year: 2021, open: 97.2, obc: 93.2, sc: 87.2, st: 80.2 },
      { year: 2022, open: 97.5, obc: 93.5, sc: 87.5, st: 80.5 },
      { year: 2023, open: 97.7, obc: 93.7, sc: 87.7, st: 80.7 },
      { year: 2024, open: 97.9, obc: 93.9, sc: 87.9, st: 80.9 },
      { year: 2025, open: 98.0, obc: 94.0, sc: 88.0, st: 81.0 },
      { year: 2026, open: 98.1, obc: 94.1, sc: 88.1, st: 81.1 },
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────────
export const examLabels: Record<string, string> = {
  "mht-cet": "MHT-CET",
  "jee":     "JEE Main",
  "neet":    "NEET UG",
  "snap":    "SNAP",
  "cat":     "CAT",
}

export const streamLabels: Record<string, string> = {
  "engineering": "Engineering",
  "medical":     "Medical",
  "mba":         "MBA",
}

export function getCutoff(slug: string, exam: string): CollegeCutoff | undefined {
  return cutoffsData.find((c) => c.college_slug === slug && c.exam === exam)
}

export function getCutoffsByCollege(slug: string): CollegeCutoff[] {
  return cutoffsData.filter((c) => c.college_slug === slug)
}

export function getCutoffsByExam(exam: string): CollegeCutoff[] {
  return cutoffsData.filter((c) => c.exam === exam)
}

// All unique [exam, college_slug] pairs for static params
export function getAllCutoffParams(): { exam: string; college: string }[] {
  return cutoffsData.map((c) => ({ exam: c.exam, college: c.college_slug }))
}
