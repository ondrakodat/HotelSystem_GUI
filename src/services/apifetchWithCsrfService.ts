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


const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include'
}) 

if(!response.ok){
    const errorTest = await response.text()

    let error = "Nastala neočekávaná chyba."

     try {
            const parsedError = JSON.parse(errorTest);

            if (typeof parsedError === 'string') {
                error = parsedError;
            } else {
                error = Object.values(parsedError).join(', ');
            }
        } catch {
            error = errorTest || error;
        }

        throw new Error(error);
    }
    return response
}