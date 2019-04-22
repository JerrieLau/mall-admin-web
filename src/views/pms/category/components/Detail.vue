<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="category" :rules="rules" ref="categoryForm" label-width="150px">
      <el-form-item label="上级分类：" prop="pId">
        <el-select v-model="category.pid"
                   placeholder="请选择分类">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类目名称：" prop="name">
        <el-input v-model="category.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('categoryForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('categoryForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, fetchList, get, update} from '@/api/category'

  const defaultCategory = {
    name: '',
  };
  export default {
    name: 'CategoryDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 商品分类下拉选项
        categoryOptions: [],
        category: Object.assign({}, defaultCategory),
        rules: {
          name: [
            {required: true, message: '请输入类目名称', trigger: 'blur'},
            {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
          ],
          level: [],
        }
      }
    },
    created() {
      this.getCategoryList();
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.category = response.data;
        });
      } else {
        this.category = Object.assign({}, defaultCategory);
      }
    },
    methods: {
      getCategoryList() {
        let param = {pageNum: 1, pageSize: 100};
        fetchList(param).then(response => {
          this.categoryOptions = [];
          let list = response.data.list;
          for (let i = 0; i < list.length; i++) {
            this.categoryOptions.push({label: list[i].name, value: list[i].id});
          }
        });
      },
      onSubmit(formName) {
        this.$refs [formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                update(this.$route.query.id, this.category).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.category).then(response => {
                  this.$refs [formName].resetFields();
                  this.category = Object.assign({}, defaultCategory);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs [formName].resetFields();
        this.category = Object.assign({}, defaultCategory);
      }
    }
  }
</script>
<style>
</style>


