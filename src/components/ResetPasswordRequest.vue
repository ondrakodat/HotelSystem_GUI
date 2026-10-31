<script setup lang="ts">
import {ref} from 'vue'
import { RouterLink } from 'vue-router'
import {useRouter} from 'vue-router'
import { resetPasswordRequest } from '@/services/passwordReset';
const email = ref('')
const message = ref('')
const router = useRouter()
async function resetPassword(){
    const passwordResetRequestDto = {
        email: email.value
    }

    try{
        const response = await resetPasswordRequest(passwordResetRequestDto)
        console.log(response)
        message.value = "Pokud email existuje obdrzite kod pro obnoveni"
        router.push({
          path: '/resetPasswordConfirm',
          query : {email : email.value}
        })
        console.log('Aktuální URL:', window.location.href)
        console.log('Aktuální route:', router.currentRoute.value.fullPath)
    }catch(error){
        message.value = "Kod pro obnoveni nelze vytvorit "
        console.error(error)
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
        Zadejte e-mailovou adresu, kterou používáte
        pro přihlášení. Zašleme vám kód pro obnovení hesla.
      </p>

      <form @submit.prevent="resetPassword">
        <div class="auth-field">
          <input
            v-model = "email"
            type="email"
            id="email"
            placeholder=" "
            autocomplete="email"
            required
          />
          <label for="email">E-mailová adresa</label>
        </div>

         <p v-if="message" role="status">
          {{ message }}
        </p>


        <button type="submit" class="auth-submit">
          Odeslat obnovovací kód
        </button>
      </form>

      <p class="auth-signup">
        Vzpomněli jste si na heslo?
        <RouterLink to="/login">Přihlásit se</RouterLink>
      </p>

    </section>
  </main>
</template>
