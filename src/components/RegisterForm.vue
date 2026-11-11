
<script setup lang="ts">
import { ref } from 'vue'
import { registerPerson } from '../services/authService'
import './auth.css'

const username = ref('')
const surname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

async function register() {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Zadaná hesla se neshodují.'
    return
  }

  isSubmitting.value = true

  const registerDto = {
    firstname: username.value,
    lastname: surname.value,
    email: email.value,
    hashedSecret: password.value,
    phone: phone.value
  }

  try {
    const response = await registerPerson(registerDto)
    console.log(response.status)
    successMessage.value = 'Registrace proběhla úspěšně.'
  } catch (error) {
     console.error('Registration failed:', error);

    if (error instanceof Error) {
        errorMessage.value = error.message;
    } else {
        errorMessage.value = 'Nastala neočekávaná chyba.';
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <div class="auth-wrapper">
      <h1 class="auth-title">Registrace</h1>

      <form @submit.prevent="register">
        <div class="auth-field">
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder=" "
            autocomplete="given-name"
            required
          />
          <label for="username">Jméno</label>
        </div>

        <div class="auth-field">
          <input
            id="surname"
            v-model="surname"
            type="text"
            placeholder=" "
            autocomplete="family-name"
            required
          />
          <label for="surname">Příjmení</label>
        </div>

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
            id="phone"
            v-model="phone"
            type="tel"
            placeholder=" "
            autocomplete="tel"
            required
          />
          <label for="phone">Telefon</label>
        </div>

        <div class="auth-field">
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder=" "
            autocomplete="new-password"
            required
          />
          <label for="password">Heslo</label>
        </div>

        <div class="auth-field">
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder=" "
            autocomplete="new-password"
            required
          />
          <label for="confirmPassword">Potvrzení hesla</label>
        </div>

        <p v-if="errorMessage" class="auth-error" role="alert">
          {{ errorMessage }}
        </p>

        <p v-if="successMessage" class="auth-success" role="status">
          {{ successMessage }}
        </p>

        <button
          class="auth-submit"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Registrace probíhá…' : 'Registrovat se' }}
        </button>

        <p class="auth-signup">
          Už máš účet?
         <RouterLink to="/login"> Přihlásit se </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
