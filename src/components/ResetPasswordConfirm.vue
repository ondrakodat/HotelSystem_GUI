<script setup lang="ts">
import {confirmPasswordReset} from '@/services/passwordResetConfirm'
import {ref} from 'vue'
import { useRoute } from 'vue-router'
import './Auth.css'

const route = useRoute()
const email = ref(String(route.query.email ?? ''))
const code = ref('')
const password = ref('')
const message = ref('')
const confirmPassword = ref('')

async function confirmReset () {
    if (password.value !== confirmPassword.value) {
        message.value = "Zadaná hesla se neshodují!"
        return
    }

    const passwordResetConfirmDto = {
        code : code.value,
        email : email.value,
        password : password.value
    }
    try{
        await confirmPasswordReset(passwordResetConfirmDto);
        message.value = "Password reset was succesfull"
    }catch(error){
        message.value = "Password reset wasnt sucesfull!"
    }
}



</script>
<template>
  <main class="auth-page">
    <section class="auth-wrapper">

      <h1 class="auth-title">
        Obnovení hesla
      </h1>

      <p class="auth-description">
        Zadejte ověřovací kód, který jsme vám zaslali na email,
        a nastavte si nové heslo.
      </p>

      <form @submit.prevent="confirmReset">

        <!-- Email -->
        <div class="auth-field">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder=" "
            readonly
            required
          />
          <label for="email">E-mailová adresa</label>
        </div>

        <!-- Verification code -->
        <div class="auth-field">
          <input
            id="code"
            type="text"
            v-model="code"
            placeholder=" "
            maxlength="6"
            minlength="6"
            pattern="[0-9]{6}"
            inputmode="numeric"
            autocomplete="one-time-code"
            required
          />
          <label for="code">Šestimístný ověřovací kód</label>
        </div>

        <!-- New password -->
        <div class="auth-field">
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder=" "
            required
            autocomplete="new-password"
          />
          <label for="password">Nové heslo</label>
        </div>

        <!-- Confirm password -->
        <div class="auth-field">
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder=" "
            required
            autocomplete="new-password"
          />
          <label for="confirmPassword">Potvrzení nového hesla</label>
        </div>

        <p v-if="message" class="auth-error" role="status">
          {{ message }}
        </p>

        <button type="submit" class="auth-submit">
          Potvrdit nové heslo
        </button>

      </form>

      <p class="auth-signup">
        Vzpomněli jste si na heslo?
        <RouterLink to="/login">Přihlásit se</RouterLink>
      </p>

    </section>
  </main>
</template>