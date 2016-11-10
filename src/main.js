//var Vue = require('vue')
//var App = require('./app.vue')
//var Router = require('vue-router')
//var routeConfig =  require('./route-config')
import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './route-config'
import resource from 'vue-resource'
import vuex from 'vuex'
import {getToken} from './auth'

//import ap from './app.vue'

Vue.config.debug=true
Vue.config.devtools = true
Vue.use(Router)
Vue.use(resource)
Vue.http.options.headers={
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
}
Vue.use(vuex)
//Vue.http.options.emulateJSON = true;

const router = new Router()

router.afterEach(function(trans){
    //trans.to.matched[0].ready()
    //this.ready()
})

router.map(routeConfig)
const app = Vue.extend(require('./app.vue'))
router.start(app, '#app')

var vue = new app();
console.log('vue',vue.$store.state.name);


router.beforeEach(function(trans){
    var token = getToken();

    console.log('token',token)
    console.log('name',trans.to.router)

    var vm = trans.to.router.app.$root;
    console.log('vm',vm.$store.state.token);    
    if ((typeof(token) == 'string' && token) || trans.to.path == '/login' || vm.$store.state.token !== '') {
        
        trans.next();
    } else {
        trans.redirect('/login')
    }    
})
// TODO 
// 需要根据token的变化来决定跳转到哪个路由
/*
router.redirect({
    '/': '/login'
})
*/

// console.log('Vue.$store.state',Vue.$store);
// console.log('app',this);
// router.go('/login')


    /*
var App = Vue.extend({})
router.start(App, '#app')
*/


/*
new Vue({
    el: 'body',
    components: {
        app: App
    }
})
*/
