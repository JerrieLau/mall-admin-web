<template> 
  <admin-login-log-detail :is-edit='true'></admin-login-log-detail>
</template>
<script>
  import AdminLoginLogDetail from './components/Detail.vue'
  export default {
    name: 'updateAdminLoginLog',
    components: { AdminLoginLogDetail }
  }
</script>
<style>
</style>


