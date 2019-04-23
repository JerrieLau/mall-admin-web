<template> 
  <order-product-detail :is-edit='false'></order-product-detail>
</template>
<script>
  import OrderProductDetail from './components/Detail.vue'
  export default {
    name: 'addOrderProduct',
    components: { OrderProductDetail }
  }
</script>
<style>
</style>


