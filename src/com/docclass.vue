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
                <label>是否是新规则(0,1)</label>
                <input type="text" v-model="newclass.type"/>
            </div>
            <div class="form-group">
                <label>特殊属性:</label>
                <div>
                    <input type="text" v-model="newForAdd"/>
                    <button @click=addProp>新增 </button>
                    <button @click=minusProp>减少 </button>
                </div>
                <br/>
                <div v-for="data in newclass.properties">
                    <p>{{data}}</p><br/>
                </div>
            </div>
            <div class="form-group">
                <label></label>
                <button @click="createclass">创建</button>
            </div>
        </fieldset>
    </div>
    <br/>
    <br/>
    <div>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 门类编号 </td>
                    <td> 门类名称 </td>
                    <td> 门类层级 </td>
                    <td> 是否是老规则档案 </td>
                    <td> 门类父节点编号 </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in gridData">
                    <td>{{cl.id}}</td>
                    <td>{{cl.name}}</td>
                    <td>{{cl.level}}</td>
                    <td>{{cl.type}}</td>
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
            parent_id: 0,
            type: 0,
            count: 0,
            properties: [],
        },
        newForAdd: "",
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
        var x = {
            name: "新门类名称",
            parent_id: 0,
            type: 0,
            count: 0,
            properties: [],
        }
        this.$set("newclass", x);

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
        addProp: function(){
            var x = this.$get("newclass");
            console.log(x);
            x["properties"].push(this.$get("newForAdd"));
            this.$set("newclass", x);
        },
        minusProp: function(){
            var x = this.$get("newclass");
            x["properties"] = x["properties"].slice(0, x["properties"].length - 1);
            this.$set("newclass", x);
        },
        getDocclass: function() {
            var _this = this
            console.info(_this)
            //var url = Url + "/docclass?action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token
            var url = Url + "/docclass";
            console.log(url);
            $.ajax(url, {
                method: "GET",
                success: function(response){
                    console.info("get docclass list succ", response);
                    _this.$set('gridData', response.docclass);
                },
                error: function(response){
                    console.info("get docclass list error", response);
                },
            });
                /*
            $.ajax(url).done(function (response) {
            //$.get(url, function (response) {
            //$(document).get(url, function (response) {
                console.info('asd', response)
                if (!!!response.error){
                    console.info('asd', response.docclass)
                    _this.$set('gridData', response.docclass)
                }else{
                    _this.$set('error', response.error)
                    _this.$set('errmsg', response.message)
                }
            })
            */
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
            var url = Url + "/docclass";
            //var url = Url + "/docclass?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&name=" + this.gridData[index].name + "&docclass_id=" + this.gridData[index].id + "&parent_id=" + this.gridData[index].parent_id;
            var _this = this;
            url += "/" + this.gridData[index].id;
            console.info('delete class', url);

            $.ajax(url, {
                method: "DELETE",
                success: function(response){
                    console.info("delete docclass list succ", response);
                    _this.getDocclass();
                },
                error: function(response){
                    console.info("delete docclass list error", response);
                },
            });
            /*
            $.ajax(url,{METHOD:"DELETE"}).done(function(response){
            //$(document).get(url, function(response){
                console.info('delete class res:', response)
              if (!!!response.error){
                  console.info('delete succ')
                      _this.getDocclass()
              }else{
                _this.$set('error', response.error)
                _this.$set('errmsg', response.message)
              }
            })
            */
        },
        createclass: function(){
            var _this = this
            //var url = Url + "/docclass?action=add&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&name=" + this.newclass.name + "&parent_id=" + this.newclass.parent_id; 
            var url = Url + "/docclass";
            var content = this.$get("newclass");
            console.info('add class', url, content);
            $.ajax(url, {
                method: "POST",
                contentType: "application/x-www-form-urlencoded",
                data: content,
                success: function(response){
                    console.info("delete docclass list succ", response);
                    _this.getDocclass();
                },
                error: function(response){
                    console.info("delete docclass list error", response);
                },
            });
            /*
            $.ajax(url,{METHOD:"PUT"}).done(function(response){
            //$(document).get(url, function(response){
                console.info('add class res:', response)
                if (!!!response.error){
                    console.info('add succ')
                      _this.getDocclass()
                }else{
                    _this.$set('error', response.error)
                        _this.$set('errmsg', response.message)
                }
            })
            */

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
