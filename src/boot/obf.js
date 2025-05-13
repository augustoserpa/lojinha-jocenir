// src/boot/obf.js
import { lookupOBF } from 'src/services/openBeautyFactsService'

// só em ambiente browser
if (typeof window !== 'undefined') {
  window.lookupOBF = lookupOBF
}
