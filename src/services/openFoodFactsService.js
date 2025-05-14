// src/services/openFoodFactsService.js

/**
 * Consulta o Open Food Facts para um dado código de barras (EAN/UPC).
 * @param {string} barcode
 * @returns {Promise<Object|null>} Dados do produto ou null se não encontrado.
 */
export async function lookupProduct(barcode) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json` // ✅ Usando OFF

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`OFF retornou status ${res.status}`)
      return null
    }

    const json = await res.json()
    if (json.status !== 1 || !json.product) {
      return null
    }

    return json.product
  } catch (err) {
    console.error('Erro ao chamar OFF:', err)
    return null
  }
}

// Sniffer para facilitar testes via console
if (typeof window !== 'undefined') {
  window.lookupProduct = lookupProduct
}
