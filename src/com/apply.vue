<template>
    <div v-if="$store.state.isadmin != true">
        <fieldset> 
            <h2>
                我的申请
            </h2>
            <!--
        <div class="form-group">
            <label>用户名:</label>
            <input type="text" v-model="newapply.toname"/>
        </div>
        -->
        <div class="form-group">
            <label>文件编号:</label>
            <input type="text" v-model="newapply.fileid" value="{{id}}"/>
        </div>
        <div class="form-group">
            <label>起始时间:</label>
            <input type="text" v-model="newapply.starttime" id="datetimepicker" >
            <label>(不填为从现在开始)</label>
        </div>
        <div class="form-group">
            <label>结束时间:</label>
            <input type="text" v-model="newapply.endtime" id="datetimepicker" >
            <label>格式:yyyy-mm-dd hh:ii:ss</label>
        </div>
        <div class="form-group">
            <label></label>
            <button @click="createborrow">新增</button>
        </div>
        </fieldset> 
    </div>
    <div v-if="$store.state.isadmin != true">
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 借阅人 </td>
                    <td> 借阅文件编号 </td>
                    <td> 起始时间 </td>
                    <td> 结束时间 </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in applyData">
                    <td>{{cl.user_id}}</td>
                    <td>{{cl.doc_id}}</td>
                    <td>{{cl.start_time}}</td>
                    <td>{{cl.end_time}}</td>
                    <td :class="'text-center'"><button @click="deleteborrow($index)">撤销</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>
</template>

<script>
import {getToken,getUser} from '../auth'
import {Url} from '../config.js'

export default{
    data:{
        newapply: {
            fileid: 0,
            starttime: "",
            endtime: "forever",
        },
        applyData: [] ,
        error: 0,
        message: "",
        id:""
    },
    route: {
        canActivate: function(){
            //return this.$parent.$store.state.name != ""
        },
        activate: function(trans){
            //this.$parent.getlist()
            trans.next()
        }
    },
    ready: function(){
        this.getmyapplylist();
        this.$set('id',this.getQueryString().id);
        $('[id=datetimepicker]').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            language:'zh-CN',
            autoclose:true
        });
    },
    methods:{
        getmyapplylist: function(){
            this.getlist()
        },
        createborrow: function(){
            var _this = this
            var end = "";
            if (_this.newapply == undefined || _this.newapply.endtime == undefined){
                end = ""
            }else{
                end = _this.newapply.endtime
            }
            //console.info('new appy', this.newapply)
            if (end == undefined || end == ""){
                end = "forever"
            }
            var url = Url + "/apply?action=add&username=" + this.$store.state.name + "&token=" + this.$store.state.token + "&to_doc_id_list=" + this.newapply.fileid + "&start_time=" + (_this.newapply.starttime == undefined? "" : _this.newapply.starttime) + "&end_time=" + end; 
            console.info('add borrow', url)
            $(document).get(url, function(response){
                console.info('add apply res:', response)
                if (!!!response.error){
                    console.info('add succ')
                      _this.getlist()
                }else{
                    _this.$set('error', response.error)
                    _this.$set('message', response.message)
                }
            })
        },
        getlist: function(){
            var _this = this
                /*
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to view the list')
                return false;
            }
            */
            var reqUrl = Url + "/apply?"
            var act = "get"
            if (_this.$store.state.isadmin == true){
                act = "get_all"
            }
            if (_this.$store.state.name == 'root'){
                _this.$set('error', 1)
                _this.$set('message', 'admin account need not to see this page')
                return
            }
            var url = reqUrl + "action=" + act + "&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token;
            console.info('apply list ', url)
            $(document).get(url, function(res){
                console.info('apply list res:', res);
                _this.$set('error', res.error)
                _this.$set('message', res.message)
                if (!!!res.error){
                    console.log('succ')
                    //if (_this.error == 0 && _this.message == ""){
                        _this.$set('applyData', res.data)
                    //}
                }
            })
        },
        deleteborrow: function(index){
            //this.gridData.splice(index,1);
            var _this = this
            var url = Url + "/apply?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            console.info('apply borrow', url);
            $(document).get(url, function(response){
                console.info('apply borrow res:', response)
              if (!!!response.error){
                  console.info('delete succ')
                      _this.getlist()
              }else{
                _this.$set('error', response.error)
                _this.$set('message', response.message)
              }
            })
        },
        getQueryString: function () {
            var query_string = {};
            var query = window.location.hash.replace('#!/apply?','');
            query = decodeURIComponent(query);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = pair[1];
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [query_string[pair[0]], pair[1]];
                        query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                            query_string[pair[0]].push(pair[1]);
                        }
            }
            return query_string;
        }
    }
}
</script>
