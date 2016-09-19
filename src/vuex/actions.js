import Vue from 'vue'
import Vuex from 'vuex'
import {SET_USERINFO,DELETE_USER_INFO,SET_MSGS} from './mutation_types'

Vue.use(Vuex);
export const setError = ({dispatch}, error) => {
      dispatch('SET_ERROR', error)
}
export const showError = ({dispatch}) => {
      dispatch('SET_ERROR_VISIBLE', true)
}
export const hideError = ({dispatch}) => {
      dispatch('SET_ERROR_VISIBLE', false)
}

/*
function doLogin(username, password){
    return username=='root' && password=='root' ||
        username=='test' && password=='test'
}
*/

export const login_action = ({dispatch},type,user) => {
    console.log('arguments',arguments);
    console.log('user',user);
    if (user.username && user.token) {
        dispatch(SET_USERINFO, user)
    }else{
        dispatch(DELETE_USER_INFO)
        dispatch(SET_MSGS, ["login invalid"])
    }
}
