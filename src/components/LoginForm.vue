
<script setup lang="ts">
import { ref } from 'vue'
import { loginPerson } from '../services/authService'
import { useRoute, useRouter } from 'vue-router'
import AuthShell from './AuthShell.vue'

const email = ref('')
const secret = ref('')
const rememberMe = ref(false)
const route = useRoute()
const errorMessage = ref(
  route.query.googleError === 'true'
    ? 'Přihlášení přes Google se nezdařilo. Zkuste to prosím znovu.'
    : ''
)
const isSubmitting = ref(false)
const router = useRouter()

async function Login() {
  errorMessage.value = ''
  isSubmitting.value = true

  const AuthDto = {
    email: email.value,
    password: secret.value,
    rememberMe: rememberMe.value
  }

  try {
    const response = await loginPerson(AuthDto)
    console.log('Přihlášení proběhlo úspěšně', response)
    await router.push({ path: '/' })
  } catch (error) {
    console.error('Chyba při přihlášení:', error)
    errorMessage.value = 'Přihlášení se nezdařilo. '
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <AuthShell
    eyebrow="Vítejte zpět"
    title="Přihlášení"
    description="Přihlaste se a mějte své údaje i budoucí pobyty na jednom místě."
    image="/images/Lobby.jpg"
    visual-title="Váš klid začíná už tady."
    visual-text="Přihlaste se do osobního prostoru Hotelu Element."
  >
      <form class="auth-form" @submit.prevent="Login">
        <div class="auth-field">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=" "
            autocomplete="email"
            required
          />
          <label for="email">E-mail</label>
        </div>

        <div class="auth-field">
          <input
            id="password"
            v-model="secret"
            type="password"
            placeholder=" "
            autocomplete="current-password"
            required
          />
          <label for="password">Heslo</label>
        </div>

        <div class="auth-options">
          <label class="remember-option" for="rememberMe">
            <input
              id="rememberMe"
              v-model="rememberMe"
              type="checkbox"
            />
            <span>Zapamatovat</span>
          </label>
        </div>

        <p v-if="errorMessage" class="auth-error" role="alert">
          {{ errorMessage }}
        </p>

        <button
          class="auth-submit"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Přihlašování…' : 'Přihlásit se' }}
        </button>

        <div class="auth-divider" aria-hidden="true">
          <span>nebo</span>
        </div>

        <a
          class="auth-google"
          href="/oauth2/authorization/google"
        >
          <span class="auth-google-mark" aria-hidden="true">G</span>
          Pokračovat přes Google
        </a>

        <p class="auth-signup">
          <RouterLink to="/resetPassword">Zapomněli jste heslo?</RouterLink>
        </p>
        <p class="auth-signup">
          Ještě nemáte účet?
          <RouterLink to="/register">Vytvořit účet</RouterLink>
        </p>
      </form>
  </AuthShell>
</template>
