// src/boot/obf.js
import { lookupProduct } from 'src/services/openFoodFactsService'

// só em ambiente browser
if (typeof window !== 'undefined') {
  window.lookupOBF = lookupProduct
}
