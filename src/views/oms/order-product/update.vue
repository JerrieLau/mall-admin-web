<template> 
  <order-product-detail :is-edit='true'></order-product-detail>
</template>
<script>
  import OrderProductDetail from './components/Detail.vue'
  export default {
    name: 'updateOrderProduct',
    components: { OrderProductDetail }
  }
</script>
<style>
</style>


