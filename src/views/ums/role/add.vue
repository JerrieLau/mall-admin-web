<template> 
  <role-detail :is-edit='false'></role-detail>
</template>
<script>
  import RoleDetail from './components/Detail.vue'
  export default {
    name: 'addRole',
    components: { RoleDetail }
  }
</script>
<style>
</style>


