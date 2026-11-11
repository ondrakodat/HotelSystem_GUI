import { apiFetch } from "./apifetchWithCsrfService";


export async function loadUserProfile() {
    const response = await apiFetch('/person/profile', {
        method: 'GET',
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error("Nepodařilo se načíst profil uživatele.");
    }

    return await response.json();

}