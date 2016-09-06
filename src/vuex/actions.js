export const setError = ({dispatch}, error) => {
      dispatch('SET_ERROR', error)
}
export const showError = ({dispatch}) => {
      dispatch('SET_ERROR_VISIBLE', true)
}
export const hideError = ({dispatch}) => {
      dispatch('SET_ERROR_VISIBLE', false)
}

function doLogin(username, password){
    return username=='root' && password=='root' ||
        username=='test' && password=='test'
}

export const login = ({dispatch}, username, password) => {
    if (username && password) {
        doLogin(username, password).done(res => {
            dispatch('SET_USERNAME', res.username)
                dispatch('SET_LOGGED_IN', true)
                //dispatch('SET_USER_INFO', res)
        }).fail(error => {
            dispatch('SET_INVALID_LOGIN')
                setError({dispatch}, error)
                showError({dispatch})
        })
    }
}
