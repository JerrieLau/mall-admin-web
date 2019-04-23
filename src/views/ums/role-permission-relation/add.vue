<template> 
  <role-permission-relation-detail :is-edit='false'></role-permission-relation-detail>
</template>
<script>
  import RolePermissionRelationDetail from './components/Detail.vue'
  export default {
    name: 'addRolePermissionRelation',
    components: { RolePermissionRelationDetail }
  }
</script>
<style>
</style>


