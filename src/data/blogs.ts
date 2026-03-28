import { BlogPost } from "@/types"

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "best-btech-colleges-pune-2025",
    title: "Top 10 Best BTech Colleges in Pune 2025: Rankings, Fees & Placements",
    excerpt: "Planning to pursue B.Tech in Pune? Here's our comprehensive ranking of the top 10 engineering colleges in Pune for 2025, with detailed fee structures, placement statistics, and admission criteria.",
    body: "Pune is home to some of India's finest engineering colleges, ranging from the historic COEP (established 1854) to modern institutions like MIT-WPU. When choosing a B.Tech college in Pune, consider factors like NAAC grade, NIRF ranking, placement records, fee structure, and specialization offerings. COEP Pune consistently tops the ranking with NIRF Rank 49 and average placements of 12 LPA. PICT is renowned for CS placements with companies like Goldman Sachs visiting campus. VIT Pune offers strong industry connections across streams. For detailed fees comparison and admission process, read the full article.",
    author: "CollegePune Editorial",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Engineering",
    tags: ["BTech Colleges Pune", "Engineering Colleges Pune", "COEP", "PICT", "Top Colleges"],
  },
  {
    id: 2,
    slug: "mba-colleges-pune-fees-placements-2025",
    title: "Best MBA Colleges in Pune 2025: Complete Guide to Fees, CAT Cutoff & Placements",
    excerpt: "Comprehensive guide to MBA admissions in Pune for 2025. From top-tier SIBM to affordable options like BIMM and MIT-SOM, find the perfect B-school matching your budget, score, and career goals.",
    body: "Pune's MBA landscape offers options for every budget and aspiration. SIBM Pune (NIRF Rank 13) is the crown jewel with average placements of 28 LPA. For SNAP score below 60 percentile, MIT-SOM and BIMM are excellent alternatives. This guide covers CAT/SNAP/MAT cutoffs, fee structures, placement statistics, and admission processes for all major Pune MBA colleges. We've analyzed ROI across all colleges to help you make the best investment decision for your management career.",
    author: "MBA Expert Team",
    date: "2025-01-20",
    readTime: "10 min",
    category: "MBA",
    tags: ["MBA Colleges Pune", "SIBM Pune", "MBA Fees Pune", "MBA Placements", "CAT Cutoff"],
  },
  {
    id: 3,
    slug: "mht-cet-2025-preparation-strategy",
    title: "MHT-CET 2025: Complete Preparation Strategy, Syllabus & Top Scoring Tips",
    excerpt: "Crack MHT-CET 2025 with our expert preparation guide. Covers complete syllabus, topic-wise weightage, best books, mock test strategy, and how to maximize your percentile for top Pune engineering colleges.",
    body: "MHT-CET 2025 is scheduled for April-May 2025. The exam tests Physics, Chemistry, and Mathematics (for engineering) at Class 11 and 12 levels. For admission to COEP, the cutoff typically requires 95+ percentile. PICT requires 92+ percentile. VIT Pune and JSPM RSCOE are accessible at 75-85 percentile. Our preparation strategy focuses on NCERT mastery, previous year papers, and targeted mock tests. Key topics for PCM: Integration (24% weight), Mechanics (18%), Chemical Bonding (15%). Start with strong fundamentals, solve 3 mock tests per week from March onwards.",
    author: "Academic Expert",
    date: "2025-02-01",
    readTime: "12 min",
    category: "Exams",
    tags: ["MHT-CET 2025", "MHT-CET Preparation", "Engineering Entrance", "Pune Colleges"],
  },
  {
    id: 4,
    slug: "pune-colleges-hostel-facilities-2025",
    title: "Pune Colleges with Best Hostel Facilities 2025: Complete Guide",
    excerpt: "Looking for colleges in Pune with hostel? This guide covers hostel availability, fees, facilities, and safety at all major Pune colleges for students relocating from other states and cities.",
    body: "Finding college accommodation in Pune can be challenging. Most top Pune colleges including COEP, SIT Pune, SIBM, AFMC, and VIT Pune offer hostel facilities. Hostel fees range from Rs 50,000-1,50,000 per year depending on college type and facilities. Government college hostels (COEP, BJMC) are highly affordable at Rs 50,000-70,000. Private college hostels offer more amenities but cost Rs 80,000-1,20,000. We've compiled detailed hostel information including capacity, food, security, and amenities for 15+ Pune colleges.",
    author: "Student Life Team",
    date: "2025-02-10",
    readTime: "7 min",
    category: "Student Life",
    tags: ["Pune College Hostel", "College Accommodation Pune", "Hostel Fees Pune"],
  },
  {
    id: 5,
    slug: "neet-pune-medical-college-admission-2025",
    title: "NEET 2025 Cutoff for Pune Medical Colleges: AFMC, BJMC, DY Patil",
    excerpt: "What NEET score do you need for AFMC, BJ Medical College, and other Pune medical colleges? Get complete cutoff analysis, fee structure, seat matrix, and admission tips for medical aspirants.",
    body: "Pune is home to some of India's best medical colleges. AFMC requires 650+ NEET score and special entrance exam for their near-free MBBS program. BJ Medical College (NIRF 18) sees Government quota cutoff of 620-640 for open category. D.Y. Patil Medical College and Bharati Vidyapeeth Medical College have management quota seats available with lower cutoffs (500-550) but significantly higher fees of Rs 11-15 lakh/year. This guide provides complete NEET cutoff data, seat matrix, fee comparison, and application tips.",
    author: "Medical Admissions Expert",
    date: "2025-02-15",
    readTime: "9 min",
    category: "Medical",
    tags: ["NEET Cutoff Pune", "AFMC Admission", "Medical College Pune", "BJ Medical College"],
  },
  {
    id: 6,
    slug: "highest-paying-jobs-after-engineering-pune",
    title: "Highest Paying Jobs After Engineering in Pune 2025: Salaries & Companies",
    excerpt: "What are the highest paying career options after B.Tech from Pune colleges? Explore salary data, top recruiters, and career paths for engineering graduates in Pune's booming IT and manufacturing sectors.",
    body: "Engineering graduates from Pune's top colleges enjoy excellent salary prospects. Computer Engineering graduates from COEP, PICT, and VIT Pune are placed at Rs 6-45 LPA by companies like Goldman Sachs, Microsoft, and Infosys. Mechanical engineers are hired by Bajaj Auto, Cummins, and L&T at Rs 5-15 LPA. The highest paying roles are in product companies (Rs 15-45 LPA) and global investment banks (Rs 20-45 LPA). We analyze salary trends by company type, stream, and college for comprehensive career planning.",
    author: "Career Expert",
    date: "2025-03-01",
    readTime: "8 min",
    category: "Careers",
    tags: ["Engineering Jobs Pune", "Salary After BTech", "Top Recruiters Pune", "Engineering Placements"],
  }
]

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogs.find(b => b.slug === slug)
}

export const getFeaturedBlogs = (): BlogPost[] => {
  return blogs.slice(0, 3)
}
