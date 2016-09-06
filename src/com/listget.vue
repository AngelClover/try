<template>
    <li v-for = "data in gridData">
        {{data}}
    </li>
</template>


<script>
export default{
    data: {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: [],
        apiUrl: 'http://211.149.193.19:8080/api/customers'
    },
    ready: function() {
        this.getCustomers()
    },
    methods: {
        getCustomers: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('gridData', response.data)
                })
            .catch(function(response) {
                console.log(response)
            })
        }
    }
}
</script>
