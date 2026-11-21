<script setup lang="ts">
import HeaderMenu from './components/HeaderMenu.vue';

</script>

<template>
  <HeaderMenu />
  <RouterView />    
</template>

<style scoped>
</style>

<style>
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  color: #171916;
  background: #f3f0e8;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  scroll-behavior: smooth;
  scroll-padding-top: 5.5rem;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid #ff704d;
  outline-offset: 4px;
}

::selection {
  color: #fff;
  background: #ff704d;
}
</style>
