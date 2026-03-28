"use client"
import dynamic from "next/dynamic"

const ExitIntentPopup = dynamic(() => import("./ExitIntentPopup"), { ssr: false })
const WhatsAppCTA = dynamic(() => import("./WhatsAppCTA"), { ssr: false })

export default function LeadWidgets() {
  return (
    <>
      <ExitIntentPopup />
      <WhatsAppCTA />
    </>
  )
}
