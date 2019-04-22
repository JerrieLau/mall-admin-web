<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="specification" :rules="rules" ref="specForm" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="specification.name"></el-input>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input v-model="specification.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('specForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('specForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/specification'

  const defaultSpec={
    name: '',
  };
  export default {
    name: 'SpecificationDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      specification:Object.assign({}, defaultSpec),
        rules: {
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            price: [
            ],
            productId: [
              {required: true, message: '请输入商品编号', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.specification = response.data;
        });
      }else{
        this.specification = Object.assign({},defaultSpec);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs [formName].validate((valid) => {
          if(valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                update(this.$route.query.id, this.spec).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.spec).then(response => {
                  this.$refs [formName].resetFields();
                  this.spec = Object.assign({},defaultSpec);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs [formName].resetFields();
        this.spec = Object.assign({},defaultSpec);
      }
    }
  }
</script>
<style>
</style>


