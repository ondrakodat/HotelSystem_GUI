import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

async function mountLoginForm(path = '/login') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/login', component: LoginForm },
      { path: '/register', component: { template: '<div />' } },
      { path: '/resetPassword', component: { template: '<div />' } },
    ],
  })
  await router.push(path)
  await router.isReady()

  return mount(LoginForm, {
    global: {
      plugins: [router],
      stubs: {
        AuthShell: { template: '<main><slot /></main>' },
      },
    },
  })
}

describe('LoginForm', () => {
  it('offers Google OAuth login through the backend authorization endpoint', async () => {
    const wrapper = await mountLoginForm()
    const googleLogin = wrapper.get('.auth-google')

    expect(googleLogin.text()).toContain('Pokračovat přes Google')
    expect(googleLogin.attributes('href')).toBe('/oauth2/authorization/google')
  })

  it('shows a helpful message after an unsuccessful Google login', async () => {
    const wrapper = await mountLoginForm('/login?googleError=true')

    expect(wrapper.get('[role="alert"]').text()).toContain(
      'Přihlášení přes Google se nezdařilo',
    )
  })
})
