export async function testLoginIn(){
  const response = await fetch('http://localhost:8080/api/person/test', {
    method : 'GET',
    credentials: 'include'
  })
    const data = await response.text()

    console.log("Data : ", data)
    console.log("Response : " + response.status)

    return data
}
