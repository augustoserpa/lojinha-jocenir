<!-- src/pages/Produtos.vue -->
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
        @click="openAddDialog"
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

    <!-- Dialogs de adicionar/editar -->
    <AddProductDialog v-model="addDialogOpen" @added="onProductAdded" />

    <EditProductDialog
      v-model="editDialog.show"
      :product="editDialog.product"
      @updated="onProductUpdated"
    />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from 'components/ProductCard.vue'
import AddProductDialog from 'components/AddProductDialog.vue'
import EditProductDialog from 'components/EditProductDialog.vue'

// --- estado local
const products = ref([
  // Exemplo inicial; mais tarde você busca do Firestore
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

// controla dialogs
const addDialogOpen = ref(false)
const editDialog = ref({ show: false, product: null })

// 1) lista filtrada
const filteredProducts = computed(() => {
  const q = filter.value.trim().toLowerCase()
  if (!q) return products.value
  return products.value.filter(
    (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
  )
})

// 2) abrir diálogo de adicionar
function openAddDialog() {
  addDialogOpen.value = true
}

// 3) callback quando um novo produto é adicionado
function onProductAdded(newProd) {
  products.value.push(newProd)
}

// 4) abrir diálogo de editar
function openEditDialog(prod) {
  editDialog.value = { show: true, product: { ...prod } }
}

// 5) callback quando um produto foi editado
function onProductUpdated(updated) {
  const idx = products.value.findIndex((p) => p.id === updated.id)
  if (idx !== -1) {
    products.value.splice(idx, 1, updated)
  }
}
</script>

<style scoped>
/* ajuste de responsividade ou margens */
</style>
