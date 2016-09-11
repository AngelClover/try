import Vue from 'vue'
import Vuex from 'vuex'
//import userInfo from './user_info'

const state = {
    // 保存第一页数据
    id: '',
    token: '',
    //password: '',
    name: '',
    msgs: [],
    error: 0
}
export const SET_USERINFO = 'SET_USERINFO'
export const DELETE_USER_INFO = 'DELETE_USER_INFO'
export const SET_MSGS = 'MSGS'

const mutations = {
  // 设置 token 登录名 头像
  [SET_USERINFO] (state, user) {
    try {
      state.id = user.id
      state.token = user.token
      state.name = user.username
      //state.password = user.password
    } catch (err) {
      console.log(err)
    }
  },
  [DELETE_USER_INFO] (state) {
    for (let key in state) {
      state[key] = ''
    }
  },
  [SET_MSGS] (state, list) {
    state.msgs = list
  }
}

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    /*
    modules: {
        userInfo
    },
    */
    state,
    mutations,
    strict: debug,
    middlewares: debug ? [] : []
    })
