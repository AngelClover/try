<template lang="jade">
div(class="container")
    headbar
    div(class="row")
        div(class="side-panel col-xs-2 col-sm-2 col-md-2 col-lg-2")
            sidebar
        div(class="main-panel col-xs-10 col-sm-10 col-md-10 col-lg-10 jumbotron")
            router-view
</template>

<script>
import head from  './com/headbar.vue'
import side from  './com/sidebar.vue'
//import main from  './com/maincontent.vue'
//import store from './vuex/store'
export default {
    data () {
        return {
            msg: '欢迎 '
        }
    },
    components: {
        'headbar' : head,
        'sidebar' : side
    },
    //store
}
</script>


<style lang="stylus">
/*
font-stack = Helvetica, sans-serif
primary-color = #999
body
    font 100% font-stack
    color primary-color
.logo
    width 40px
    height 40px
    */
</style>
