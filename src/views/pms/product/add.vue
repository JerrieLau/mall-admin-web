<template> 
  <product-detail :is-edit='false'></product-detail>
</template>
<script>
  import ProductDetail from './components/Detail.vue'
  export default {
    name: 'addProduct',
    components: { ProductDetail }
  }
</script>
<style>
</style>


