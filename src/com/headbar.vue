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
                    a(class="navbar-header", v-on:click="logout") 登出
                li 
                    a(class="navbar-header", v-link="{path:'/about'}") 关于

            //- a(class="navbar-brand", v-link="{path:'/about'}") 关于
    //- h1 {{msg}}
</template>

<script>
        //div(id="navbar", class="navbar-collapse collapse")
import DELETE_USER_INFO from '../vuex/store'
export default{
    data(){
        return {
            msg: this.$store.state.name
        }
    },
    methods:{
        logout: function(){
            this.$store.dispatch(DELETE_USER_INFO)
            this.$router.go('/login')
        }
    }
}
</script>

<style>
</style>
