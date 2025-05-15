<!-- src/pages/LoginApp.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md" style="width: 300px">
          <div class="text-h5 text-center q-mb-lg">Digite seu PIN</div>

          <!-- Mostra bolinhas no lugar dos dígitos -->
          <div class="text-h3 text-center q-mb-md">
            {{ '*'.repeat(pin.length) }}
          </div>

          <!-- Nosso teclado customizado -->
          <NumericPad v-model="pin" :length="4" />

          <!-- Checkbox “Lembrar-me” -->
          <div class="q-mt-sm row items-center justify-center">
            <q-checkbox v-model="rememberMe" label="Lembrar-me neste dispositivo" dense />
          </div>

          <!-- Botão Entrar -->
          <q-btn class="full-width q-mt-md" label="Entrar" color="primary" @click="submit" />

          <!-- Mensagem de erro -->
          <div v-if="error" class="text-negative text-center q-mt-sm">
            {{ error }}
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NumericPad from 'components/NumericPad.vue'

// Firebase
import { db } from 'boot/firebase'
import { doc, getDoc } from 'firebase/firestore'

const pin = ref('')
const rememberMe = ref(false)
const error = ref('')
const router = useRouter()

async function submit() {
  error.value = ''

  // Certifica-se de que foram digitados 4 dígitos
  if (pin.value.length < 4) {
    error.value = 'Digite os 4 dígitos'
    return
  }

  try {
    // Busca o PIN correto no Firestore em /config/login
    const cfgRef = doc(db, 'config', 'login')
    const cfgSnap = await getDoc(cfgRef)

    if (!cfgSnap.exists()) {
      error.value = 'Não foi possível carregar configuração'
      return
    }

    const correctPIN = cfgSnap.data().pin

    if (pin.value === correctPIN) {
      // Escolhe onde armazenar a autenticação
      const storage = rememberMe.value ? localStorage : sessionStorage
      storage.setItem('authenticated', 'true')

      // Redireciona para a home do app
      router.replace('/app/home')
    } else {
      error.value = 'PIN incorreto'
      pin.value = ''
    }
  } catch (err) {
    console.error(err)
    error.value = 'Erro ao validar PIN'
  }
}
</script>

<style scoped>
/* Ajustes de estilo para o teclado ou container, se necessário */
</style>
