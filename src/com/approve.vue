<template>
    <div v-if="$store.state.isadmin == true">
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 借阅人 </td>
                    <td> 借阅文件编号 </td>
                    <td> 起始时间 </td>
                    <td> 结束时间 </td>
                    <td> 批准过 </td>
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
                    <td :class="'text-center'"><button v-if="cl.passed == false" @click="approveapply($index)">批准</button></td>
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
            var url = Url + "/apply?action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token;
            console.info('approve get list', url);
            $.get(url, function(res){
                console.info('approve get list res:', res);
                _this.$set('error', res.error)
                _this.$set('message', res.message)
                if (!!!res.error){
                    console.log('succ')
                    _this.$set('applyData', res.data)
                }
            })
        },
        approveapply: function(index){
            var _this = this;
            var url = Url + "/apply?action=approve&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            console.info('approve url', url);
            $.get(url, function(res){
                console.info('approve pass res:', res);
                if (!!!res.error){
                    console.info('approve succ');
                    _this.getlist()
                }else{
                    console.$set('error', res.error)
                    console.$set('message', res.message)
                }

            })
        },

    }
}

</script>
