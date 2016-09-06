<template>
    this is doc class page</br>
    {{gridData}}
</template>

<script>
import Vue from 'vue'
export default{
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: "angelclover.win:8099/docclass?action=get_all"
        //apiUrl: "http://angelclover.win:8099/user?action=get&user_name=test"
    },
    ready: function() {
        this.getDocclass()
        //console.log(this.girdData)
    },
    methods: {
        getDocclass: function() {
            //Vue.http.get(this.apiUrl)
            /*
            $.get('angelclover.win:8099/docclass?action=get_all', (res) =>{
                console.log(res)
            })
            */
            var url = "http://angelclover.win:8099/docclass?action=get_all"
            //var url = "http://angelclove.win:8099/user?action=get&user_name=root"
            this.$http.get(url).then((response) => {
                    top_json = JSON.parse(response.data)
                    element_json = JSON.parse(top_json.data)
                    this.$set('gridData', element_json)
                    console.log(this.gridData.toString())
                    console.log(this.gridData[0][0])
                    console.log(this.gridData[0][1])
                    console.log(this.gridData[1])
                    //console.log(JSON.stringify(this.gridData))
                    console.log(response.text())
                    console.log(response.data);
            }, (response) => {
                console.log('errCallback')
                console.log(response.status)
                console.log(response.text())
                console.log(response)
            })
        }
    }
}
</script>

<style>
body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
