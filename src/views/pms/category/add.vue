<template> 
  <category-detail :is-edit='false'></category-detail>
</template>
<script>
  import CategoryDetail from './components/Detail.vue'
  export default {
    name: 'addCategory',
    components: { CategoryDetail }
  }
</script>
<style>
</style>


