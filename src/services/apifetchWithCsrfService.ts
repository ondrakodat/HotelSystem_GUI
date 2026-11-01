import { csrfToken, getCsrfToken } from './csrfService';
const API_URL = 'http://localhost:8080/api';

export async function apiFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {

    const headers = new Headers(options.headers)
    const method = (options.method ?? 'GET').toUpperCase()



    if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) {
        if(!csrfToken) {
            await getCsrfToken()
        }

        if (!csrfToken) {
        throw new Error('CSRF token ještě nebyl načten')
        }

        headers.set('X-XSRF-TOKEN', csrfToken)
    }


return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include'
}) 
    
}