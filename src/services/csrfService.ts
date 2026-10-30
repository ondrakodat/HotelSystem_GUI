export async function getCsrfToken(): Promise<string> {
  const response = await fetch ('http://localhost:8080/api/auth/csrf', {
    method : 'GET',
    credentials: 'include'
  })
  if(!response.ok){
    console.log("Response : " + response.status)
  }

  const csrf = document.cookie
                  .split(';')
                  .find(cookie => cookie.trim().startsWith('XSRF-TOKEN='))

  if(!csrf)
    throw new Error('CSRF token not found in cookies')

  return decodeURIComponent(csrf.substring('XSRF-TOKEN='.length))

}