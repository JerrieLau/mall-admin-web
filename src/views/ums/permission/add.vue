<template> 
  <permission-detail :is-edit='false'></permission-detail>
</template>
<script>
  import PermissionDetail from './components/Detail.vue'
  export default {
    name: 'addPermission',
    components: { PermissionDetail }
  }
</script>
<style>
</style>


