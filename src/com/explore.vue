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
                    <td :class="'text-center'">
                            <button v-if="cl.filesname == ''" @click="apply(cl.id)">申请</button>

                            <button v-if="cl.filesname != '' && (cl.file_type == 'jpg' || cl.file_type == 'pdf')" @click="explorer($index)">预览</button>
                            <button v-if="cl.filesname != '' && cl.file_type != 'jpg && cl.file_type != 'pdf'" @click="download($index)">下载</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>
    <div v-if="showpdf">
        <div id="pdfexplorer" class="container" >
        </div>
    </div>
    <div id="picexplorer" class="container" v-if="showjpg">
        <img v-bind:src="resourceurl" class="img-rounded"></img>
    </div>
</template>

<script>
import PDFObject from 'pdfobject'
import {getToken,getUser} from '../auth'

export default{
    data: {
        docData: [],
        error: 0,
        message: "",
        filetype: "",
        resourceurl: "",
        showpdf: false,
        showjpg: false,
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
            this.$set('showpdf', false)
            this.$set('showjpg', false)
        //this.renderpdf()
    },
    methods: {
        renderpdf: function(){
            var _this = this
            //var url = "http://angelclover.win:8080/doc?action=get&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + "3"
            //var url = "http://angelclover.win/files/p7_p285.pdf"
            console.log(_this.url)
        },
        getDoclist: function() {
            var _this = this
            var user = _this.$store.state.name || getUser().username;
            var token = _this.$store.state.token || getToken();

            var url = "http://angelclover.win:8080/doc?action=get_all&username=" + user + "&token=" + token
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

            console.log(arguments);

            var _this = this
            var url = "http://angelclover.win:8080/doc?action=get&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + _this.docData[index].id
            console.log('windown open', url)
            window.open(url)
        },
        explorer: function(index){
            var _this = this
            var url = "http://angelclover.win/files/" + _this.docData[index].filesname
            _this.$set('resourceurl', url)
            _this.$set('file_type', _this.docData[index].file_type)
            console.info('explorer params:', url, _this.docData[index].file_type)
            var targetUrl = "view?id=" + _this.docData[index].id;
            console.info('targetUrl', targetUrl);
            if (_this.docData[index].id != undefined){
                this.$router.go(targetUrl)
            }
            /*
            if (_this.docData[index].file_type == "pdf"){
                PDFObject.embed(url, '#pdfexplorer');
                _this.$set('showjpg', false)
                _this.$set('showpdf', true)
            }else if (_this.docData[index].file_type == "jpg" || _this.docData[index].file_type == "jpeg" ){
                _this.$set('showjpg', true)
                _this.$set('showpdf', false)
            }else {
                _this.$set('showjpg', false)
                _this.$set('showpdf', false)
            }
            */
        },
        apply: function(id){
            var url = '/apply?id=' + id;
            id && this.$router.go(url);
        }

    }


}
</script>
<style>
.pdfobject-container { height: 800px;}
.pdfobject { border: 1px solid #666; }
</style>
