<template>
    {{msg}}
</template>

<script>
export default {
    data: {
        msg : []
    },
    ready: ()=>{
        this.getlist()
    },
    methods:{
        getlist: ()=>{
            var url = "http://angelclover.win:8099/viewlog?page=0";
            this.$http.get(url).then( (res)=>{
                console.log(res)
                if (!!!res.error){
                    this.$set('msg', JSON.parse(res.data))
                } 
            }, (res)=>{
                console.info('asd', res);
            } )
        }
    }
}
</script>


<style>
</style>
