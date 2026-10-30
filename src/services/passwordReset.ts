import { getCsrfToken } from './csrfService';

export async function resetPasswordRequest(PasswordResetRequestDto : {
    email : string
}) {
    const csrfToken = await getCsrfToken();
    const response = await fetch('http://localhost:8080/api/auth/resetPassword/requestForReset',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        credentials : 'include',
        body: JSON.stringify(PasswordResetRequestDto)
    })
    if(!response.ok){
        throw new Error("Nepodarilo se prihlasit");
    }
}