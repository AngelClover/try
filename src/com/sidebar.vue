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
</template>

<script>
export default{
    data(){
    }
}
</script>

<style>
</style>
