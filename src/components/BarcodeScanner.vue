<template>
  <div class="barcode-scanner column items-center q-gutter-sm">
    <!-- Câmera para leitura do código de barras -->
    <video ref="video" autoplay playsinline class="full-width" />

    <!-- Exibe mensagem de erro, se houver -->
    <div v-if="error" class="text-negative">{{ error }}</div>

    <!-- Caso não haja erro, exibe instrução -->
    <div v-else class="text-caption text-grey-7">Aguardando leitura do código...</div>

    <!-- Entrada manual do código de barras -->
    <q-input
      v-model="manualCode"
      label="Ou digite o código de barras"
      @keyup.enter="emitManualCode"
      filled
      dense
    />
  </div>
</template>

<script setup>
// Importa funções e biblioteca
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'

// Define a propriedade esperada: função a ser chamada quando um código é detectado
const props = defineProps({
  onDetected: {
    type: Function,
    required: true,
  },
})

// Referências para elementos e estados
const video = ref(null)
const error = ref('')
const found = ref(false)
const manualCode = ref('')
let codeReader

// Inicia a câmera e leitura ao montar o componente
onMounted(async () => {
  try {
    codeReader = new BrowserMultiFormatReader()
    const devices = await codeReader.listVideoInputDevices()
    const deviceId = devices[devices.length - 1]?.deviceId

    if (!deviceId) {
      error.value = 'Nenhuma câmera disponível.'
      return
    }

    await codeReader.decodeFromVideoDevice(deviceId, video.value, (result, err) => {
      if (found.value) return // evita múltiplas leituras

      if (result) {
        found.value = true
        props.onDetected(result.getText())
        codeReader.reset()
        stopCamera()
      }

      if (err && err.name !== 'NotFoundException') {
        error.value = err.message
      }
    })
  } catch (err) {
    console.error(err)
    error.value = 'Não foi possível acessar a câmera.'
  }
})

// Encerra a câmera ao desmontar o componente
onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset()
  }
  stopCamera()
})

// Função para encerrar o uso da câmera
function stopCamera() {
  const stream = video.value?.srcObject
  if (stream) {
    stream.getTracks().forEach((t) => t.stop())
  }
}

// Emite o código digitado manualmente
function emitManualCode() {
  if (manualCode.value.trim()) {
    props.onDetected(manualCode.value.trim())
    manualCode.value = ''
  }
}
</script>

<style scoped>
video {
  border-radius: 4px;
  max-height: 300px;
}
</style>
