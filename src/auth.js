const AUTH_TOKEN = 'auth_token';
export const saveToken = (value) => {
    typeof(value) == 'string' && localStorage.setItem(AUTH_TOKEN,value)
}

export const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN)
}

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN)
}

export const getAuthHeader = () => {
    return {
        'Authorization': 'request ' + localStorage.getItem(AUTH_TOKEN)
    }
}