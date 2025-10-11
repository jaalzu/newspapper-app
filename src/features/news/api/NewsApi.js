export async function fetchNews(apiUrl) {
  try {
    if (!apiUrl || typeof apiUrl !== 'string') {
      throw new Error('URL inválida para fetchNews')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s

    const response = await fetch(apiUrl, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} al llamar a ${apiUrl}`)
    }

    const data = await response.json()

    if (!data || !Array.isArray(data.articles)) {
      throw new Error(`Respuesta inválida de ${apiUrl}: no contiene articles`)
    }

    return new Response(JSON.stringify({ articles: data.articles }), { status: 200 });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`La solicitud a ${apiUrl} tardó demasiado tiempo`)
    }

    if (error instanceof TypeError) {
      throw new Error(`Error de conexión de red al acceder a ${apiUrl}`)
    }

    // Cualquier otro error lo pasamos como string claro
    throw new Error(error.message || 'Error desconocido al obtener noticias')
  }
}
