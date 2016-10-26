<template lang='jade'>
//div sidebar
ul(class="nav nav-list bs-docs-sidenav")
    li(class="foruser forroot foroption")
        a(v-link="{path:'/view'}") 
            i(class="icon-chevron-right")
                档案阅览
    li(class="foruser forroot foroption")
        a(v-link="{path:'/explore'}") 
            i(class="icon-chevron-right")
                档案查找
    li(class="foruser foroption notroot")
        a(v-link="{path:'/apply'}") 
            i(class="icon-chevron-right")
                借阅申请
    li(class="forroot foroption notuser")
        a(v-link="{path:'/upload'}") 
            i(class="icon-chevron-right")
                档案登记
    li(class="forroot foroption notuser")
        a(v-link="{path:'/docclass'}")
            i(class="icon-chevron-right")
                门类列表 
    li(class="forroot foroption notuser")
        a(v-link="{path:'/users'}")
            i(class="icon-chevron-right")
                用户列表 
    li(class="forroot foroption notuser")
        a(v-link="{path:'/viewlog'}")
            i(class="icon-chevron-right")
                日志记录 
    li(class="forroot foroption notuser")
        a(v-link="{path:'/borrow'}")
            i(class="icon-chevron-right")
                权限授予
    li(class="forroot foroption notuser")
        a(v-link="{path:'/approve'}")
            i(class="icon-chevron-right")
                权限审批

</template>

<script>
import {getUser} from '../auth'
export default{
    data: () => {
        return {};
    }
}
</script>

<style>
</style>
