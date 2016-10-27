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
            <label>卷编号:</label>
            <input type="text" v-model="newapply.volumn_id" value="{{id}}"/>
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
    <div >
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 借阅人 </td>
                    <td> 借阅卷编号 </td>
                    <td> 起始时间 </td>
                    <td> 结束时间 </td>
                    <td> 是否被拒绝 </td>
                    <td> </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in applyData">
                    <td>{{cl.user_id}}</td>
                    <td>{{cl.volumne_id}}</td>
                    <td>{{cl.start_time}}</td>
                    <td>{{cl.end_time}}</td>
                    <td>{{cl.denied}}</td>
                    <td :class="'text-center'" v-if="$store.state.isadmin != true"><button @click="deleteborrow($index)">撤销</button></td>
                    <td :class="'text-center'" v-if="$store.state.isadmin != true"></td>
                    <td :class="'text-center'" v-if="$store.state.isadmin == true"><button @click="approve($index)">批准</button></td>
                    <td :class="'text-center'" v-if="$store.state.isadmin == true"><button @click="deny($index)">拒绝</button></td>
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
            volumn_id: 0,
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
            var url = Url + "/apply"; //this.$store.state.name + "&token=" + this.$store.state.token + "&to_doc_id_list=" + this.newapply.fileid + "&start_time=" + (_this.newapply.starttime == undefined? "" : _this.newapply.starttime) + "&end_time=" + end; 
            var content = {};
            content["volumne_id"] = this.newapply.volumn_id;
            content["start_time"] = this.newapply.starttime;
            content["end_time"] = end;

            console.info('add borrow', url);
            $.ajax(url, {
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(content),
                success: function(response){
                    console.info('add apply res succ:', response);//response for undefined
                    _this.getlist()
                },
                error: function(res){
                    console.info('add apply res error:', res)
                        _this.$set("error", 1);
                    _this.$set("message", "ajax error");
                },
            });
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
                var url = Url + "/apply";
            console.info('apply list ', url)
                $.ajax(url, {
                    method : "GET",
                    success: function(res){
                        console.info('apply list res succ:', res);
                        console.log('succ')
                        _this.$set('applyData', res)
                    },
                    error: function(res){
                        console.info("apply list res error:", res);
                        _this.$set('error', 1);
                        _this.$set("message", "get list ajax error");
                    }
                });
        },
        deleteborrow: function(index){
            //this.gridData.splice(index,1);
            var _this = this;
            //var url = Url + "/apply?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            var url = Url + "/apply/" + this.applyData[index].id;
            console.info('apply borrow', url);
            $.ajax(url, {
                method: "DELETE",
                success: function(response){
                    console.info('apply borrow res delete :', response)
                        _this.getlist()
                },
                error: function(res){
                    _this.$set('error', 3);
                    _this.$set('message', "delete borrow ajax error");
                    _this.getlist();
                },
            });
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
        },
        approve: function(index){
            //this.gridData.splice(index,1);
            var _this = this;
            //var url = Url + "/apply?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            var url = Url + "/api/auth/authorize?action=accept&apply_for_id=" + this.applyData[index].id;
            console.info('approve', url);
            $.ajax(url, {
                method: "GET",
                success: function(response){
                    console.info('approve', response)
                        _this.getlist()
                },
                error: function(res){
                    _this.$set('error', 3);
                    _this.$set('message', "approve ajax error");
                    _this.getlist();
                },
            });
        },
        deny: function(index){
            //this.gridData.splice(index,1);
            var _this = this;
            //var url = Url + "/apply?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            var url = Url + "/api/auth/authorize?action=deny&apply_for_id=" + this.applyData[index].id;
            console.info('approve', url);
            $.ajax(url, {
                method: "GET",
                success: function(response){
                    console.info('deny', response)
                        _this.getlist()
                },
                error: function(res){
                    _this.$set('error', 3);
                    _this.$set('message', "deny ajax error");
                    _this.getlist();
                },
            });
        },
    }
}
</script>
