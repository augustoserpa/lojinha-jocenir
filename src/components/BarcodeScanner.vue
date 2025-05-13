<template>
  <div class="barcode-scanner">
    <video ref="video" class="full-width" />
    <div v-if="error" class="text-negative q-mt-sm">{{ error }}</div>
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
let codeReader

onMounted(() => {
  codeReader = new BrowserMultiFormatReader()
  codeReader
    .listVideoInputDevices()
    .then((devices) => {
      // escolhe a câmera traseira (última da lista)
      const deviceId = devices[devices.length - 1].deviceId
      return codeReader.decodeFromVideoDevice(deviceId, video.value, (result, err) => {
        if (result) {
          props.onDetected(result.getText())
          codeReader.reset()
        }
        if (err && !(err.name === 'NotFoundException')) {
          // ignora “no barcode found” e mostra outros erros
          error.value = err.message
        }
      })
    })
    .catch((err) => {
      console.error(err)
      error.value = 'Não foi possível acessar a câmera'
    })
})

onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset()
  }
})
</script>

<style scoped>
video {
  border-radius: 4px;
  max-height: 300px;
}
</style>
