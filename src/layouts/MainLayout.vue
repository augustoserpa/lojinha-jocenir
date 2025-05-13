<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Lojinha da Jocenir </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Container principal de páginas -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// logout automático por inatividade (15 minutos)
let timeoutID
const INACTIVITY_LIMIT = 15 * 60 * 1000

function resetTimer() {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    localStorage.removeItem('authenticated')
    sessionStorage.removeItem('authenticated')
    router.replace('/login')
  }, INACTIVITY_LIMIT)
}

onMounted(() => {
  const events = ['click', 'keydown', 'touchstart']
  events.forEach((evt) => window.addEventListener(evt, resetTimer))
  resetTimer()
})

onBeforeUnmount(() => {
  const events = ['click', 'keydown', 'touchstart']
  events.forEach((evt) => window.removeEventListener(evt, resetTimer))
  clearTimeout(timeoutID)
})
</script>

<style scoped>
/* estilos do layout, se quiser customizar */
</style>
