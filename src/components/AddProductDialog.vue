<!-- src/components/AddProductDialog.vue -->
<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Adicionar Produto</div>
      </q-card-section>

      <q-card-section>
        <q-tabs v-model="tab" dense>
          <q-tab name="barcode" label="Código de Barras" icon="barcode" />
          <q-tab name="qr" label="QR Code" icon="qr_code" />
          <q-tab name="manual" label="Manual" icon="edit" />
        </q-tabs>

        <q-separator />

        <!-- Aba Código de Barras -->
        <div v-if="tab === 'barcode'">
          <!-- Escolha de método -->
          <div class="row q-col-gutter-sm q-mb-md">
            <q-btn
              flat
              outline
              :color="modeBarcode === 'camera' ? 'primary' : undefined"
              label="Usar Câmera"
              icon="camera_alt"
              @click="modeBarcode = 'camera'"
            />
            <q-btn
              flat
              outline
              :color="modeBarcode === 'input' ? 'primary' : undefined"
              label="Digitar Código"
              icon="keyboard"
              @click="modeBarcode = 'input'"
            />
          </div>

          <!-- Scanner de Câmera -->
          <div v-if="modeBarcode === 'camera'" class="q-mb-md">
            <BarcodeScanner @onDetected="onDetected" />
          </div>

          <!-- Input manual do código -->
          <div v-else-if="modeBarcode === 'input'" class="q-mb-md">
            <q-input
              v-model="barcodeInput"
              label="Digite o código de barras"
              placeholder="Ex: 3560070791460"
              clearable
            />
          </div>

          <!-- Botão de buscar dados -->
          <q-btn
            label="Buscar dados"
            icon="search"
            @click="lookupByBarcode"
            :loading="loading"
            :disable="!barcodeInput"
            class="q-mt-md"
          />

          <div v-if="apiError" class="text-negative q-mt-sm">
            {{ apiError }}
          </div>
        </div>

        <!-- Aba QR Code -->
        <div v-else-if="tab === 'qr'">
          <p>A implementar: scanner de QR Code</p>
        </div>

        <!-- Aba Manual -->
        <div v-else>
          <q-input v-model="form.name" label="Nome" />
          <q-input v-model="form.brand" label="Marca" />
          <q-input v-model.number="form.stock" type="number" label="Estoque" />
          <q-input v-model.number="form.cost" type="number" label="Custo (R$)" />
          <q-input v-model.number="form.price" type="number" label="Preço de Venda (R$)" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="dialog = false" />
        <q-btn flat label="Salvar" color="primary" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import BarcodeScanner from './BarcodeScanner.vue'
import { lookupOBF } from '../services/openBeautyFactsService'

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'added'])

// proxy para v-model do diálogo
const dialog = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

// abas e modos
const tab = ref('manual')
// modo interno para aba barcode: 'none' | 'camera' | 'input'
const modeBarcode = ref('none')

const form = ref({
  id: null,
  name: '',
  brand: '',
  stock: 0,
  cost: 0,
  price: 0,
  imageUrl: '',
  description: '',
})
const barcodeInput = ref('')
const loading = ref(false)
const apiError = ref('')

// reset de estado ao abrir/fechar diálogo
watch(
  () => dialog.value,
  (opened) => {
    if (opened) {
      tab.value = 'manual'
      modeBarcode.value = 'none'
      form.value = {
        id: Date.now(),
        name: '',
        brand: '',
        stock: 0,
        cost: 0,
        price: 0,
        imageUrl: '',
        description: '',
      }
      barcodeInput.value = ''
      apiError.value = ''
      loading.value = false
    }
  },
)

// recebe código lido pela câmera
function onDetected(code) {
  barcodeInput.value = code
  modeBarcode.value = 'input'
}

async function lookupByBarcode() {
  apiError.value = ''
  loading.value = true

  try {
    const prod = await lookupOBF(barcodeInput.value)

    if (!prod) {
      apiError.value = 'Produto não encontrado no Open Beauty Facts'
    } else {
      form.value.name = prod.product_name || ''
      form.value.brand = prod.brands?.split(',')[0] || ''
      form.value.imageUrl = prod.images?.small || ''
      form.value.description = prod.ingredients_text || ''
      // estoque, cost e price continuam para preenchimento manual
    }
  } catch (err) {
    console.error(err)
    apiError.value = 'Erro ao consultar o OBF'
  } finally {
    loading.value = false
  }
}

function save() {
  emit('added', { ...form.value })
  dialog.value = false
}
</script>

<style scoped>
/* ajustes de estilo, se desejar */
</style>
