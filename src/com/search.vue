<template>
    <!--<form id="search-form">-->
        <label>检索字段：</label>
        <br/>
        <input name="search-segment" type="text" v-model="searchText" place-holder="搜索字段" />
        <button class="btn btn-default" @click="search">检索</button>
        <!--</form>-->
    <table class="table table-bordered">
        <tr>
            <th>门类编号 </th>
            <th>卷id </th>
            <th>卷名 </th>
            <th>卷类型 </th>
            <th> </th>
        </tr>
        <tr v-for="doc in volumnInfo">
            <td>{{doc.docclass_id}}</td>
            <td>{{doc.id}}</td>
            <td>{{doc.name}}</td>
            <td>{{doc.type}}</td>
            <td>
                <button @click=applyForDoc(doc.id)>申请 </button>
            </td>
        </tr>
    </table>
    <br/>
    <table class="table table-bordered">
        <tr>
            <th>件编号 </th>
            <th>件名 </th>
            <th>卷名 </th>
            <th>卷id </th>
            <th> </th>
        </tr>
        <tr v-for="doc in docInfo">
            <td>{{doc.id}}</td>
            <td>{{doc.name}}</td>
            <td>{{doc.volume}}</td>
            <td>{{doc.volumne_id}}</td>
            <td>
                <button @click=applyForDoc(doc.volumne_id)>申请 </button>
            </td>
        </tr>
    </table>

</template>



<script>
import {getToken,getUser} from '../auth'
import {Url, FileUrl} from '../config.js'
export default{
    data: {
        patternUrl: "",
        searchText: "",
        volumnInfo: [],
        docInfo: [],
    },
    ready: function(){
        this.$set("patternUrl", Url + "/api/search?w=");
        console.info("ready url ", this.$get("patternUrl"));
    },
    methods: {
        search: function(){

            var text = this.$get("searchText");
            var _this = this;
            if (text != ""){
                var url = this.$get("patternUrl") + text;
                console.info("search target url", url);
                $.ajax(url, {
                    method: "GET",
                    success: function(res){
                        console.info("search succ", res);
                        _this.$set("volumnInfo", res.volumnes);
                        _this.$set("docInfo", res.docs);
                    },
                    error: function(res){
                        console.info("search error", res);
                        _this.$set("error", 1);
                        _this.$set("message", "search ajax error");
                    },
                });
            }
            //this.getVolumnList();
        },
        //Abandoned
        getVolumnList: function(){
            var _this = this;
            var url = Url + "TODO";
            $.ajax(url, {
                METHOD: "GET",
                success: function(res){
                    console.info("get volumn list succ", res);
                    _this.$set("volumnList", res);
                },
                error: function(res){
                    console.info("get volumn list error", res);
                    _this.$set("error", 2);
                    _this.$set("message", "get volumn list ajax error");
                },
            });

        },
        applyForDoc: function(docID){
            var _this = this;
            var url = Url + "/doc/" + docID;
            console.info("applyForDoc", url);
            $.ajax(url, {
                METHOD: "GET",
                success: function(res){
                    console.info("apply for doc info succ", res);
                    console.info("get volumn id", res.volumne_id);
                    _this.applyForVolumn(res.volumne_id);

                },
                error: function(res){
                    console.info("apply for doc info error", res);
                    _this.$set("error", 2);
                    _this.$set("message", "apply for doc info ajax error");
                },
            });
        },
        applyForVolumn: function(id){
            var url = '/apply?id=' + id;
            id && this.$router.go(url);
        }
    }

}
</script>




<style>
</style>
