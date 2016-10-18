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
    <form id="file-form" action="http://angelclover.win:8080/doc" method="post" enctype="multipart/form-data">
        <input name="file" type="file" value="上传文件" v-on:change="checkFile">
        <input name="action" type="hidden" value="upload">
        <input name="username" type="hidden" value="test">
        <!-- <label>门类编号:</label>
        <input name="docclass_id" value='0'> -->
        
        
        <input name="docclass_id" type="hidden">
        <div class="dropdown" id="class-dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <span class="selected-name">选择部门</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            </ul>
        </div>
        

        <button type="button" id="updateButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off" v-on:click="submit">
          上传
        </button>
        <div class="error"></div>
    </form>
    <!--
    <iframe id="iframe" name="iframe" width="1" height="1" style="display:none"></iframe>
    -->
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
    <br/>
    <div v-if="error > 0" color="red">
        Error Num: {{error}}<br/>
        Error Message: {{message}}<br/>
    </div>

</template>

<script>
import {Url} from '../config.js'
module.exports = {
    el:'#login-form',
    name: 'addOrganization',
    data: {
        docData: [],
        error: 0,
        message: "",
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
        this.getDoclist();
    },
    methods: {
        submit: function() {
            var ele = $("input[name=file]")[0];
            if (!this.checkFile(ele.files[0]) || !this.validateClass()) return false;
            // 解决跨域提交问题，后续可以使用被注释的代码
            var _this = this;
            $('#file-form')[0].submit(function (){
                _this.$router.go('/upload')
            })
            _this.$router.go('/upload')
            //this.iframSubmit();
            return false;
        },
        checkFile: function(event) {
            var MAX_SIZE = 16 * 1024 * 1024;
            var file = event && event.target ? event.target.files[0] : event;
            typeof(file) == 'undefined' && this.showErrors('请选择文件上传');
            var size = file.size;
            
            size > MAX_SIZE && this.showErrors('文件大于16M，请上传小于16M的文件');
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
            iframe[0].submit();
        },
        getClasses: function() {
            var self = this;
            $.get(Url + '/docclass?action=get_all&username=test',function (response) {
                console.info('mmmddd',response);
                if (!!!response.error) {
                    var array = [];
                    var data = response.data;
                    for (var i = 0;i < data.length;i++) {
                        array.push('<li data-id="'+ data[i].id +'"><a href="#">' + data[i].name + '</a></li>');
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
            $.get(url, function (response) {
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
            $.get(url, function (response) {
                console.info('doc del res:', response)
                _this.$set('error', response.error)
                _this.$set('message', response.message)
            })
            _this.getDoclist()

        },
    }
}

</script>
