/**
 * Backend API client for CollegePune
 * Connects the Next.js frontend to the Node.js backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export interface BackendCollege {
  _id: string;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  location: string;
  city: string;
  stream: string;
  type: string;
  naac?: string;
  nirfRank?: number;
  rating: number;
  feesMin?: number;
  feesMax?: number;
  avgPlacement: number;
  highestPackage: number;
  image?: string;
  heroImage?: string;
  website?: string;
  phone?: string;
  email?: string;
  highlights: string[];
  entranceExams: string[];
  isFeatured: boolean;
  isActive: boolean;
}

export interface BackendInquiry {
  name: string;
  email: string;
  phone: string;
  course?: string;
  college?: string;
  message?: string;
  source?: string;
}

/** Fetch all active colleges from backend (with optional filters) */
export async function fetchBackendColleges(params?: {
  stream?: string;
  type?: string;
  search?: string;
  all?: boolean;
}): Promise<BackendCollege[]> {
  try {
    const qs = new URLSearchParams();
    if (params?.stream) qs.set("stream", params.stream);
    if (params?.type) qs.set("type", params.type);
    if (params?.search) qs.set("search", params.search);
    if (params?.all) qs.set("all", "true");

    const res = await fetch(`${BACKEND_URL}/colleges?${qs.toString()}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.colleges || [];
  } catch {
    return [];
  }
}

/** Fetch single college by slug */
export async function fetchBackendCollege(slug: string): Promise<BackendCollege | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/colleges/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.college || null;
  } catch {
    return null;
  }
}

/** Submit a student inquiry / lead */
export async function submitInquiry(data: BackendInquiry): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: json.success, message: json.message };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}

/** Check if backend is available */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BACKEND_URL.replace("/api", "")}/api/health`, {
      next: { revalidate: 60 },
    });
    return res.ok;
  } catch {
    return false;
  }
}
