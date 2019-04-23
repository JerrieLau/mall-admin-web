<template> 
  <admin-permission-relation-detail :is-edit='false'></admin-permission-relation-detail>
</template>
<script>
  import AdminPermissionRelationDetail from './components/Detail.vue'
  export default {
    name: 'addAdminPermissionRelation',
    components: { AdminPermissionRelationDetail }
  }
</script>
<style>
</style>


