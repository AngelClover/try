<template lang="jade">
nav(class="navbar navbar-default")
    div(class="container-fluid")
        div(class="navbar-header")
            a(class="navbar-brand", v-link="{path:'/home'}") 档案管理系统
        div(id="navbar", class="navbar-collapse collapse")
            ul(class="nav navbar-nav")
                //-
                    li(class="dropdown")
                        a(href="#", class="dropdown-toggle", data-toggle="dropdown", role="button", aria-haspopup="true", aria-expanded="false") 档案利用 
                            span(class="caret")
                        ul(class="dropdown-menu")
                            li(class="dropdown-header") 网上利用
                            li
                                a(href="#") 网上申请管理
                            li
                                a(href="#") 网上利用统计
                            li(role="separator", class="divider")
                            li(class="dropdown-header") 实体利用
                            li
                                a(href="#") 档案借阅
                            li
                                a(href="#") 档案归还
                            li
                                a(href="#") 档案记录
                            li
                                a(href="#") 档案统计
                li
                    a(v-link="{path:'/explore'}") 档案查阅
                li
                    a(v-link="{path:'/upload'}") 档案登记
                li
                    a(v-link="{path:'/viewlog'}") 日志记录
                //li
                    //a(href="#") 档案统计
                li(class="dropdown")
                    a(href="#", class="dropdown-toggle", data-toggle="dropdown", role="button", aria-haspopup="true", aria-expanded="false") 管理维护 
                        span(class="caret")
                    ul(class="dropdown-menu")
                        //li
                           // a(href="#") 类型设置
                        li
                            a(v-link="{path:'/docclass'}") 门类设置
                        li
                            a(v-link="{path:'/users'}") 用户设置
            ul(class="nav navbar-nav navbar-right")
                li(class="active dropdown")
                a {{msg}}
                        span(class="sr-only")
                //-
                    ul(class="dropdown-menu")
                        li 口令修改
                li
                    a {{$store.state.name}}

                li
                    a(class="navbar-header", v-on:click="loginorout") {{getShowName}}
                li 
                    a(class="navbar-header", v-link="{path:'/about'}") 关于

            //- a(class="navbar-brand", v-link="{path:'/about'}") 关于
    //- h1 {{msg}}
</template>

<script>
        //div(id="navbar", class="navbar-collapse collapse")
import {DELETE_USER_INFO,SET_USERINFO} from '../vuex/store'
import {clearToken,getToken} from '../auth'
import {login_action} from '../vuex/actions'

export default{
    data(){
        var token = getToken();
        var isLogin = typeof(token) == 'string' && token;
        console.log('this.$store.state.name',this.$store.state.name);
        return {
            msg: this.$store.state.name,
            isLogin: !!this.$store.state.name,
            url: this.$store.state.name ? 'logout' : 'login' 
        }
    },
    vuex: {
        getters: {
            name: function (state) {
                console.log('state',state);
                return state.name
            }
        },
        actions: {
            loginS: login_action,
        }
    }, 
    computed: {
        getShowName: function() {
            return this.$store.state.name ? '登出' : '登录'
        }
    },
    ready: function(){
        this.$data.isLogin && this.loginS(SET_USERINFO);
    },
    methods:{
        loginorout: function(){
            if (this.isLoginFn()) {
                this.loginS(DELETE_USER_INFO,{});
                clearToken();
            }
            
            this.$router.go('/login')
            
        },
        login: function() {
            this.$router.go('/login')
        },
        isLoginFn: function() {
            return !!this.$store.state.name;
        }
    }
}
</script>

<style>
</style>
