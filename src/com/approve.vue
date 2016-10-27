<template>
    <div v-if="$store.state.isadmin == true">
        <p>未处理权限:</p>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 借阅人 </td>
                    <td> 借阅文件编号 </td>
                    <td> 起始时间 </td>
                    <td> 结束时间 </td>
                    <td> 批准过 </td>
                    <td> </td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in applyData">
                    <td>{{cl.user_id}}</td>
                    <td>{{cl.doc_id}}</td>
                    <td>{{cl.start_time}}</td>
                    <td>{{cl.end_time}}</td>
                    <td>{{cl.passed}}</td>
                    <td :class="'text-center'"><button  @click="approveapply($index)">批准</button></td>
                    <td :class="'text-center'"><button  @click="denyapply($index)">拒绝</button></td>
                </tr>
            </tbody>
        </table>
        </br>
        <p>已生效权限:</p>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 借阅人 </td>
                    <td> 借阅卷编号 </td>
                    <td> 起始时间 </td>
                    <td> 结束时间 </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in authorities">
                    <td>{{cl.user_id}}</td>
                    <td>{{cl.volumne_id}}</td>
                    <td>{{cl.start_time}}</td>
                    <td>{{cl.end_time}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="$store.state.isadmin != true">
        <h5> has no prvilige to view<br/>
        </h5>
    </div>
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>
</template>
<script>
import {Url} from '../config.js'
export default{
    data:{
        applyData: [],
        authorities: [],
        error: 0,
        message: "",
    },
    ready: function(){
        this.getallapplylist()
    },
    methods:{
        getallapplylist: function(){
            this.getlist()
        },
        getlist: function(){
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('meesage', 'no prilivage')
                return 
            }
            var url = Url + "/api/auth/list";
            console.info('approve get list', url);
            $.ajax(url, {
                method: "GET",
                success: function(res){
                    console.info('approve get list res succ: ', res);
                    _this.$set('applyData', res.applyfors);
                    _this.$set('authorities', res.authorities);
                },
                error: function(res){
                },
            });
        },
        approveapply: function(index){
            var _this = this;
            var url = Url + "/api/auth/authorize?apply_for_id=" + _this.applyData[index].id + "&action=accept";
            console.info('approve url', url);
            $.ajax(url, {
                method: "GET",
                success: function(res){
                    console.info('approve pass res succ:', res);
                    _this.getlist()
                },
                error: function(res){
                    console.info('aprrove pass res error', res);
                    console.$set('error', 2);
                    console.$set('message', "approve pass ajax error");
                },
            })
        },
        denyapply: function(index){
            var _this = this;
            var url = Url + "/api/auth/authorize?apply_for_id=" + _this.applyData[index].id + "&action=deny";
            console.info('deny url', url);
            $.ajax(url, {
                method: "GET",
                success: function(res){
                    console.info('approve deny res succ:', res);
                    _this.getlist()
                },
                error: function(res){
                    console.info('aprrove deny res error', res);
                    console.$set('error', 2);
                    console.$set('message', "approve deny ajax error");
                },
            })
        },

    }
}

</script>
