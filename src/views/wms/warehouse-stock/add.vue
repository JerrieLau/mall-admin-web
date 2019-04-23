<template> 
  <warehouse-stock-detail :is-edit='false'></warehouse-stock-detail>
</template>
<script>
  import WarehouseStockDetail from './components/Detail.vue'
  export default {
    name: 'addWarehouseStock',
    components: { WarehouseStockDetail }
  }
</script>
<style>
</style>


