<template> 
  <station-detail :is-edit='false'></station-detail>
</template>
<script>
  import StationDetail from './components/Detail.vue'
  export default {
    name: 'addStation',
    components: { StationDetail }
  }
</script>
<style>
</style>


