<script setup lang="ts">
import HeaderMenu from './components/HeaderMenu.vue';
import router from './router/index.ts';
import {createPinia} from 'pinia';

</script>

<template>
  <HeaderMenu />
    <RouterView />
</template>

<style scoped>
</style>