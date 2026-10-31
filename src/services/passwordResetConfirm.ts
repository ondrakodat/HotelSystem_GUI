import { getCsrfToken } from './csrfService';


export async function confirmPasswordReset(passwordResetConfirmDto : {
    code : string
    email : string 
    password : string 
}){
    const csrfToken = await getCsrfToken();
    const response =await fetch('http://localhost:8080/api/auth/resetPassword/confirmReset', {
           method : 'POST',
           headers : {
                'Content-Type' : 'application/JSON',
                'X-XSRF-TOKEN': csrfToken
           },
           credentials : 'include',
           body : JSON.stringify(passwordResetConfirmDto)
    })
    if(!response.ok){
       throw new Error("Nepodařilo se obnovit heslo.")
    }
    return response;
}