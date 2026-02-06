import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { pin } = body

  const expectedPin = import.meta.env.CODEX_PIN || '2389'

  if (pin === expectedPin) {
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ success: false, error: 'Invalid PIN' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  )
}
