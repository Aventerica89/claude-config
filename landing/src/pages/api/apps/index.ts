import type { APIRoute } from 'astro'

export const prerender = false

const APPS_API = 'https://apps.jbcloud.app/api'

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(`${APPS_API}/apps`)
    if (!response.ok) {
      throw new Error(`Apps API responded with ${response.status}`)
    }
    const data = await response.json()

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Apps API error'
    return new Response(
      JSON.stringify({ success: false, error: message, data: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
