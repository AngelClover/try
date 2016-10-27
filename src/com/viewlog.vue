<template>
    <div v-if=$store.state.isadmin>
        <table  class="table table-bordered">
            <thead>
                <tr class="text-center">
                    <td> 操作用户编号 </td>
                    <td> 操作时间 </td>
                    <td> 操作类型 </td>
                    <td> 操作信息 </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in logData" class="text-center">
                    <td>{{log.user_id}}</td>
                    <td>{{log.optime}}</td>
                    <td>{{log.optype}}</td>
                    <td>{{log.opinfo}}</td>
                </tr>
            </tbody>
        </table>
        <div class="form-group pull-right">
            <label>第</label>
            <input type="text" v-model="page" place-holder="{{page}}"/>
            <label>页, 共{{pageNum}}页</label>
            <br/>
            <label>每页</label>
            <input type="text" v-model="pageSize"  place-holder="{{pageSize}}"/>
            <label>条, 共{{logNum}}条</label>
            <button v-on:click="fresh">确定</button>
        </div>
    </div>

    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>
    <!--{{$store.state.isadmin}}-->
</template>

<script>
import {Url} from '../config.js'
export default {
    data: {
        msg : [],
        logData : [],
        error: 0,
        message: "",
        page: 0,
        pageNum: 0,
        pageSize: 10,
        logNum: 0,
    },
    route: {
        canActivate: function(){
            //return this.$store.state.name != ""
        },
        activate: function(trans){
            //this.getlist(0)
            trans.next()
        }
    },
    ready: function(){
        this.$set("page", 1);
        this.$set("pageSize", 10);
        this.getlist(1)
    },
    methods:{
        changeList: function(){
            var index = this.$get("page");
            if (index <= 0){
                index = 1;
                this.$set("error", 3);
                this.$set("message", "page num must >0");
            }else{
                this.getlist(this.page);
            }
        },
        fresh: function(){
            var index = this.$get("page");
            if (index <= 0){
                index = 1;
                this.$set("error", 3);
                this.$set("message", "page num must >0");
            }else{
                this.getlist(this.page);
            }
        },
        getlist: function(index){
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to view the history list')
                return false;
            }
            var url = Url + "/viewlog";
            var content = {};
            content["page"] = index;
            content["page_size"] = this.$get('pageSize');
            console.info("get log view list: ", content);
            var str = JSON.stringify(content);
            $.ajax(url, {
                method: "POST",
                data: str,
                contentType: "application/json",
                success: function(response){
                    console.info('view log', response, response.data[1]);
                    _this.$set('logData', response.data);
                    _this.$set('logNum', response.log_num);
                    _this.$set('pageNum', response.page_num);
                    //_this.$set('pageSize', response.page_size);
                },
                error: function(res){
                    _this.$set('error', 2);
                    _this.$set('message', "ajax error");
                },
            })
        }
    }
}
</script>


<style>
</style>
