<template> 
  <admin-detail :is-edit='false'></admin-detail>
</template>
<script>
  import AdminDetail from './components/Detail.vue'
  export default {
    name: 'addAdmin',
    components: { AdminDetail }
  }
</script>
<style>
</style>


