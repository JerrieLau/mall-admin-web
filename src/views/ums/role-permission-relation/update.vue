<template> 
  <role-permission-relation-detail :is-edit='true'></role-permission-relation-detail>
</template>
<script>
  import RolePermissionRelationDetail from './components/Detail.vue'
  export default {
    name: 'updateRolePermissionRelation',
    components: { RolePermissionRelationDetail }
  }
</script>
<style>
</style>


