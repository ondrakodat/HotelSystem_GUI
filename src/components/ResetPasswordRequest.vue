<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { resetPasswordRequest } from '@/services/passwordReset'
import AuthShell from './AuthShell.vue'

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
        message.value = 'Pokud účet existuje, odešleme na něj obnovovací kód.'
        await router.push({
          path: '/resetPasswordConfirm',
          query : {email : email.value}
        })
    }catch(error){
        message.value = 'Obnovovací kód se nepodařilo vytvořit.'
        console.error(error)
    }
}
</script>

<template>
  <AuthShell
    eyebrow="Přístup k účtu"
    title="Obnovit heslo"
    description="Zadejte e-mail používaný k přihlášení. Zašleme vám kód pro nastavení nového hesla."
    image="/images/Sauny/Sauna_Ritual1.jpg"
    visual-title="Někdy stačí začít znovu."
    visual-text="Bezpečně vás provedeme obnovením přístupu k vašemu účtu."
  >
      <form class="auth-form" @submit.prevent="resetPassword">
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

        <p v-if="message" class="auth-message" role="status">
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
  </AuthShell>
</template>
