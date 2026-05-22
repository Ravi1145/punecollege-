import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT  || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendLeadEmail(data: Record<string, unknown>): Promise<void> {
  const to = process.env.LEAD_EMAIL || process.env.SMTP_USER
  if (!to) return

  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:600;color:#555;white-space:nowrap">${k.replace(/_/g, ' ')}</td><td style="padding:4px 8px">${v}</td></tr>`)
    .join('')

  await transporter.sendMail({
    from:    `"CollegePune Leads" <${process.env.SMTP_USER}>`,
    to,
    subject: `🎓 New Lead — ${data.name ?? 'Unknown'} (${data.source ?? 'site'})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="background:#0A1628;color:#fff;padding:16px;margin:0;border-radius:8px 8px 0 0">
          New Lead from CollegePune
        </h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
          ${rows}
        </table>
        <p style="color:#999;font-size:12px;margin-top:12px">Sent from collegepune.com</p>
      </div>
    `,
  })
}
