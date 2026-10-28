<script setup lang="ts">
import {testLoginIn} from '../services/personService'

</script>

<template>
  <button @click="testLoginIn()">
    Otestovat přihlášení
  </button>
</template>
