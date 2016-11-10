<style type="text/css">
    .error {
        color: red;
        padding: 5px 0;
    }
    #updateButton {
        margin: 10px 0;
    }
    #class-dropdown {
        margin: 10px 0;
    }
</style>
<template>
    <div>
        请打包(.zip)上传<br/>
    </div>
    <input name="zip_file" type="file" value="上传文件" v-on:change="checkFile">
        <input name="docclass_id" type="hidden">
        <div class="dropdown" id="class-dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="selected-name">选择门类</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            </ul>
        </div>
        

        <button type="submit" id="updateButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" v-on:click="newSubmit">
          上传
        </button>
        <div class="error"></div>
    <!-- <form id="file-form" v-bind:action={{uploadUrl}} method="post" enctype="multipart/form-data"> -->
    <!--
    <form id="file-form" action={{uploadUrl}} method="post" enctype="multipart/form-data">
        <input name="zip_file" type="file" value="上传文件" v-on:change="checkFile">
        
        
        <input name="docclass_id" type="hidden">
        <div class="dropdown" id="class-dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="selected-name">选择门类</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            </ul>
        </div>
        

        <button type="submit" id="updateButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" v-on:click="submit">
          上传
        </button>
        <div class="error"></div>
    </form>
    -->
    <!--
    <iframe id="iframe" name="iframe" width="1" height="1" style="display:none"></iframe>
    -->
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
                        <button @click="deleteDoc($index)">删除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    -->
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>

</template>

<script>
import {Url} from '../config.js'
module.exports = {
    el: () => {
        return '#login-form';
    },
    name: 'addOrganization',
    data: {
        docData: [],
        error: 0,
        message: "",
        uploadUrl: ""
    },
    route: {
        canActivate: function(){
        },
        activate: function(trans){
            trans.next()
        }
    },
    ready: function() {
        this.getClasses();
        //this.getDoclist();
        this.$set('uploadUrl', Url + '/api/batch_volumne');
    },
    methods: {
        newSubmit: function(){
            var content = new FormData();
            var url = this.$get("uploadUrl");
            content.append("docclass_id", $("input[name=docclass_id]").val());
            content.append("zip_file", $("input[name=zip_file]")[0].files[0]);
            console.info("new submit url:", url, content, $("input[name=docclass_id]").val(), $("input[name=zip_file]")[0].files[0].size);
            //window.alert("upload begin");
            $.ajax(url, {
                method: "POST",
                contentType: false,//"multipart/form-data",
                processData: false,
                data: content,
                success: function(res){
                    console.info("new submit success", res);
                    window.alert("upload success");
                },
                error: function(res){
                    console.info("new submit error", res);
                },
            });
        },
        submit: function() {
            var ele = $("input[name=zip_file]")[0];
            console.info("qqqqqq");
            console.info("qqq", this.$get("uploadUrl"));
            console.info("qqq", $("input[name=docclass_id]").val());
            console.info("qqq", $("input[name=zip_file]").length);
            //if (!this.checkFile(ele.files[0]) || !this.validateClass()) return false;
            // 解决跨域提交问题，后续可以使用被注释的代码
            var _this = this;
            console.info("qqqqqq");
            $('#file-form')[0].ajaxSubmit(function (res){
                //_this.$router.go('/upload')
                console.info("qqqqqqpppp succ", res);
                return false;
            });
            console.info("qqqqqq");
            //_this.$router.go('/upload')
            //this.iframSubmit();
            return false;
        },
        saveReport: function(){
            var ele = $("input[name=zip_file]")[0];
            console.info("saveReport");
            console.info("saveReport", this.$get("uploadUrl"));
            console.info("saveReport", $("input[name=docclass_id]").val());
            console.info("saveReport", $("input[name=zip_file]").length);
            //if (!this.checkFile(ele.files[0]) || !this.validateClass()) return false;
            // 解决跨域提交问题，后续可以使用被注释的代码
            var _this = this;
            console.info("saveReport");
            $('#file-form')[0].submit(function (response){
                //_this.$router.go('/upload')
                console.info("saveReport res succ", response);
                return false;
            });
            console.info("saveReport");
            //_this.$router.go('/upload')
            //this.iframSubmit();
            return false;
        },
        checkFile: function(event) {
            var MAX_SIZE = 32 * 1024 * 1024 * 1024;
            var file = event && event.target ? event.target.files[0] : event;
            typeof(file) == 'undefined' && this.showErrors('请选择文件上传');
            var size = file.size;
            
            size > MAX_SIZE && this.showErrors('文件大于32G，请上传小于32G的文件');
            return size > MAX_SIZE ? false : true;
        },
        validateClass: function() {
            var flag = $('input[name=docclass_id]').val() == '';
            if (flag) {
                this.showErrors('请选择门类');
            }
            return !flag;
        },
        showErrors: function(error) {
            $('.error').html(error.toString());
        },
        iframSubmit: function() {
            var iframe = $("#iframe");
            // TODO
            iframe.attr('action','xxx');
            iframe.attr('target','iframe');
            console.info("iframeSubmit");
            iframe[0].submit();
        },
        getClasses: function() {
            var self = this;
            $.ajax(Url + "/docclass").done(function(response){
            //$(document).get(Url + '/docclass?action=get_all&username=test',function (response) {
                console.info('mmmddd',response);
                if (!!!response.error) {
                    var array = [];
                    var data = response.docclass;
                    for (var i = 0;i < data.length;i++) {
                        if (data[i].level == 4){
                            array.push('<li data-id="'+ data[i].id +'"><a href="#">' + data[i].name + '</a></li>');
                        }
                    }

                    console.info('array info', array.join('')); 
                    $('#class-dropdown .dropdown-menu').append(array.join(''));
                    self.bindEvent();
                }
            });
        },
        bindEvent: function() {
            $('#class-dropdown .dropdown-menu li').on('click',function () {
                var id = $(this).attr('data-id');
                var name = $(this).find('a').text();

                $('.dropdown .selected-name').text(name);
                $(this).parent().hide();
                console.log('id',id);
                $('input[name=docclass_id]').val(id);
                return false;
            });
            $('button[data-toggle="dropdown"]').on('click',function() {
                $('#class-dropdown .dropdown-menu').toggle();
            })
        },
        getDoclist: function() {
            var _this = this
            console.info(_this)
            if (_this.$store.state.isadmin == false){
                return
            }
            var url = Url + "/doc?action=get_all&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token
            console.log(url)
            $(document).get(url, function (response) {
                console.info('doc get', response)
                if (!!!response.error){
                    console.info('doc get res', response.data)
                    _this.$set('docData', response.data)
                }else{
                    _this.$set('error', response.error)
                    _this.$set('message', response.message)
                }
            })
        },
        deleteDoc: function(index){
            var _this = this;
            var url = Url + "/doc?action=del&username=" + _this.$store.state.name + "&token=" + _this.$store.state.token + "&file_id=" + _this.docData[index].id;
            console.log('delete doc: ', url)
            $(document).get(url, function (response) {
                console.info('doc del res:', response)
                _this.$set('error', response.error)
                _this.$set('message', response.message)
            })
            _this.getDoclist()

        },
    }
}

</script>
