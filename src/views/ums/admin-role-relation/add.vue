<template> 
  <admin-role-relation-detail :is-edit='false'></admin-role-relation-detail>
</template>
<script>
  import AdminRoleRelationDetail from './components/Detail.vue'
  export default {
    name: 'addAdminRoleRelation',
    components: { AdminRoleRelationDetail }
  }
</script>
<style>
</style>


