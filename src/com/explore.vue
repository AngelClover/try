<template>
    <!--
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
    -->
    <form id="file-form" v-bind:action={{uploadUrl}} method="post" enctype="multipart/form-data">
        <!-- <label>门类编号:</label>
        <input name="docclass_id" value='0'> -->
        <label>门类: </label>
        <input name="docclass_id" type="hidden">
        <div class="dropdown" id="choose-docclass">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="selected-name" id="choosed-docclass">选择门类</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            </ul>
        </div>
    <div>
        <table border="2">
            <tr>
                <th>门类编号</th>
                <th>门类名</th>
                <th>门类层级</th>
                <th>父门类编号</th>
                <th>是否为旧规则档案</th>
                <th>特殊属性</th>
            </tr>
            <tr>
                <td> {{docClassInfo.id}} </td>
                <td> {{docClassInfo.name}} </td>
                <td> {{docClassInfo.level}} </td>
                <td> {{docClassInfo.parent_id}} </td>
                <td> {{docClassInfo.type}} </td>
                <td v-for="item in docClassInfo.properties">
                    {{item.name}}
                </td>
            </tr>
        </table>
                
            <!--
        </table>
        <table border="2">
            <tr>
                <td>属性编号</td>
                <td>属性名</td>
            </tr>
            <tr v-for="item in docClassInfo.properties">
                <td>{{item.order}} </td>
                <td>{{item.name}} </td>
            </tr>
        </table>
            -->
    </div>
    <label>卷:</label>
        <div class="dropdown" id="choose-volumn">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="selected-name" id="choosed-volumn">选择卷</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" id="volumn-dropdown-menu">
            </ul>
        </div>
    </form>
    <div>
        <table  class="table table-bordered">
            <thead>
                <tr>
                    <td> 档案编号 </td>
                    <td> 档案名 </td>
                    <td> 门类编号</td>
                    <td> 作者id</td>
                    <td> 操作</td>
                        <td v-for="item in volumnInfo.doc_properties">
                            {{item.name}}
                        </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in volumnInfo.docs">
                    <td>{{cl.id}}</td>
                    <td>{{cl.name}}</td>
                    <td>{{cl.docclass_id}}</td>
                    <td>{{cl.uploader}}</td>
                    <td :class="'text-center'">
                        <button @click="explorer($index)">预览</button></td>
                    <td v-for="item in volumnInfo.values">{{item.value}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!--
    <div v-for="value in docClassInfo">
        {{$key}}:{{value}}
    </div>
    <div>
        <div v-for="item in docClassInfo.properties">
            {{$index}}:
            <div v-for="value in item">
                {{$key}}:{{value}}
            </div>
        </div>
    </div>
    <div v-for="item in volumnInfo.docs">
        {{$index}}:
        <div v-for="value in item">
            {{$key}}:{{value}}
        </div>
    </div>
    <div v-for="item in volumnInfo.doc_properties">
        {{$index}}:
        <div v-for="value in item">
            {{$key}}:{{value}}
        </div>
    </div>
    -->
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
import {Url, FileUrl} from '../config.js'

export default{
    data: {
        docData: [],
        error: 0,
        message: "",
        filetype: "",
        resourceurl: "",
        showpdf: false,
        showjpg: false,
        volumnInfo: {},
        docClassInfo: {},
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
        /*workflow:
          1. user select docclass
          2. get columns names according to docclass
          3. user choose columns and fill-in text segment
          4. press committee and send request
          5. display
          */
        //this.getDoclist()
            //this.$set('showpdf', false)
            //this.$set('showjpg', false)
        //this.renderpdf()
        this.getDocClassList();
    },
    methods: {
        renderpdf: function(){
            var _this = this
            //var url = "http://angelclover.win/doc?action=get&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + "3"
            //var url = "http://angelclover.win/files/p7_p285.pdf"
            console.log(_this.url)
        },
        getDocClassList: function(){
            var self = this;
            $.ajax(Url + "/docclass").done(function(response){
            //$(document).get(Url + '/docclass?action=get_all&username=test',function (response) {
                console.info('explorerdocclasslist',response);
                if (!!!response.error) {
                    var array = [];
                    var data = response.docclass;
                    for (var i = 0;i < data.length;i++) {
                        if (data[i].level == 4){
                            array.push('<li data-id="'+ data[i].id +'"><a href="#">' + data[i].name + '</a></li>');
                        }
                    }

                    console.info('array info', array.join('')); 
                    console.info('choosed for append', $('#choose-docclass .dropdown-menu'));
                    $('#choose-docclass .dropdown-menu').append(array.join(''));
                    console.info('choosed for append end', $('#choose-docclass .dropdown-menu'));
                    self.bindDocClassEvent();
                }
            });
        },
        bindDocClassEvent: function() {
            var _this = this;
            $('#choose-docclass .dropdown-menu li').on('click',function () {
                var id = $(this).attr('data-id');
                var name = $(this).find('a').text();

                $('#choosed-docclass').text(name);
                //$('.dropdown .selected-name').text(name);
                $(this).parent().hide();
                console.log('id',id);
                //$('input[name=docclass_id]').val(id);
                _this.getVolumnList(id);
                return false;
            });
            $('#dropdownMenu1').on('click',function() {
            //$('button[data-toggle="dropdown"]').on('click',function() {
                $('#choose-docclass .dropdown-menu').toggle();
            })
        },
        getVolumnList: function(docclass_id){
            var _this = this;
            if (docclass_id != undefined){
                $.ajax(Url + "/docclass/" + docclass_id).done(function(response){
                    console.info('explorervolumnlist',response);
                    if (!!!response.error) {
                        _this.$set("docClassInfo", response);
                        var array = [];
                        var data = response.volumnes;
                        for (var i = 0;i < data.length;i++) {
                            array.push('<li data-id="'+ data[i].id +'"><a href="#">' + data[i].name + '</a></li>');
                        }

                        console.info('array info', array.join('')); 
                        console.info('choosed for append', $('#volumn-dropdown-menu'));
                        $('#volumn-dropdown-menu').append(array.join(''));
                        console.info('choosed for append end', $('#volumn-dropdown-menu'));
                        _this.bindVolumnEvent();
                    }
                });
            }
        },
        bindVolumnEvent(){
            var _this = this;
            $('#choose-volumn .dropdown-menu li').on('click',function () {
                var id = $(this).attr('data-id');
                var name = $(this).find('a').text();

                $('#choosed-volumn').text(name);
                $(this).parent().hide();
                console.log('id',id);
                _this.getDocList(id);
                return false;
            });
            $('#dropdownMenu2').on('click',function() {
                $('#choose-volumn .dropdown-menu').toggle();
            })
        },
        getDocList: function(volumn_id) {
            var _this = this;
            $.ajax(Url + "/volumne/" + volumn_id).done(function(response){
                if (!!!response.error){
                    _this.$set("volumnInfo", response);
                }else{
                    _this.$set("error", 2);
                }
            });
        },
        download: function(index){

            console.log(arguments);

            var _this = this
            var url = Url + "/doc?action=get&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + _this.docData[index].id
            console.log('windown open', url)
            window.open(url)
        },
        explorer: function(index){
            var _this = this
            var targetUrl = "view?id=" + _this.volumnInfo.docs[index].id;
            console.info('explorer targetUrl:', targetUrl);
            if (_this.volumnInfo.docs[index].id != undefined){
                this.$router.go(targetUrl)
            }else{
                this.$set('error', 1);
                this.$set('messsage', "doc id error");
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
