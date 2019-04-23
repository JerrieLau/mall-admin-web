<template> 
  <permission-detail :is-edit='true'></permission-detail>
</template>
<script>
  import PermissionDetail from './components/Detail.vue'
  export default {
    name: 'updatePermission',
    components: { PermissionDetail }
  }
</script>
<style>
</style>


