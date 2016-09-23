const AUTH_TOKEN = 'auth_token';
const USER_INFO = 'user_info';
export const saveToken = (value) => {
    typeof(value) == 'string' && localStorage.setItem(AUTH_TOKEN,value)
}

export const saveUser = (object) => {
    typeof(object) == 'object' && localStorage.setItem(USER_INFO,JSON.stringify(object));
}

export const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN)
}

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN)
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
        'Authorization': 'request ' + localStorage.getItem(AUTH_TOKEN)
    }
}