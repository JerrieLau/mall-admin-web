<template> 
  <warehouse-detail :is-edit='true'></warehouse-detail>
</template>
<script>
  import WarehouseDetail from './components/Detail.vue'
  export default {
    name: 'updateWarehouse',
    components: { WarehouseDetail }
  }
</script>
<style>
</style>


