import home from './com/home.vue'
import about from './com/about.vue'
//var home = require('./com/home.vue')
//var about = require('./com/about.vue')
import upload from './com/upload.vue'
import explorer from './com/explore.vue'
import docclass from './com/docclass.vue'
import viewlog from './com/viewlog.vue'
import users from './com/users.vue'
import borrow from './com/borrow.vue'
import apply from './com/apply.vue'
import approve from './com/approve.vue'
import view from './com/view.vue'
import {getToken} from './auth'

export default{
    'home': {
        component: home
    },
    'about': {
        component: about
    },
    'login': {
        name: 'login',
        title: '登录',
        component: (resolve) => require(['./com/login/login.vue'], resolve)
    },
    'upload': {
        component: upload
    },
    'explore': {
        component: explorer
    },
    'docclass': {
        component: docclass
    },
    'viewlog': {
        component: viewlog
    },
    'users': {
        component: users
    },
    'borrow': {
        component: borrow
    },
    'apply': {
        component: apply
    },
    'approve': {
        component: approve
    },
    'view': {
        component: view
    }
}
