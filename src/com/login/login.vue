<style type="text/css">
    .input-group {
        margin: 10px 0;
    }
</style>
<template>
    <div id="login-form">
        <div class="input-group col-xs-5">
            <span class="input-group-addon" id="basic-addon2">用户名</span>
            <input type="text" name="username" class="form-control" placeholder="请输入用户名" aria-describedby="basic-addon2">
        </div>
        <div class="input-group col-xs-5">
            <span class="input-group-addon" id="basic-addon2">密   码</span>
            <input type="password" name="password" class="form-control" placeholder="请输入密码" aria-describedby="basic-addon2">
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
import {login_action} from '../../vuex/actions'
import {SET_USERINFO, DELETE_USER_INFO} from '../../vuex/store'
import {saveToken,saveUser,saveAuthString, getToken} from '../../auth'
import {Url} from '../../config.js'


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
                password:$('input[name=password]').val(),
            }
            if (!this.validate(option)) {
                this.showErrors('用户名或密码不能为空');
                return false;
            }
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
        login: function(option) {
            var self = this;
            var trans = option.username + ":" + option.password;
            var target = window.btoa(trans);
            console.log('login trans ', trans + '->' + target);
            var head = new Headers();
            head.append('Authorization', target);
            //head['Authorization'] = target;
            console.info(head);
            var target_auth_string = "Basic " + target;
            $.ajax({
                url: Url + '/api/token',
                method: 'POST',
                beforeSend: function(xhr){
                    console.info('beforeSend');
                    xhr.setRequestHeader("Authorization", target_auth_string);
                },
                success: function(response){
                    // 需要在路右侧保存session
                    var user = {}
                    user.username = option.username
                    user.token = response.token
                    user.auth_string = target_auth_string;
                    self.loginS(SET_USERINFO, user);
                    saveToken(user.token);
                    saveAuthString(user.auth_string);
                    saveUser(user);
                    $(document).ajaxSend(function(event, xhr, options){
                        xhr.setRequestHeader("Authorization", "Basic " + window.btoa(getToken() + ":"));
                    });
                    self.$router.go('/home');
                },
                error: function(response){
                    self.showErrors("user not exsits, or password incorrect");
                    var user = {}
                    user.username = option.username
                    user.token = ""
                    user.auth_string = "";
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
