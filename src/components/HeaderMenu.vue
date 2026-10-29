
<script setup lang="ts">
import { ref } from 'vue'
import './HeaderMenu.css'
import LoginForm from './LoginForm.vue'

const menuOpen = ref(false)
const showLogin = ref(false)
const navigation = [
  { label: 'Domů', href: '#domu' },
  { label: 'Pokoje', href: '#pokoje' },
  { label: 'Restaurace', href: '#restaurace' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Kontakt', href: '#kontakt' },
]

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="hotel-header">
    <div class="header-container">
      <!-- Logo hotelu -->
      <a href="#domu" class="hotel-logo" @click="closeMenu">
        <span class="logo-symbol" aria-hidden="true">E</span>

        <span class="logo-text">
          <span class="logo-name">HOTEL ELEMENT</span>
          <span class="logo-subtitle">MÍSTO PRO VÁŠ ODPOČINEK</span>
        </span>
      </a>

      <!-- Tlačítko pro mobilní menu -->
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Otevřít nebo zavřít navigaci"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigace -->
      <nav
        class="header-navigation"
        :class="{ 'navigation-open': menuOpen }"
        aria-label="Hlavní navigace"
      >
        <a
          v-for="item in navigation"
          :key="item.href"
          :href="item.href"
          class="nav-link"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>

        <div class="header-actions">
          <button type="button" class="login-link" @click="showLogin = true; closeMenu()">
            Přihlásit se
          </button>

          <a
            href="#pokoje"
            class="reservation-button"
            @click="closeMenu"
          >
            Rezervovat pobyt
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </nav>
    </div>
  </header>
  <LoginForm v-if="showLogin" />
</template>

<style scoped>


@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .nav-link::after,
  .reservation-button {
    transition: none;
  }
}
</style>
