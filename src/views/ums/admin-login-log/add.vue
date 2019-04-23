<template> 
  <admin-login-log-detail :is-edit='false'></admin-login-log-detail>
</template>
<script>
  import AdminLoginLogDetail from './components/Detail.vue'
  export default {
    name: 'addAdminLoginLog',
    components: { AdminLoginLogDetail }
  }
</script>
<style>
</style>


