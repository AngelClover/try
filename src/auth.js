const AUTH_TOKEN = 'auth_token';
const USER_INFO = 'user_info';
const AUTH_STRING = 'auth_string';
export const saveToken = (value) => {
    typeof(value) == 'string' && localStorage.setItem(AUTH_TOKEN,value)
}

export const saveUser = (object) => {
    typeof(object) == 'object' && localStorage.setItem(USER_INFO,JSON.stringify(object));
}

export const saveAuthString = (object) => {
    typeof(object) == 'object' && localStorage.setItem(AUTH_STRING, JSON.stringify(object));
}

export const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN)
}

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN)
}

export const getAuthString = () => {
    return localStorage.getItem(AUTH_STRING);
}

export const clearAuthString = () => {
    localStorage.removeItem(AUTH_STRING);
}

export const getUser = () => {
    var userStr = localStorage.getItem(USER_INFO);
    var userObj = {};
    try {
        userObj = JSON.parse(userStr);
    } catch(error) {
        console.log(error + '用户名解析失败');
    }

    return userObj;
}



export const getAuthHeader = () => {
    return {
        'Authorization': 'Basic ' + localStorage.getItem(AUTH_TOKEN)
    }
}
