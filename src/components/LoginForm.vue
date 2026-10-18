<script setup lang="ts">
import { ref } from 'vue'
import {loginPerson} from '../services/personService'

const email = ref('')
const secret = ref('')

async function Login(){
    const AuthDto = {
        email: email.value,
        hashedSecret: secret.value
    }

    const response = loginPerson(AuthDto)

}

</script>

<template>
    <form submit.prevent="Login">
        <h1>Login Form</h1>
        <label for=""> Enter email </label> <br>
        <input type="email" v-model="email" id="email"/><br>
        <label for=""> Enter password </label> <br>
        <input type="password" v-model="secret" id="secret" /><br>
        <button type="submit">  Login </button>
    </form>

</template>