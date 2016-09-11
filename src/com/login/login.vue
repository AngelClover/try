<style type="text/css">
    .input-group {
        margin: 10px 0;
    }
</style>
<template>
    <div id="login-form">
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon2">用户名</span>
            <input type="text" name="username" class="form-control" placeholder="请输入用户名" aria-describedby="basic-addon2">
        </div>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon2">密码</span>
            <input type="text" name="password" class="form-control" placeholder="请输入密码" aria-describedby="basic-addon2">
        </div>
        <div>
            <button type="button" id="loginButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" v-on:click="submit">
              登录
            </button>
        </div>
        <div class="error"></div>
    </div>
</template>


<script>
import login_action from '../../vuex/actions'
import {SET_USERINFO} from '../../vuex/store'

module.exports = {
    el:'#login-form',
    name: 'addOrganization',
    data:{
        username:'123',
        password:'456',
    },
    vuex: {
        actions: {
            loginS: login_action
        }
    },
    methods: {
        submit: function(event){
            var option = {
                username:$('input[name=username]').val(),
                password:$('input[name=password]').val()
            }
            if (!this.validate(option)) {
                this.showErrors('用户名或密码不能为空');
                return false;
            }
            console.log('validate success');
            this.login(option);
        },
        validate: function(data) {
            var flag = true;
            for (var key in data) {
                if (!data[key]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        /*
        login: function(option) {
            var self = this;
            $.post('http://angelclover.win:8080/login',option,function (response) {
                console.info('mmmddd',response);
                if (!!!response.error) {
                    // TODO 需要在路右侧保存session
                    window.location.href = '/'; // 跳转到首页
                } else {
                    self.showErrors(response.message);
                }
            });
        },
        */
        login: function(option) {
            var self = this;
            $.post('http://angelclover.win:8080/login',option,function (response) {
                    console.info('mmmddd',response);
                    if (!!!response.error) {
                        // TODO 需要在路右侧保存session
                        var user = {}
                        user.username = option.username
                        user.token = response.data.token
                        console.log(self)
                        //self.loginS(user)
                        self.$store.dispatch(SET_USERINFO, user)
                        //router.go('/')
                        //window.location.href = '/'; // 跳转到首页
                    } else {
                        self.showErrors(response.message);
                        self.$store.dispatch(DELETE_USER_INFO, user)
                    }
                });
        },
        showErrors: function(error) {
            $('.error').html(error.toString());
        }
    }
};
</script>



<style>
</style>
