<template>
  <q-dialog v-model="dialog">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Editar Produto</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="local.name" label="Nome" />
        <q-input v-model="local.brand" label="Marca" />
        <q-input v-model.number="local.stock" type="number" label="Estoque" />
        <q-input v-model.number="local.cost" type="number" label="Custo (R$)" />
        <q-input v-model.number="local.price" type="number" label="Preço de Venda (R$)" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="dialog = false" />
        <q-btn flat label="Atualizar" color="primary" @click="update" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  product: Object,
})
const emit = defineEmits(['update:modelValue', 'updated'])

// proxy para v-model do diálogo
const dialog = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})

// cópia local para edição
const local = ref({})

watch(
  () => props.product,
  (p) => {
    if (p) {
      local.value = { ...p }
    }
  },
)

function update() {
  emit('updated', { ...local.value })
  dialog.value = false
}
</script>
