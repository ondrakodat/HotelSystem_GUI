import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { logoutPerson } from '../services/authService'
import { clearCsrfToken } from '../services/csrfService'
import { useAuthStore } from '../stores/authStores'

describe('logoutPerson', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    clearCsrfToken()
    document.cookie = 'frontend-marker=present; Path=/'
    document.cookie = 'XSRF-TOKEN=logout-csrf-token; Path=/'
    vi.restoreAllMocks()
  })

  it('loads a fresh CSRF token before logout and clears local authentication', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('{}', { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))

    const authStore = useAuthStore()
    authStore.login('guest@example.test')

    await logoutPerson()

    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/auth/csrf', {
      method: 'GET',
      credentials: 'include',
    })

    const [, logoutOptions] = fetchMock.mock.calls[1]!
    const logoutHeaders = new Headers(logoutOptions?.headers)

    expect(fetchMock.mock.calls[1]?.[0]).toBe('/api/auth/logout')
    expect(logoutOptions?.method).toBe('POST')
    expect(logoutOptions?.credentials).toBe('include')
    expect(logoutHeaders.get('X-XSRF-TOKEN')).toBe('logout-csrf-token')
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.email).toBeNull()
  })
})
