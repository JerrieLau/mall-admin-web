<template> 
  <warehouse-detail :is-edit='false'></warehouse-detail>
</template>
<script>
  import WarehouseDetail from './components/Detail.vue'
  export default {
    name: 'addWarehouse',
    components: { WarehouseDetail }
  }
</script>
<style>
</style>


