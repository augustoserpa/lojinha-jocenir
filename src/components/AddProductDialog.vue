<!-- src/components/AddProductDialog.vue -->
<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-card-section>
        <div class="text-h6">Adicionar Produto</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-md">
        <!-- Entrada do código de barras -->
        <div class="q-gutter-y-sm">
          <div class="text-subtitle2">Identificação do Produto</div>

          <div class="row q-col-gutter-sm">
            <q-btn
              unelevated
              color="primary"
              label="Escanear com Câmera"
              icon="photo_camera"
              class="col"
              @click="modoBarra = 'camera'"
            />
            <q-btn
              unelevated
              color="primary"
              label="Digitar Código"
              icon="keyboard"
              class="col"
              @click="modoBarra = 'manual'"
            />
          </div>

          <div v-if="modoBarra === 'camera'">
            <!-- Componente de leitura de código -->
            <BarcodeScanner @onDetected="onDetected" />
          </div>

          <div v-else-if="modoBarra === 'manual'">
            <q-input
              v-model="barcodeInput"
              label="Digite o código de barras"
              placeholder="Ex: 7891234567890"
              clearable
              filled
            />
          </div>

          <q-btn
            label="Buscar Produto"
            icon="search"
            @click="lookupByBarcode"
            :loading="loading"
            :disable="!barcodeInput"
            color="primary"
            class="full-width"
          />

          <div v-if="apiError" class="text-negative">{{ apiError }}</div>
        </div>

        <!-- Campos do produto -->
        <div class="q-gutter-y-sm">
          <q-input v-model="form.name" label="Nome do Produto" filled />

          <!-- Sugestão: usar valores com autocomplete + valores anteriores -->
          <q-select
            v-model="form.brand"
            :options="suggestedBrands"
            use-input
            fill-input
            label="Marca"
            filled
            new-value-mode="add"
          />

          <q-select
            v-model="form.type"
            :options="suggestedTypes"
            use-input
            fill-input
            label="Tipo de Produto"
            filled
            new-value-mode="add"
          />

          <!-- Aqui também pode-se usar sugestões pré-definidas + aprendidas -->
          <q-select
            v-model="form.packaging"
            :options="suggestedPackaging"
            use-input
            fill-input
            label="Tipo de Embalagem"
            filled
            new-value-mode="add"
          />

          <q-input v-model.number="form.volume" type="number" label="Volume (ml/g)" filled />

          <q-input v-model.number="form.stock" type="number" label="Estoque Inicial" filled />
          <q-input v-model.number="form.cost" type="number" label="Preço de Custo (R$)" filled />
          <q-input v-model.number="form.price" type="number" label="Preço de Venda (R$)" filled />

          <q-input
            v-model="form.description"
            type="textarea"
            label="Descrição detalhada"
            autogrow
            filled
          />

          <!-- Adição futura: upload de imagem(s) -->
          <q-banner class="bg-grey-2 text-grey-8"
            >Espaço reservado para upload de imagem do produto</q-banner
          >
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

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'added'])

const dialog = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

const modoBarra = ref('manual')
const barcodeInput = ref('')
const apiError = ref('')
const loading = ref(false)

const form = ref({
  id: null,
  name: '',
  brand: '',
  type: '',
  packaging: '',
  volume: null,
  stock: 0,
  cost: 0,
  price: 0,
  description: '',
})

// Sugestões pré-definidas + futuras sugestões armazenadas no IndexedDB
const suggestedBrands = ref(['Nivea', 'Dove', 'Colgate'])
const suggestedTypes = ref(['Shampoo', 'Condicionador', 'Sabonete', 'Kit Higiene'])
const suggestedPackaging = ref(['Frasco', 'Pote', 'Bisnaga', 'Sachê'])

watch(
  () => dialog.value,
  (open) => {
    if (open) {
      modoBarra.value = 'manual'
      barcodeInput.value = ''
      apiError.value = ''
      loading.value = false
      form.value = {
        id: Date.now(),
        name: '',
        brand: '',
        type: '',
        packaging: '',
        volume: null,
        stock: 0,
        cost: 0,
        price: 0,
        description: '',
      }
    }
  },
)

function onDetected(code) {
  barcodeInput.value = code
  modoBarra.value = 'manual'
}

async function lookupByBarcode() {
  apiError.value = ''
  loading.value = true
  try {
    // Buscar no IndexedDB (no futuro)
    // Por enquanto, simulando como se fosse novo
    // Pode-se preencher o form com base em resultado
    console.log('Código escaneado ou digitado:', barcodeInput.value)
  } catch (err) {
    apiError.value = 'Erro ao consultar produto'
    console.error(err)
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
video {
  border-radius: 4px;
  max-height: 300px;
}
</style>
