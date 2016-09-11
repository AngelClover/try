<template lang='jade'>
//div sidebar
ul(class="nav nav-list bs-docs-sidenav")
    li
        a(v-link="{path:'/explore'}") 
            i(class="icon-chevron-right")
                档案借阅
    li
        a(v-link="{path:'/upload'}") 
            i(class="icon-chevron-right")
                档案登记
    li
        a(v-link="{path:'/docclass'}")
            i(class="icon-chevron-right")
                门类列表 
    li
        a(v-link="{path:'/users'}")
            i(class="icon-chevron-right")
                用户列表 
    li
        a(v-link="{path:'/viewlog'}")
            i(class="icon-chevron-right")
                日志记录 
    li
        a(v-link="{path:'/borrow'}")
            i(class="icon-chevron-right")
                权限授予
</template>

<script>
export default{
    data(){
    }
}
</script>

<style>
</style>
