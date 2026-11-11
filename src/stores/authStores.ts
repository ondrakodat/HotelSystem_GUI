import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAuthStore = defineStore('auth', () => {

     const isAuthenticated = ref<boolean | null>(null)
     const email = ref<string | null>(null)
    
    function login(userEmail: string) {
        isAuthenticated.value = true
        email.value = userEmail
    }

    function logout() {
        isAuthenticated.value = false
        email.value = null
    }

    return {
        isAuthenticated,
        email,
        login,
        logout
    }    
    
})