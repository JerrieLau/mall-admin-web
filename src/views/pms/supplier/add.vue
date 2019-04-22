<template> 
  <supplier-detail :is-edit='false'></supplier-detail>
</template>
<script>
  import SupplierDetail from './components/Detail.vue'
  export default {
    name: 'addSupplier',
    components: { SupplierDetail }
  }
</script>
<style>
</style>


