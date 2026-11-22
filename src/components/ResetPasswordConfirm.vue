<script setup lang="ts">
import { confirmPasswordReset } from '@/services/passwordResetConfirm'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AuthShell from './AuthShell.vue'

const route = useRoute()
const email = ref(String(route.query.email ?? ''))
const code = ref('')
const password = ref('')
const message = ref('')
const messageType = ref<'error' | 'success'>('error')
const confirmPassword = ref('')

async function confirmReset () {
    if (password.value !== confirmPassword.value) {
        messageType.value = 'error'
        message.value = 'Zadaná hesla se neshodují.'
        return
    }

    const passwordResetConfirmDto = {
        code : code.value,
        email : email.value,
        password : password.value
    }
    try{
        await confirmPasswordReset(passwordResetConfirmDto);
        messageType.value = 'success'
        message.value = 'Heslo bylo úspěšně změněno.'
    } catch {
        messageType.value = 'error'
        message.value = 'Heslo se nepodařilo změnit. Zkontrolujte kód a zkuste to znovu.'
    }
}



</script>
<template>
  <AuthShell
    eyebrow="Poslední krok"
    title="Nové heslo"
    description="Zadejte šestimístný ověřovací kód z e-mailu a nastavte si nové heslo."
    image="/images/Bazen/Bazen_Venkovni.jpg"
    visual-title="Zpátky ke klidnějším plánům."
    visual-text="Po ověření kódu budete mít ke svému účtu znovu plný přístup."
  >
      <form class="auth-form" @submit.prevent="confirmReset">

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

        <p
          v-if="message"
          :class="messageType === 'success' ? 'auth-success' : 'auth-error'"
          role="status"
        >
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
  </AuthShell>
</template>
