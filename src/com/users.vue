<template>
    <div v-if='$store.state.isadmin'>
        <fieldset> 
            <legend>
                添加新用户
            </legend>
            <div class="form-group">
                <label>新用户名:</label>
                <input type="text" v-model="newuser.name"/>
            </div>
            <div class="form-group">
                <label>密码:</label>
                <input type="text" v-model="newuser.password"/>
            </div>
            <div class="form-group">
                <label></label>
                <button @click="addUser">Create</button>
            </div>
        </fieldset>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 用户编号 </td>
                    <td> 用户名 </td>
                    <td> 创建人编号 </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userData">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.create_user_id}}</td>
                    <td> </td>
                    <!--
                    <td :class="'text-center'"><button v-if="user.name != 'root' && user.name != 'test'" @click="delUser($index)">Delete</button></td>
                    -->
                </tr>
            </tbody>
        </table>
    </div>
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{errmsg}}<br/>
    </div>
</template>

<script>
import {Url} from '../config.js'
export default {
    data:{
        newuser:{
            name: "newuser",
            password: "password",
        },
        userData:[],
        error: 0,
        errmsg:"",
        //reqUrl: "http://angelclover.win/user?"
    },
    ready: function(){
        this.getUsers()
    },
    route: {
        canActivate: function(){
            //return this.$store.state.name != ""
        },
        activate: function(trans){
            //this.getUsers()
            trans.next()
        }
    },
    methods:{
        getUsers: function(){
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('errmsg', 'no right to view the list')
                return false;
            }
            var username = _this.$store.state.name
            var url = Url + "/user";
            //var url = reqUrl + "action=get_all&username=" + username;
            console.info('get all users', url);
            //TODO to check
            $.ajax(url, {
                success: function(res){
                    console.info('get_all users res:', res);
                    if (!!!res.error){
                        console.log('get user list succ');
                        _this.$set('userData', res);
                    }
                },
                error: function(res){
                    console.info('get user list', res);
                    _this.$set('error', 2);
                },
            });
        },
        addUser: function(){
            var _this = this
            var create_user = "test"
            var url = Url + "/api/add_user"
            var content = {
                username : "null",
                password : "null",
            };
            content["username"] = this.$get("newuser").name;
            content["password"] = this.$get("newuser").password;
            //var url = reqUrl + "action=add&username=" + this.newuser.name + "&password=" + this.newuser.password + "&create_user=" + _this.$store.state.name;
            console.info('add user', url, content, JSON.stringify(content));

            //TODO test for request ok
            $.ajax(url, {
                data : JSON.stringify(content),
                contentType : "application/json",
                method: "POST",
                success : function(res){
                    console.info('add user res:', res);
                    _this.setMessage(res);
                    if (!!!res.error){
                        console.log('succ')
                            _this.getUsers()
                    }
                },
                error: function(res){
                    console.info("ajax error", res);
                    _this.$set('error', 2);
                },
            });
        },
        delUser: function(index){
            //BAD 
            var _this = this
            var delete_username = this.userData[index].name
            var reqUrl = Url + "/user?"
            var url = reqUrl + "action=del&username=" + delete_username;
            console.info('del user', url)
            $(document).get(url, function(res){
                console.info('del user', res);
                _this.setMessage(res)
                if (!!!res.error){
                    console.log('succ')
                        _this.getUsers()
                }
            })
        },
        setMessage: function(res){
            var _this = this
            _this.$set('error', res.error)
            _this.$set('errmsg', res.message)
            console.log('setMessage info succ')
        }
    }
}
</script>
