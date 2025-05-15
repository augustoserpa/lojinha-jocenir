<template>
  <q-page class="q-pa-md column q-gutter-y-md">
    <div class="text-h5">New Product Entry</div>

    <!-- Entrada do código de barras -->
    <div class="row items-center q-col-gutter-sm">
      <q-input
        v-model="barcode"
        label="Código de Barras"
        filled
        class="col"
        @blur="validateBarcode"
        :error="barcodeError"
        :error-message="barcodeErrorMessage"
      />
      <q-btn icon="photo_camera" color="primary" @click="scanBarcode" />
    </div>

    <q-btn
      label="Buscar por Código de Barras"
      icon="search"
      color="primary"
      @click="lookupProduct"
      :disable="!barcode || barcodeError"
    />

    <q-separator />

    <!-- Formulário de cadastro de produto -->
    <div class="q-gutter-y-sm">
      <q-input v-model="form.name" label="Nome do Produto" filled />
      <q-select
        v-model="form.brand"
        :options="suggestedBrands"
        use-input
        fill-input
        new-value-mode="add"
        label="Marca"
        filled
      />
      <q-select
        v-model="form.type"
        :options="suggestedTypes"
        use-input
        fill-input
        new-value-mode="add"
        label="Tipo de Produto"
        filled
      />
      <q-select
        v-model="form.packaging"
        :options="suggestedPackaging"
        use-input
        fill-input
        new-value-mode="add"
        label="Tipo de Embalagem"
        filled
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

      <!-- Placeholder para imagem -->
      <q-banner class="bg-grey-2 text-grey-8">Espaço reservado para upload de imagem</q-banner>
    </div>

    <q-btn label="Salvar Produto" color="primary" @click="saveProduct" class="q-mt-md" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const barcode = ref('')
const barcodeError = ref(false)
const barcodeErrorMessage = ref('')

function validateBarcode() {
  if (!barcode.value.match(/^\d{13}$/)) {
    barcodeError.value = true
    barcodeErrorMessage.value = 'O código precisa ter exatamente 13 dígitos.'
  } else if (!isValidEAN13(barcode.value)) {
    barcodeError.value = true
    barcodeErrorMessage.value = 'Código inválido (dígito verificador incorreto).'
  } else {
    barcodeError.value = false
    barcodeErrorMessage.value = ''
  }
}

function isValidEAN13(code) {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3)
  }
  const checkDigit = (10 - (sum % 10)) % 10
  return checkDigit === parseInt(code[12])
}

function scanBarcode() {
  console.log('Chamar scanner de câmera aqui')
  // Aqui futuramente vamos integrar BarcodeScanner.vue como modal ou componente flutuante
}

function lookupProduct() {
  console.log('Buscar por código:', barcode.value)
  // Aqui futuramente vamos buscar no IndexedDB ou Firebase
}

function saveProduct() {
  console.log('Salvar produto:', form.value)
}

const form = ref({
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

const suggestedBrands = ref(['Dove', 'Nivea', 'Colgate'])
const suggestedTypes = ref(['Shampoo', 'Sabonete', 'Kit Higiene'])
const suggestedPackaging = ref(['Frasco', 'Pote', 'Bisnaga'])
</script>
