<script setup lang="ts">
import './auth.css'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    image?: string
    visualTitle?: string
    visualText?: string
    wide?: boolean
  }>(),
  {
    description: '',
    image: '/images/Lobby.jpg',
    visualTitle: 'Váš pobyt začíná ještě před příjezdem.',
    visualText: 'Spravujte své údaje a připravte si pobyt v Hotelu Element.',
    wide: false,
  },
)
</script>

<template>
  <main class="auth-page">
    <aside class="auth-visual" :style="{ backgroundImage: `url('${image}')` }" aria-hidden="true">
      <div class="auth-visual-shade"></div>
      <div class="auth-visual-copy">
        <p>Hotel Element · Pardubice</p>
        <h2>{{ visualTitle }}</h2>
        <span>{{ visualText }}</span>
      </div>
    </aside>

    <section class="auth-panel">
      <div class="auth-wrapper" :class="{ 'auth-wrapper--wide': wide }">
        <RouterLink to="/" class="auth-back">Zpět na hotel</RouterLink>

        <header class="auth-heading">
          <p class="auth-eyebrow">{{ eyebrow }}</p>
          <h1 class="auth-title">{{ title }}</h1>
          <p v-if="description" class="auth-description">{{ description }}</p>
        </header>

        <slot />
      </div>

      <p class="auth-copyright">© 2026 Hotel Element</p>
    </section>
  </main>
</template>
