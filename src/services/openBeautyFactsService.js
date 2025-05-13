// src/services/openBeautyFactsService.js

/**
 * Consulta o Open Beauty Facts para um dado código de barras (EAN/UPC).
 * @param {string} barcode
 * @returns {Promise<Object|null>} Dados do produto ou null se não encontrado.
 */
export async function lookupOBF(barcode) {
  const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`OBF retornou status ${res.status}`)
      return null
    }
    const json = await res.json()
    if (json.status !== 1 || !json.product) {
      return null
    }
    // retornamos só o objeto product
    return json.product
  } catch (err) {
    console.error('Erro ao chamar OBF:', err)
    return null
  }
}

// Sniffer para facilitar testes via console
if (typeof window !== 'undefined') {
  window.lookupOBF = lookupOBF
}
