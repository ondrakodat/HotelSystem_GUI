import { getCsrfToken } from "./csrfService"
/**
 * Method for registration new Person in our Hotel system.
 * POST method
 * headers : application/json - we tell the server that we are sending JSON data in our request body.
 * in body we send registerDto as JSON 
 * @param registerDto 
 * @returns 
 */
// registerDto : {} represents object thats representing our dto obj in Java
// In java we would add RegisterDto dto to parameters but in ts we create new object type with values which it contains
// so the signature is (name of obj parameter { body of obj })-> which is for parameters 
// name ({}){ body of method }
// response = await fetch(url, {Method Type, headers, body})
export async function registerPerson(registerDto: {
  username: string
  lastname: string
  email: string
  hashedSecret: string
  phone: string
}) {

  const crsfToken = await getCsrfToken()

  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': crsfToken
    },
    credentials: 'include',
    body: JSON.stringify(registerDto)
  })

  return response
}

//credentials means we want to include cookies in our request 
export async function loginPerson(AuthDto: {
  email: string
  password: string
}){
  const csrfToken = await getCsrfToken()


  const response = await fetch('http://localhost:8080/api/auth/login', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': csrfToken
    },
    credentials: 'include',
    body: JSON.stringify(AuthDto)
  })
  console.log("Response : " + response.status)

  if (!response.ok) {
  throw new Error('Přihlášení se nezdařilo')
  }

    const csrfTokenNew = await getCsrfToken()
}


    
