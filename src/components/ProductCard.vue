<template>
  <q-card class="col-12 col-sm-6 col-md-4">
    <q-img :src="product.image" style="height: 150px" />

    <q-card-section>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-caption">{{ product.brand }}</div>

      <div class="row justify-between q-mt-sm">
        <div>Estoque: {{ product.stock }}</div>
        <div>Venda: R$ {{ product.price.toFixed(2) }}</div>
      </div>

      <q-toggle v-model="showCost" label="Mostrar custo" dense class="q-mt-sm" />

      <div v-if="showCost" class="text-caption">Custo: R$ {{ product.cost.toFixed(2) }}</div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat dense icon="edit" @click="$emit('edit')" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

// Destruturação para usar 'product' diretamente
const { product } = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const showCost = ref(false)
</script>
