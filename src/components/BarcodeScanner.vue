<template>
  <div class="barcode-scanner column items-center q-gutter-sm">
    <video ref="video" autoplay playsinline class="full-width" />
    <div v-if="error" class="text-negative">{{ error }}</div>
    <div v-else class="text-caption text-grey-7">Aguardando leitura do código...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'

const props = defineProps({
  onDetected: {
    type: Function,
    required: true,
  },
})

const video = ref(null)
const error = ref('')
const found = ref(false)
let codeReader

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
      if (found.value) return
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
    error.value = 'Não foi possível acessar a câmera'
  }
})

onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset()
  }
  stopCamera()
})

function stopCamera() {
  const stream = video.value?.srcObject
  if (stream) {
    stream.getTracks().forEach((t) => t.stop())
  }
}
</script>

<style scoped>
video {
  border-radius: 4px;
  max-height: 300px;
}
</style>
