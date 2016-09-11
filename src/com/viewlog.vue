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
            <input type="text" v-model="page" v-on:change="changeList" place-holder="{{page}}"/>
            <label>页</label>
        </div>
    </div>

    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>
    {{$store.state.isadmin}}
</template>

<script>
export default {
    data: {
        msg : [],
        logData : [],
        error: 0,
        message: "",
        page: 0
    },
    router: {
        canActivate: function(){
            return this.$store.state.name != ""
        },
        activate: function(trans){
            this.getlist(0)
            trans.next()
        }
    },
    ready: function(){
        this.getlist(0)
    },
    methods:{
        changeList: function(){
            this.getlist(this.page)
        },
        getlist: function(index){
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to view the history list')
                return false;
            }
            var url = "http://angelclover.win:8080/viewlog?page=" + index + "&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token;
            $.get(url, function(response){
                console.info('view log', response)
                if (!!!response.error){
                    console.info('view log data', response.data)
                    _this.$set('logData', response.data)
                }else{
                    _this.$set('error', response.error)
                    _this.$set('message', response.message)
                }
            })
        }
    }
}
</script>


<style>
</style>
