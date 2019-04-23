<template> 
  <warehouse-stock-detail :is-edit='true'></warehouse-stock-detail>
</template>
<script>
  import WarehouseStockDetail from './components/Detail.vue'
  export default {
    name: 'updateWarehouseStock',
    components: { WarehouseStockDetail }
  }
</script>
<style>
</style>


