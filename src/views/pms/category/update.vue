<template> 
  <category-detail :is-edit='true'></category-detail>
</template>
<script>
  import CategoryDetail from './components/Detail.vue'
  export default {
    name: 'updateCategory',
    components: { CategoryDetail }
  }
</script>
<style>
</style>


