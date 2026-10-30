<script lang="ts">
import {ref} from 'vue'
import { resetPasswordRequest } from '@/services/passwordReset';
const email = ref('')
const message = ref('')
async function resetPassword(){
    const passwordResetRequestDto = {
        email: email.value
    }

    try{
        const response = await resetPasswordRequest(passwordResetRequestDto)
        console.log(response)
        message.value = "Pokud email existuje obdrzite kod pro obnoveni"
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

      <form>
        <div class="auth-field">
          <input
            type="email"
            id="email"
            placeholder=" "
          />
          <label for="email">E-mailová adresa</label>
        </div>

        <button type="submit" class="auth-submit">
          Odeslat obnovovací kód
        </button>
      </form>

      <p class="auth-signup">
        Vzpomněli jste si na heslo?
        <a href="/login">Přihlásit se</a>
      </p>

    </section>
  </main>
</template>
