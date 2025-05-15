<!-- src/pages/PaginaListaProdutos.vue -->
<template>
  <q-page padding>
    <!-- Toolbar -->
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title> Produtos 📦 </q-toolbar-title>

      <!-- filtro -->
      <q-input
        v-model="filter"
        dense
        debounce="300"
        clearable
        placeholder="Filtrar produtos..."
        filled
        class="q-ml-md"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- botão de adicionar -->
      <q-btn
        flat
        dense
        round
        icon="add"
        aria-label="Adicionar Produto"
        @click="goToCadastro"
        class="q-ml-sm"
      />
    </q-toolbar>

    <!-- grid de cards -->
    <div class="q-pa-md row q-col-gutter-md">
      <ProductCard
        v-for="prod in filteredProducts"
        :key="prod.id"
        :product="prod"
        @edit="openEditDialog(prod)"
      />

      <div v-if="filteredProducts.length === 0" class="text-center full-width q-pa-lg">
        Nenhum produto encontrado.
      </div>
    </div>

    <!-- Dialog de editar produto -->
    <EditProductDialog
      v-model="editDialog.show"
      :product="editDialog.product"
      @updated="onProductUpdated"
    />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from 'components/ProductCard.vue'

const router = useRouter()

const products = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    brand: 'Marca A',
    name: 'Produto 1',
    stock: 10,
    cost: 5.0,
    price: 8.0,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    brand: 'Marca B',
    name: 'Produto 2',
    stock: 3,
    cost: 7.5,
    price: 12.0,
  },
])

const filter = ref('')
const editDialog = ref({ show: false, product: null })

const filteredProducts = computed(() => {
  const q = filter.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(
    (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
  )
})

function goToCadastro() {
  router.push('/app/cadastro')
}

function openEditDialog(prod) {
  editDialog.value = { show: true, product: { ...prod } }
}

function onProductUpdated(updated) {
  const idx = products.value.findIndex((p) => p.id === updated.id)
  if (idx !== -1) {
    products.value.splice(idx, 1, updated)
  }
}
</script>

<style scoped></style>
