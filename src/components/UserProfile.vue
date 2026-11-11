<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { loadUserProfile } from '../services/loadUserProfile'

const email = ref('') ?? ":)"
const firstname = ref('') ?? ":)"
const lastName = ref('') ?? ":)"
const loading = ref(true)

async function loadProfile() {
  try {
    const profile = await loadUserProfile()
    console.log('PROFILE DATA:', profile)
    email.value = profile.email
    firstname.value = profile.firstname
    lastName.value = profile.lastname
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
  <main class="auth-page profile-page">
    <div class="auth-wrapper profile-wrapper">

      <div v-if="loading" class="profile-loading">
        <div class="profile-spinner"></div>
        Načítání profilu...
      </div>

      <div v-else class="profile-content">

        <!-- Hlavička profilu -->
        <div class="profile-header">

          <div class="profile-avatar">
            {{ firstname.charAt(0) }}{{ lastName.charAt(0) }}
          </div>

          <h1 class="profile-name">
            {{ firstname }} {{ lastName }}
          </h1>

          <p class="profile-subtitle">
            Osobní účet
          </p>

        </div>

        <!-- Informace o uživateli -->
        <div class="profile-details">

          <h3 class="profile-section-title">
            Osobní informace
          </h3>

          <div class="profile-detail">
            <div class="profile-detail-icon">👤</div>
            <div class="profile-detail-text">
              <span class="profile-label">Jméno</span>
              <span class="profile-value">{{ firstname }}</span>
            </div>
          </div>

          <div class="profile-detail">
            <div class="profile-detail-icon">👤</div>
            <div class="profile-detail-text">
              <span class="profile-label">Příjmení</span>
              <span class="profile-value">{{ lastName }}</span>
            </div>
          </div>

          <div class="profile-detail">
            <div class="profile-detail-icon">✉</div>
            <div class="profile-detail-text">
              <span class="profile-label">E-mailová adresa</span>
              <span class="profile-value">{{ email }}</span>
            </div>
          </div>

        </div>

        <!-- Odhlášení -->
        <button
          class="profile-logout"
          type="button"
        >
          Odhlásit se
        </button>

      </div>
    </div>
  </main>
</template>

<style scoped>

.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  padding: 30px 20px;
}

.profile-wrapper {
  width: 100%;
  max-width: 480px;
  padding: 35px;
  background: #ffffff;
  border: 1px solid #eee5df;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(80, 45, 25, 0.09);
}

/* Hlavička */

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 35px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background: linear-gradient(135deg, #a36a48, #6e3c21);
  color: white;

  font-size: 32px;
  font-weight: 700;
  letter-spacing: 2px;

  box-shadow: 0 6px 18px rgba(110, 60, 33, 0.25);
  margin-bottom: 18px;
}

.profile-name {
  color: #6e3c21;
  font-size: 27px;
  margin: 0;
  font-weight: 700;
}

.profile-subtitle {
  color: #999;
  font-size: 14px;
  margin-top: 8px;
}

/* Informace */

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-section-title {
  color: #6e3c21;
  font-size: 17px;
  margin-bottom: 8px;
}

.profile-detail {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 14px;
  background: #faf7f4;
  border: 1px solid #f0e8e2;
  border-radius: 12px;

  transition: 0.2s ease;
}

.profile-detail:hover {
  background: #f5eee8;
  transform: translateY(-2px);
}

.profile-detail-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #eee1d7;
  border-radius: 10px;
  font-size: 18px;
}

.profile-detail-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.profile-label {
  color: #999;
  font-size: 12px;
}

.profile-value {
  color: #453126;
  font-size: 15px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

/* Odhlášení */

.profile-logout {
  width: 100%;
  margin-top: 30px;
  padding: 14px;

  background: #915d3f;
  color: white;

  border: none;
  border-radius: 12px;

  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  transition: 0.25s ease;
}

.profile-logout:hover {
  background: #6e3c21;
  box-shadow: 0 5px 15px rgba(110, 60, 33, 0.2);
  transform: translateY(-2px);
}

.profile-logout:active {
  transform: scale(0.98);
}

/* Načítání */

.profile-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 35px;
  color: #915d3f;
}

.profile-spinner {
  width: 35px;
  height: 35px;
  border: 4px solid #eee1d7;
  border-top-color: #915d3f;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Mobil */

@media (max-width: 500px) {
  .profile-wrapper {
    padding: 25px 18px;
  }

  .profile-name {
    font-size: 23px;
  }
}

</style>
