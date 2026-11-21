
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import './HeaderMenu.css'
import { useAuthStore } from '../stores/authStores'

const menuOpen = ref(false)
const route = useRoute()
const navigation = [
  { label: 'Domů', href: '/#domu' },
  { label: 'Pokoje', href: '/#pokoje' },
  { label: 'Gastronomie', href: '/#restaurace' },
  { label: 'Wellness', href: '/#wellness' },
  { label: 'Kontakt', href: '/#kontakt' },
]
const authStore = useAuthStore()
const isHome = computed(() => route.path === '/')

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="hotel-header" :class="{ 'hotel-header--home': isHome, 'menu-is-open': menuOpen }">
    <div class="header-container">
      <RouterLink to="/" class="hotel-logo" @click="closeMenu">
        <span class="logo-symbol" aria-hidden="true"></span>
        <span class="logo-name">ELEMENT</span>
      </RouterLink>

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

      <nav
        class="header-navigation"
        :class="{ 'navigation-open': menuOpen }"
        aria-label="Hlavní navigace"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="nav-link"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>

        <div class="header-actions">
          <RouterLink
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="login-link"
            @click="closeMenu"
          >
            Přihlášení
          </RouterLink>

          <RouterLink
            v-else
            to="/profile"
            class="login-link"
            @click="closeMenu"
          >
            Můj profil
          </RouterLink>

          <RouterLink
            to="/#pokoje"
            class="reservation-button"
            @click="closeMenu"
          >
            Rezervovat pobyt
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
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
