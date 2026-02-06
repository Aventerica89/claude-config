import type { APIRoute } from 'astro'
import {
  registries,
  categories,
  getAllComponents,
  generateInstallCommands,
  type RegistryComponentWithRegistry,
} from '@/lib/registries'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  const registryFilter = url.searchParams.get('registry')
  const categoryFilter = url.searchParams.get('category')
  const search = url.searchParams.get('q')?.toLowerCase()

  let components = getAllComponents()

  if (registryFilter) {
    const filterIds = registryFilter.split(',')
    components = components.filter((c) => filterIds.includes(c.registry))
  }

  if (categoryFilter) {
    const filterCats = categoryFilter.split(',')
    components = components.filter((c) => filterCats.includes(c.category))
  }

  if (search) {
    components = components.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.category.toLowerCase().includes(search)
    )
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        components,
        registries: registries.map(({ components: _, ...r }) => r),
        categories,
        total: components.length,
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { componentIds } = body as { componentIds: string[] }

  if (!componentIds?.length) {
    return new Response(
      JSON.stringify({ success: false, error: 'No components selected' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const allComponents = getAllComponents()
  const selected = allComponents.filter((c) =>
    componentIds.includes(c.id)
  ) as RegistryComponentWithRegistry[]

  if (!selected.length) {
    return new Response(
      JSON.stringify({ success: false, error: 'No matching components found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const commands = generateInstallCommands(selected)

  const totalSize = selected.reduce(
    (sum, c) => sum + parseFloat(c.bundleSize || '0'),
    0
  )

  const deps = [...new Set(selected.flatMap((c) => c.dependencies))]

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        selected,
        commands,
        totalSize: `${totalSize.toFixed(1)} KB`,
        dependencies: deps,
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
