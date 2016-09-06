//var Vue = require('vue')
//var App = require('./app.vue')
//var Router = require('vue-router')
//var routeConfig =  require('./route-config')
import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './route-config'
import resource from 'vue-resource'
//import ap from './app.vue'

Vue.config.debug=true
Vue.use(Router)
Vue.use(resource)
Vue.http.options.headers={
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
}
//Vue.http.options.emulateJSON = true;

const router = new Router()
router.map(routeConfig)
const app = Vue.extend(require('./app.vue'))
router.start(app, '#app')

router.redirect({
    '/': '/home'
})


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
