import Vue from 'vue'
import Vuex from 'vuex'
import {SET_USERINFO,DELETE_USER_INFO,SET_MSGS} from './mutation_types'
import {getUser} from "../auth"

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

export const hideElement = () =>{
//$(document).ready(function(){
    //$(".foroption").hide();
    var user = getUser();
    console.info("sidebar ready", user, $(".foroption").size());
    if (user == undefined || user.username == undefined || user.username == ""){
    }else if(user.username == "root"){
        //$(".forroot").show();
        $(".notroot").hide();
        console.info("sidebar ready", user.username, $(".forroot").size());
    }else {
        //$(".foruser").show();
        $(".notuser").hide();
        console.info("sidebar ready", user.username, $(".foruser").size());
    }
}//);
