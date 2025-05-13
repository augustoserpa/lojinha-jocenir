<!-- src/components/NumericPad.vue -->
<template>
  <div class="numeric-pad q-pa-md">
    <div class="row q-col-gutter-sm q-mb-sm">
      <q-btn v-for="n in [1, 2, 3]" :key="n" flat round :label="n" @click="press(n)" class="col" />
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <q-btn v-for="n in [4, 5, 6]" :key="n" flat round :label="n" @click="press(n)" class="col" />
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <q-btn v-for="n in [7, 8, 9]" :key="n" flat round :label="n" @click="press(n)" class="col" />
    </div>
    <div class="row q-col-gutter-sm">
      <q-btn flat round icon="backspace" @click="backspace" class="col" />
      <q-btn flat round label="0" @click="press(0)" class="col" />
      <q-btn flat round label="C" @click="clear" class="col" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 4,
  },
})
const emit = defineEmits(['update:modelValue'])

function press(n) {
  if (props.modelValue.length < props.length) {
    emit('update:modelValue', props.modelValue + String(n))
  }
}

function backspace() {
  emit('update:modelValue', props.modelValue.slice(0, -1))
}

function clear() {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.numeric-pad .row {
  justify-content: center;
}
</style>
