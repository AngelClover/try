<template>
    <div>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 档案编号 </td>
                    <td> 档案名 </td>
                    <td> 门类编号</td>
                    <td> 作者id</td>
                    <td> </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in docData">
                    <td>{{cl.id}}</td>
                    <td>{{cl.name}}</td>
                    <td>{{cl.docclass_id}}</td>
                    <td>{{cl.author_id}}</td>
                    <td :class="'text-center'"><button @click="download($index)">下载</button></td>
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
    data: {
        docData: [],
        error: 0,
        message: ""
    },
    route: {
        canActivate: function(){
            //return this.$store.state.name != ""
        },
        activate: function(trans){
            //this.getDocclass()
            trans.next()
        }
    },
    ready: function(){
        this.getDoclist()
    },
    methods: {
        getDoclist: function() {
            var _this = this
            console.info(_this)
            var url = "http://angelclover.win:8080/doc?action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token
            console.log(url)
            $.get(url, function (response) {
                console.info('doc get', response)
                if (!!!response.error){
                    console.info('doc get res', response.data)
                    _this.$set('docData', response.data)
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
        download: function(index){
            var _this = this
            var url = "http://angelclover.win:8080/doc?action=get&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + _this.docData[index].id
            console.log('windown open', url)
            window.open(url)
        }
    }


}
</script>
