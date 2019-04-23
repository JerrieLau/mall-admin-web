<template> 
  <station-detail :is-edit='true'></station-detail>
</template>
<script>
  import StationDetail from './components/Detail.vue'
  export default {
    name: 'updateStation',
    components: { StationDetail }
  }
</script>
<style>
</style>


