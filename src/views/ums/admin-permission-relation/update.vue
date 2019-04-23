<template> 
  <admin-permission-relation-detail :is-edit='true'></admin-permission-relation-detail>
</template>
<script>
  import AdminPermissionRelationDetail from './components/Detail.vue'
  export default {
    name: 'updateAdminPermissionRelation',
    components: { AdminPermissionRelationDetail }
  }
</script>
<style>
</style>


