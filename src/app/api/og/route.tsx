import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title   = searchParams.get("title")   || "Best Colleges in Pune 2026"
  const sub     = searchParams.get("sub")     || "Rankings · Fees · Placements · AI-Powered"
  const category = searchParams.get("category") || ""

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 60%, #0d2744 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orange accent line top */}
        <div style={{ display: "flex", height: "6px", background: "linear-gradient(90deg, #f97316, #ea580c)", width: "100%" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "56px 64px", justifyContent: "space-between" }}>

          {/* Top row: logo + category badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                display: "flex",
                width: "48px", height: "48px",
                background: "#f97316",
                borderRadius: "12px",
                alignItems: "center", justifyContent: "center",
                fontSize: "22px", fontWeight: 800, color: "white",
              }}>C</div>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
                CollegePune
              </span>
            </div>
            {category && (
              <div style={{
                display: "flex",
                background: "rgba(249,115,22,0.2)",
                border: "1px solid rgba(249,115,22,0.4)",
                borderRadius: "999px",
                padding: "6px 16px",
                fontSize: "14px", fontWeight: 600, color: "#fb923c",
              }}>{category}</div>
            )}
          </div>

          {/* Main title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              fontSize: title.length > 50 ? "42px" : "52px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}>{title}</div>
            <div style={{ fontSize: "22px", color: "#94a3b8", fontWeight: 500 }}>{sub}</div>
          </div>

          {/* Bottom stats bar */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {[
              { label: "Colleges Listed", value: "103+" },
              { label: "Avg Placement", value: "₹8.2 LPA" },
              { label: "NIRF Ranked", value: "28+" },
              { label: "Free AI Counselling", value: "✓" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "24px", fontWeight: 800, color: "#f97316" }}>{value}</span>
                <span style={{ fontSize: "13px", color: "#64748b" }}>{label}</span>
              </div>
            ))}

            {/* URL badge */}
            <div style={{
              display: "flex",
              marginLeft: "auto",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px", color: "#94a3b8",
            }}>collegepune.com</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
