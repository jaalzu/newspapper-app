export async function fetchNews(apiUrl) {
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Error ${res.status}: ${text}`)
    }

    const data = await res.json()
    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error('Formato inválido de artículos')
    }

    return data.articles
  } catch (err) {
    throw new Error(err.message || 'Error desconocido')
  }
}
