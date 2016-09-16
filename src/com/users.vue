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
                    <td :class="'text-center'"><button v-if="user.name != 'root' && user.name != 'test'" @click="delUser($index)">Delete</button></td>
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
export default {
    data:{
        newuser:{
            name: "newuser",
            password: "password",
        },
        userData:[],
        error: 0,
        errmsg:"",
        reqUrl: "http://angelclover.win:8080/user?"
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
            var reqUrl = "http://angelclover.win:8080/user?"
            var url = reqUrl + "action=get_all&username=" + username;
            console.info('get all users', url)
            $.get(url, function(res){
                console.info('get_all users res:', res);
                _this.setMessage(res)
                if (!!!res.error){
                    console.log('succ')
                    //if (_this.error == 0 && _this.errmsg == ""){
                        _this.$set('userData', res.data)
                    //}
                }
            })
        },
        addUser: function(){
            var _this = this
            var create_user = "test"
            var reqUrl = "http://angelclover.win:8080/user?"
            var url = reqUrl + "action=add&username=" + this.newuser.name + "&password=" + this.newuser.password + "&create_user=" + _this.$store.state.name;
            console.info('add user', url)
            $.get(url, function(res){
                console.info('add user res:', res);
                _this.setMessage(res)
                if (!!!res.error){
                    console.log('succ')
                        _this.getUsers()
                }
            })
        },
        delUser: function(index){
            var _this = this
            var delete_username = this.userData[index].name
            var reqUrl = "http://angelclover.win:8080/user?"
            var url = reqUrl + "action=del&username=" + delete_username;
            console.info('del user', url)
            $.get(url, function(res){
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
