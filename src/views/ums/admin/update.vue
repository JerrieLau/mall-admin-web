<template> 
  <admin-detail :is-edit='true'></admin-detail>
</template>
<script>
  import AdminDetail from './components/Detail.vue'
  export default {
    name: 'updateAdmin',
    components: { AdminDetail }
  }
</script>
<style>
</style>


