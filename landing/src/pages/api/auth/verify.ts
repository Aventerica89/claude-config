import type { APIRoute } from 'astro'
import { timingSafeEqual } from 'node:crypto'

export const prerender = false

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

export const POST: APIRoute = async ({ request }) => {
  const expectedPin = import.meta.env.CODEX_PIN
  if (!expectedPin) {
    return new Response(
      JSON.stringify({ success: false, error: 'Authentication not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json()
    const { pin } = body

    if (typeof pin !== 'string' || pin.length === 0 || pin.length > 20) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid PIN' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (safeCompare(pin, expectedPin)) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid PIN' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
