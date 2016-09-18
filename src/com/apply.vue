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
            <input type="text" v-model="newapply.fileid"/>
        </div>
        <div class="form-group">
            <label>起始时间:</label>
            <input type="text" v-model="newapply.starttime" id="datetimepicker" data-date-format="yymmddhhiiss">
            <label>(不填为从现在开始)</label>
        </div>
        <div class="form-group">
            <label>结束时间:</label>
            <input type="text" v-model="newapply.endtime" id="datetimepicker" data-date-format="yymmddhhiiss">
            <label>格式:yymmddhhiiss</label>
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
        this.getmyapplylist()
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
            var url = "http://angelclover.win:8080/apply?action=add&username=" + this.$store.state.name + "&token=" + this.$store.state.token + "&to_doc_id_list=" + this.newapply.fileid + "&start_time=" + (_this.newapply.starttime == undefined? "" : _this.newapply.starttime) + "&end_time=" + end; 
            console.info('add borrow', url)
            $.get(url, function(response){
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
            var reqUrl = "http://angelclover.win:8080/apply?"
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
            $.get(url, function(res){
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
            var url = "http://angelclover.win:8080/apply?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&apply_id=" + _this.applyData[index].id;
            console.info('apply borrow', url);
            $.get(url, function(response){
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
    }
}
</script>
