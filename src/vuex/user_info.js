const state = {
    // 保存第一页数据
    id: '',
    //accessToken: '',
    password: '',
    name: '',
    invalid: '',
    msg: [],
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_USERINFO] (state, data) {
    try {
      state.id = data.id
      //state.accessToken = data.accesstoken
      state.name = data.loginname
      state.password = data.password
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

export default{
    store,
    mutations
}
