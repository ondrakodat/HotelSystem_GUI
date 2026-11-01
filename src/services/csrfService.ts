export let csrfToken : string | null = null;

export async function getCsrfToken(): Promise<string> {
  const response = await fetch ('http://localhost:8080/api/auth/csrf', {
    method : 'GET',
    credentials: 'include'
  })
  if(!response.ok){
    console.log("Response : " + response.status)
    throw new Error(`Failed to get CSRF token: ${response.status}`);
  }

  const csrf = document.cookie
                  .split(';')
                  .find(cookie => cookie.trim().startsWith('XSRF-TOKEN='))

  if(!csrf)
    throw new Error('CSRF token not found in cookies')

  csrfToken = decodeURIComponent(csrf.substring('XSRF-TOKEN='.length))


  return csrfToken;


}