<!-- src/components/AddProductDialog.vue -->
<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-card-section>
        <div class="text-h6">Adicionar Produto</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md">
        <q-tabs v-model="tab" dense align="justify">
          <q-tab name="barcode" label="Código de Barras" icon="barcode" />
          <q-tab name="qr" label="QR Code" icon="qr_code" />
          <q-tab name="manual" label="Manual" icon="edit" />
        </q-tabs>

        <q-separator />

        <!-- Código de Barras -->
        <div v-if="tab === 'barcode'" class="q-gutter-y-md">
          <div class="row q-col-gutter-sm">
            <q-btn
              unelevated
              :color="modeBarcode === 'camera' ? 'primary' : 'grey-5'"
              label="Usar Câmera"
              icon="camera_alt"
              class="col"
              @click="modeBarcode = 'camera'"
            />
            <q-btn
              unelevated
              :color="modeBarcode === 'input' ? 'primary' : 'grey-5'"
              label="Digitar Código"
              icon="keyboard"
              class="col"
              @click="modeBarcode = 'input'"
            />
          </div>

          <div v-if="modeBarcode === 'camera'">
            <BarcodeScanner @onDetected="onDetected" />
          </div>

          <div v-else-if="modeBarcode === 'input'">
            <q-input
              v-model="barcodeInput"
              label="Digite o código de barras"
              placeholder="Ex: 3560070791460"
              clearable
              filled
            />
          </div>

          <q-btn
            label="Buscar dados"
            icon="search"
            @click="lookupByBarcode"
            :loading="loading"
            :disable="!barcodeInput"
            color="primary"
            class="full-width"
          />

          <div v-if="apiError" class="text-negative">
            {{ apiError }}
          </div>
        </div>

        <!-- QR Code -->
        <div v-else-if="tab === 'qr'">
          <q-banner dense class="bg-grey-3 text-grey-9">
            A funcionalidade de QR Code ainda será implementada.
          </q-banner>
        </div>

        <!-- Manual -->
        <div v-else class="q-gutter-y-sm">
          <q-input v-model="form.name" label="Nome" filled />
          <q-input v-model="form.brand" label="Marca" filled />
          <q-input v-model.number="form.stock" type="number" label="Estoque" filled />
          <q-input v-model.number="form.cost" type="number" label="Custo (R$)" filled />
          <q-input v-model.number="form.price" type="number" label="Preço de Venda (R$)" filled />
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
import { lookupProduct } from '../services/openFoodFactsService'

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
    const prod = await lookupProduct(barcodeInput.value)

    console.log('PRODUTO ENCONTRADO: ', prod)

    if (!prod) {
      apiError.value = 'Produto não encontrado no Open Beauty Facts'
    } else {
      form.value.name = prod.product_name || ''
      form.value.brand = prod.brands?.split(',')[0] || ''
      form.value.imageUrl = prod.images?.small || ''
      form.value.description = prod.ingredients_text || ''
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
