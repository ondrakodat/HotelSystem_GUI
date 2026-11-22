
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStores'
import { loadUserProfile } from './services/loadUserProfile'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

async function restoreAuthentication() {
  const authStore = useAuthStore(pinia)

  try {
    const profile = await loadUserProfile()
    authStore.login(profile.email)
  } catch {
    authStore.logout()
  }
}

app.mount('#app')
void restoreAuthentication()
