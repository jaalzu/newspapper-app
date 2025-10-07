export async function fetchNews(apiUrl) {
  try {
    // Validación de entrada
    if (!apiUrl || typeof apiUrl !== 'string') {
      throw new Error('URL inválida')
    }

    // Timeout para evitar esperas infinitas
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos

    const response = await fetch(apiUrl, {
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    // Manejo de diferentes códigos de error
    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`
      throw new Error(errorMessage)
    }

    const data = await response.json();
    console.log(data)

    // Validación de la respuesta
    if (!data || !Array.isArray(data.articles)) {
      throw new Error('Formato de respuesta inválido')
    }

    return data.articles

  } catch (error) {
    // Manejo específico de errores
    if (error.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado tiempo')
    }
    
    if (error instanceof TypeError) {
      throw new Error('Error de conexión de red')
    }

    // Re-lanzar el error para que el caller lo maneje
    throw error
  }
}