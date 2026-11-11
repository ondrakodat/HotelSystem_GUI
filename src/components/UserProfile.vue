<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { loadUserProfile } from '../services/loadUserProfile'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const loading = ref(true)

async function loadProfile() {
  try {
    const profile = await loadUserProfile()
    email.value = profile.email
    firstName.value = profile.firstName
    lastName.value = profile.lastName
  } catch (error) {
    console.error('Chyba při načítání profilu:', error)
  }finally {
    loading.value = false
  }
}
onMounted(() => {
    loadProfile()
  })

</script>

<template>
  <main class="auth-page">
    <div class="auth-wrapper profile-wrapper">

      <h1 class="auth-title">Můj profil</h1>

      <div v-if="loading" class="profile-loading">
        Načítání profilu...
      </div>

      <div v-else class="profile-content">

        <div class="profile-avatar">
          {{ firstName.charAt(0) }}{{ lastName.charAt(0) }}
        </div>

        <h2 class="profile-name">
          {{ firstName }} {{ lastName }}
        </h2>

        <div class="profile-details">

          <div class="profile-detail">
            <span class="profile-label">Jméno</span>
            <span class="profile-value">{{ firstName }}</span>
          </div>

          <div class="profile-detail">
            <span class="profile-label">Příjmení</span>
            <span class="profile-value">{{ lastName }}</span>
          </div>

          <div class="profile-detail">
            <span class="profile-label">E-mail</span>
            <span class="profile-value">{{ email }}</span>
          </div>

        </div>

        <button
          class="auth-submit profile-logout"
          type="button"
        >
          Odhlásit se
        </button>

      </div>
    </div>
  </main>
</template>
