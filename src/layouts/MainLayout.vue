<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Cabeçalho com nome do app e logout -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Lojinha da Jocenir</q-toolbar-title>
        <q-btn flat dense icon="logout" @click="logout" label="Sair" />
      </q-toolbar>
      <q-banner v-if="showWelcome" class="bg-yellow-2 text-black text-center">
        Bem-vinda à melhor lojinha do universo!
      </q-banner>
    </q-header>

    <!-- Container principal -->
    <q-page-container>
      <router-view @navigated="handleNavigation" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showWelcome = ref(false)

function checkWelcomeMessage() {
  const visited = sessionStorage.getItem('hasVisited')
  showWelcome.value = !visited && route.name === 'home'
  if (route.name === 'home') {
    sessionStorage.setItem('hasVisited', 'true')
  }
}

watch(
  () => route.name,
  () => {
    checkWelcomeMessage()
  },
)

function logout() {
  sessionStorage.removeItem('hasVisited')
  localStorage.removeItem('authenticated')
  router.replace('/login')
}

checkWelcomeMessage()
</script>

<style scoped></style>
