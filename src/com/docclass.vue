<template>
    <!--this is doc class page<br/>-->
    <div v-if="$store.state.isadmin">
        <fieldset> 
            <legend>
                创建新门类
            </legend>
            <div class="form-group">
                <label>门类名:</label>
                <input type="text" v-model="newclass.name"/>
            </div>
            <div class="form-group">
                <label>门类父节点编号:</label>
                <label type="text"> {{newclass.parent_id}}</label>
            </div>
            <!--
            <div class="form-group">
                <label>Sex:</label>
                <select v-model="newPerson.sex">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            -->
            <div class="form-group">
                <label>门类父节点:</label>
                <select v-model="newclass.parent_id" >
                    <option v-for="pclass in gridData" value={{pclass.id}} >{{pclass.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label></label>
                <button @click="createclass">Create</button>
            </div>
        </fieldset>
    </div>
    <div>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 门类编号 </td>
                    <td> 门类名称 </td>
                    <td> 门类父节点编号 </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in gridData">
                    <td>{{cl.id}}</td>
                    <td>{{cl.name}}</td>
                    <td>{{cl.parent_id}}</td>
                    <td :class="'text-center'"><button @click="deleteclass($index)">Delete</button></td>
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
//import {get_username, get_id, get_token} from '../vuex/getters'
export default{
    data: {
        newclass:{
            name: "新门类名称",
            parent_id: 0
        },
        gridColumns: ['id', 'name', 'parent_id', 'customizable'],
        gridData: [],
        error: 0,
        errmsg:"",
        //apiUrl: "angelclover.win:8080/docclass?action=get_all"
        //apiUrl: "http://angelclover.win:8099/user?action=get&user_name=test"
    },
    /*
    vuex: {
        getters: {
            getName: get_username,
            getId: get_id,
            getToken: get_token
        }
    },
    */
    route: {
        canActivate: function(){
            //return this.$store.state.name != ""
        },
        activate: function(trans){
                      console.log(this)
            //this.getDocclass()
            trans.next()
        }
    },
    ready: function() {
        if (this.$store.state.username != "" && this.$store.state.token != ""){
            this.getDocclass()
        }else{
            this.$router.go('/login')
        }
        //console.log(this.girdData)
    },
    /*
    computed: {
        getName: function(){
            return this.$store.state.name
        },
        getToken: function(){
            return this.$store.state.token
        },
        getId: function(){
            return this.$store.state.id
        }
    },
    */
    methods: {
        getDocclass: function() {
            var _this = this
            console.info(_this)
            var url = Url + "/docclass?action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token
            console.log(url)
            $.get(url, function (response) {
                console.info('asd', response)
                if (!!!response.error){
                    console.info('asd', response.data)
                    _this.$set('gridData', response.data)
                }else{
                    _this.$set('error', response.error)
                    _this.$set('errmsg', response.message)
                }
            })
            //console.info('vuex getdocs', _this.getName())
            //console.info('vuex getters', _this.$store.state.name)
            //console.info('vuex getters', _this.$store.state.id)
            //console.info('vuex getters', _this.$store.state.token)
        },
        deleteclass: function(index){
            //this.gridData.splice(index,1);
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('errmsg', 'no right to delete')
                return false
            }
            var url = Url + "/docclass?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&name=" + this.gridData[index].name + "&docclass_id=" + this.gridData[index].id + "&parent_id=" + this.gridData[index].parent_id;
            var _this = this
            console.info('delete class', url);
            $.get(url, function(response){
                console.info('delete class res:', response)
              if (!!!response.error){
                  console.info('delete succ')
                      _this.getDocclass()
              }else{
                _this.$set('error', response.error)
                _this.$set('errmsg', response.message)
              }
            })
        },
        createclass: function(){
            var _this = this
            var url = Url + "/docclass?action=add&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&name=" + this.newclass.name + "&parent_id=" + this.newclass.parent_id; 
            console.info('add class', url)
            $.get(url, function(response){
                console.info('add class res:', response)
                if (!!!response.error){
                    console.info('add succ')
                      _this.getDocclass()
                }else{
                    _this.$set('error', response.error)
                        _this.$set('errmsg', response.message)
                }
            })

        }
        
    }
}
</script>

<style>
body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
