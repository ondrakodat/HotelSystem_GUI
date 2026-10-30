
<script setup lang="ts">
import { ref } from 'vue'
import { loginPerson } from '../services/authService'
import './auth.css'
import { RouterLink } from 'vue-router'



const email = ref('')
const secret = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)

async function Login() {
  errorMessage.value = ''
  isSubmitting.value = true

  const AuthDto = {
    email: email.value,
    password: secret.value
  }

  try {
    const response = await loginPerson(AuthDto)
    console.log('Přihlášení proběhlo úspěšně', response)
  } catch (error) {
    console.error('Chyba při přihlášení:', error)
    errorMessage.value = 'Přihlášení se nezdařilo. Zkontroluj své údaje.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-wrapper">
      <h1 class="auth-title">Přihlášení</h1>

      <form @submit.prevent="Login">
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
        
        <p class="auth-signup">
         <RouterLink to="/reset">Zapomněli jste heslo?</RouterLink>
        </p>
        <p class="auth-signup">
          Nemáš účet?
         <RouterLink to="/register"> Registrovat </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
