<template>
    <div>
        <p>
            viewpage
        </p>
        <br/>
        <p>
        {{doc_id}}
        </p>
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
        doc_id: 0,
        showpdf: false,
        showjpg: false,
        showtiff: false,
    },
    ready: function(){
        this.$set('showpdf', false);
        this.$set('showjpg', false);
        this.$set('showtif', false);
        //this.renderpdf()
        this.$set('doc_id', this.getQueryString().id);
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
            return query_string;
        }
    },
};
</script>



<style>
.pdfobject-container { height: 800px;}
.pdfobject { border: 1px solid #666; }
</style>
