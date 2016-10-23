<template>
    <div>
        <p>
            viewpage
        </p>
        <br/>
        <p>
        {{doc_id}}
    </div>
    <div>
        </p>
        当前第{{page_index}}页，共{{docData.files.length}}页。
        <br/>
        <button @click=prevPage>
            前一页
        </button>
        <button @click=nextPage>
            后一页
        </button>
    <div>
    <div v-for="value in docData">
        {{$key}}:{{value}}
    </div>
    <div v-for="item in docData.values">
        {{$index}}:
        <div v-for="value in item">
            {{$key}}:{{value}}
        </div>
    </div>
    <div id="pdfexplorer" class="container" >
    </div>
    <div id="picexplorer" class="container" v-if="showjpg">
        <img v-bind:src="resourceurl" class="img-rounded"></img>
    </div>
    <div class="container" id="tifexplorer">
        
    </div>
</template>



<script>
import PDFObject from 'pdfobject'
import {getToken,getUser} from '../auth'
import {Url, FileUrl} from '../config.js'
export default{
    data: {
        docData: {},
        error: 0,
        message: "",
        doc_id: 0,
        showpdf: false,
        showjpg: false,
        showtiff: false,
        page_index: 0,
    },
    ready: function(){
        this.$set('showpdf', false);
        this.$set('showjpg', false);
        this.$set('showtif', false);
        //this.renderpdf()
        //this.$set('doc_id', this.getQueryString().id);
        this.$set('doc_id', 7);
        this.$set('page_index', 0);
        this.$set('docData', {content: "nocontent"});
        this.getDocInfo(this.$get('doc_id'));
    },
    methods: {
        getQueryString: function () {
            var query_string = {};
            var query = window.location.hash.replace('#!/view?','');
            query = decodeURIComponent(query);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = pair[1];
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [query_string[pair[0]], pair[1]];
                        query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                            query_string[pair[0]].push(pair[1]);
                        }
            }
            console.info('get query string res:', query_string);
            return query_string;
        },
        getDocInfo: function(doc_id){
            var _this = this;
            console.info('get doc info ', doc_id);
            if (doc_id && doc_id > 0){
                var url = Url + "/doc/" + doc_id;
                console.info('get doc info, url:', url);
                //$(document).get(url);
                //$.get(url);
                //TODO: with no document, lack of Auth Header
                $.get(url, function(response){
                    console.info("doc", doc_id, "get", response);
                    if (!!!response.error){
                        console.info('success');
                        _this.$set('docData', response);
                        _this.$set('page_index', 0);
                        _this.showPage(_this.$get('page_index'));
                    }else{
                        console.info('error');
                        _this.$set('error', 1);
                    }
                });
            }
        },
        showPage: function(index){
            console.log("showpage index:", index);
            var _this = this;
            if (index >= 0){
                console.log("showPage", index);
                console.log("showPage", _this.docData);
                if (0 <= index && index < _this.docData.files.length){
                    var uri = FileUrl + "/" + _this.docData.files[index];
                    console.info("show page uri:" + uri);
                    var fileType = _this.pageType(uri);
                    _this.$set('showpdf', false);
                    _this.$set('showjpg', false);
                    _this.$set('showtif', false);
                    _this.$set('resourceUrl', uri);
                    if (fileType == "pdf"){
                        $("#pdfexplorer").show();
                        _this.$set('showpdf', true);
                        _this.showPdf();
                    }else if (fileType == "tif" || fileType == "tiff"){
                        $("#tifexplorer").show();
                        _this.showTif();
                        _this.$set('showtif', true);
                    }else if (fileType == "jpg" ||  fileType == "jpeg"){
                        _this.$set('showjpg', true);
                    }
                    if (_this.showpdf == false){
                        $("#pdfexplorer").hide()
                    }
                    if (_this.showjpg == false){
                        $("#tifexplorer").hide()
                    }
                }
            }
        },
        showTif: function(){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('GET', this.$get("resourceUrl"));
            xhr.onload = function (e) {
                var tiff = new Tiff({buffer: xhr.response});
                var canvas = tiff.toCanvas();
                $("#tifexplorer").appendChild(canvas);
            };
            xhr.send();
        },
        showPdf: function(){
            var url = this.$get("resourceUrl");
            console.log("show pdf :", url);
            PDFObject.embed(url, "#pdfexplorer");
        },
        pageType: function(uri){
            var list = uri.split(".");
            console.log(list.length, list[list.length-1]);
            return list[list.length-1];
        },
        prevPage: function(){
            var page_now = this.$get('page_index');
            if (page_now >= 1){
                this.$set('page_index', page_now - 1);
                this.showPage(page_now - 1);
            }
        },
        nextPage: function(){
            var page_now = this.$get('page_index');
            if (page_now < this.docData.files.length - 1){
                this.$set('page_index', page_now + 1);
                this.showPage(page_now + 1);
            }
        }
    },
};
</script>



<style>
.pdfobject-container { height: 800px;}
.pdfobject { border: 1px solid #666; }
</style>
