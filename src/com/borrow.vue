<template>
    <div>
        <fieldset> 
        <div class="form-group">
            <label>用户名:</label>
            <input type="text" v-model="newborrow.toname"/>
        </div>
        <div class="form-group">
            <label>文件编号:</label>
            <input type="text" v-model="newborrow.fileid"/>
        </div>
        <div class="form-group">
            <label>起始时间:</label>
            <input type="text" v-model="newclass.starttime" id="datetimepicker" data-date-format="yymmddhhiiss">
            <label>(不填为从现在开始)</label>
        </div>
        <div class="form-group">
            <label>结束时间:</label>
            <input type="text" v-model="newborrow.endtime" id="datetimepicker" data-date-format="yymmddhhiiss">
            <label>格式:yymmddhhiiss</label>
        </div>
        <div class="form-group">
            <label></label>
            <button @click="createborrow">新增</button>
        </div>
        </fieldset> 
    </div>
    <div>
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
                <tr v-for="cl in borrowData">
                    <td>{{cl.user_id}}</td>
                    <td>{{cl.doc_id}}</td>
                    <td>{{cl.start_time}}</td>
                    <td>{{cl.end_time}}</td>
                    <td :class="'text-center'"><button @click="deleteborrow($index)">Delete</button></td>
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
        newborrow: {
            toname: "",
            fileid: 0,
            starttime: "",
            endtime: "forever",
        },
        borrowData: [] ,
        error: 0,
        message: "",
    },
    router: {
        canActivate: function(){
            return this.$store.state.name != ""
        },
        activate: function(trans){
            this.getlist()
            trans.next()
        }
    },
    ready: function(){
        this.getlist()
    },
    methods:{
        createborrow: function(){
            console.info('new borrow', this.newborrow)
                /*
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to operate')
                return false;
            }
            */
            var end = _this.newborrow.endtime
            if (end == ""){
                end = "forever"
            }
            var _this = this
            var url = "http://angelclover.win:8080/borrow?action=add&username=" + this.$store.state.name + "&token=" + this.$store.state.token + "&to_username=" + this.newborrow.toname + "&to_doc_id_list=" + this.newborrow.fileid + "&start_time=" + (_this.newborrow.starttime == undefined? "" : _this.newborrow.starttime) + "&end_time=" + end; 
            console.info('add borrow', url)
            $.get(url, function(response){
                console.info('add borrow res:', response)
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
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to view the list')
                return false;
            }
            var reqUrl = "http://angelclover.win:8080/borrow?"
            var url = reqUrl + "action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token;
            console.info('borrow list ', url)
            $.get(url, function(res){
                console.info('borrow list res:', res);
                _this.$set('error', res.error)
                _this.$set('message', res.message)
                if (!!!res.error){
                    console.log('succ')
                    //if (_this.error == 0 && _this.message == ""){
                        _this.$set('borrowData', res.data)
                    //}
                }
            })
        },
        deleteborrow: function(index){
            //this.gridData.splice(index,1);
            var _this = this
            if (_this.$store.state.isadmin != true){
                _this.$set('error', 1)
                _this.$set('message', 'no right to delete')
                return false
            }
            var url = "http://angelclover.win:8080/borrow?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&auth_id=" + _this.borrowData[index].id;
            console.info('delete borrow', url);
            $.get(url, function(response){
                console.info('delete borrow res:', response)
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
