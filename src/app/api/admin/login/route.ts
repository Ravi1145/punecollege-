import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true, key: process.env.ADMIN_PASSWORD })
  }
  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
}
