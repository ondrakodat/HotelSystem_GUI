export let csrfToken : string | null = null;

export function clearCsrfToken(): void {
  csrfToken = null
}

export async function getCsrfToken(): Promise<string> {
  const response = await fetch ('/api/auth/csrf', {
    method : 'GET',
    credentials: 'include'
  })
  if(!response.ok){
    console.log("Response : " + response.status)
    throw new Error(`Failed to get CSRF token: ${response.status}`);
  }

  const csrf = document.cookie
                  .split(';')
                  .map(cookie => cookie.trim())
                  .find(cookie => cookie.startsWith('XSRF-TOKEN='))

  if(!csrf)
    throw new Error('CSRF token not found in cookies')

  csrfToken = decodeURIComponent(csrf.substring('XSRF-TOKEN='.length))


  return csrfToken;


}
