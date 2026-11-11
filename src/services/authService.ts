import {apiFetch} from "./apifetchWithCsrfService"
import {getCsrfToken} from "./csrfService"
import {useAuthStore} from "../stores/authStores"
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

  const response = await apiFetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerDto)
  })

  return response
}

//credentials means we want to include cookies in our request 
export async function loginPerson(AuthDto: {
  email: string
  password: string
  rememberMe: boolean
}){
  const response = await apiFetch('/auth/login', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AuthDto)
  })
  console.log("Response : " + response.status)



  if (!response.ok) {
  throw new Error('Přihlášení se nezdařilo')
  }

  //Reseting token after secusfull login for next requests and better security
  await getCsrfToken() 

  const authStore = useAuthStore()
  authStore.login(AuthDto.email)

  return response
}

export async function logoutPerson() {
  const response = await apiFetch('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Odhlášení se nezdařilo')
  }

  const authStore = useAuthStore()
  authStore.logout()

  return response
}



    
