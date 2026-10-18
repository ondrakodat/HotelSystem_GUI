<script setup lang="ts">
import { ref } from 'vue'
import { registerPerson } from '../services/personService'

const username = ref('')
const surname = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')

async function register() {
  const registerDto = {
    username: username.value,
    lastname: surname.value,
    email: email.value,
    hashedSecret: password.value,
    phone: phone.value
  }

  try {
    const response = await registerPerson(registerDto)
    console.log(response.status)
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<template>
  <h1>Registration form</h1>

  <form @submit.prevent="register">
    <label for="name">Enter name</label><br>
    <input type="text" id="name" v-model="username" /><br>

    <label for="surname">Enter surname</label><br>
    <input type="text" id="surname" v-model="surname" /><br>

    <label for="email">Enter email</label><br>
    <input type="email" id="email" v-model="email" /><br>

    <label for="phone">Enter phone</label><br>
    <input type="tel" id="phone" v-model="phone" /><br>

    <label for="password">Enter password</label><br>
    <input type="password" id="password" v-model="password" /><br>

    <button type="submit">Register</button>
  </form>
</template>

<style scoped>
</style>