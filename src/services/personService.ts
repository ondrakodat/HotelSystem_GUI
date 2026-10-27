import {token, setToken } from './auth'

export async function registerPerson(registerDto: {
  username: string
  lastname: string
  email: string
  hashedSecret: string
  phone: string
}) {
  const response = await fetch('http://localhost:8080/api/person/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerDto)
  })

  return response
}


export async function loginPerson(AuthDto: {
  email: string
  password: string
}){
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AuthDto)
  })
  console.log("Response : " + response.status)
  const data: {token : string } = await response.json()
  console.log("Data : ", data.token)

  if (!response.ok) {
  throw new Error('Přihlášení se nezdařilo')
  }

  setToken(data.token)
  return data.token
}

export async function goText(){
  const response = await fetch('http://localhost:8080/api/person/test', {
    method : 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }})
    const data = await response.text

    console.log("Data : ", data)
    console.log("Response : " + response.status)

    return data
}
