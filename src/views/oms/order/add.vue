<template> 
  <order-detail :is-edit='false'></order-detail>
</template>
<script>
  import OrderDetail from './components/Detail.vue'
  export default {
    name: 'addOrder',
    components: { OrderDetail }
  }
</script>
<style>
</style>


