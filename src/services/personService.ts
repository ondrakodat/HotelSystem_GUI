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
  hashedSecret: string
}){
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AuthDto)
  })
  return response

}