<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadUserProfile } from '../services/loadUserProfile'
import { logoutPerson } from '../services/authService'
import AuthShell from './AuthShell.vue'

const email = ref('')
const firstname = ref('')
const lastName = ref('')
const loading = ref(true)
const loggingOut = ref(false)
const router = useRouter()

async function handleLogout() {
  loggingOut.value = true

  try {
    await logoutPerson()
    await router.push({ path: '/' })
  } finally {
    loggingOut.value = false
  }
}

async function loadProfile() {
  try {
    const profile = await loadUserProfile()
    email.value = profile.email
    firstname.value = profile.firstname
    lastName.value = profile.lastname
  } catch (error) {
    console.error('Chyba při načítání profilu:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadProfile)
</script>

<template>
  <AuthShell
    eyebrow="Váš prostor"
    title="Osobní účet"
    description="Kontaktní údaje spojené s vaším účtem Hotelu Element."
    image="/images/Apartma/Restaurace_Panorama.jpg"
    visual-title="Element, připravený pro vás."
    visual-text="Váš osobní prostor pro klidnější plánování budoucích pobytů."
    wide
  >
    <div v-if="loading" class="profile-loading" role="status">
      <div class="profile-spinner" aria-hidden="true"></div>
      Načítání profilu…
    </div>

    <div v-else class="profile-content">
      <div class="profile-header">
        <div class="profile-avatar" aria-hidden="true">
          {{ firstname.charAt(0) }}{{ lastName.charAt(0) }}
        </div>

        <h2 class="profile-name">{{ firstname }} {{ lastName }}</h2>
        <p class="profile-subtitle">Host Hotelu Element</p>
      </div>

      <div class="profile-details">
        <h3 class="profile-section-title">Osobní informace</h3>

        <div class="profile-detail">
          <div class="profile-detail-text">
            <span class="profile-label">Jméno</span>
            <span class="profile-value">{{ firstname }}</span>
          </div>
        </div>

        <div class="profile-detail">
          <div class="profile-detail-text">
            <span class="profile-label">Příjmení</span>
            <span class="profile-value">{{ lastName }}</span>
          </div>
        </div>

        <div class="profile-detail">
          <div class="profile-detail-text">
            <span class="profile-label">E-mailová adresa</span>
            <span class="profile-value">{{ email }}</span>
          </div>
        </div>

        <button
          class="profile-logout"
          type="button"
          :disabled="loggingOut"
          @click="handleLogout"
        >
          {{ loggingOut ? 'Odhlašování…' : 'Odhlásit se' }}
        </button>
      </div>
    </div>
  </AuthShell>
</template>
