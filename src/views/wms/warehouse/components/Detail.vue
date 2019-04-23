<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="warehouse" :rules="rules" ref="warehouseForm" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="warehouse.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('warehouseForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('warehouseForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/warehouse'

  const defaultWarehouse={
    name: '',
  };
  export default {
    name: 'WarehouseDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      warehouse:Object.assign({}, defaultWarehouse),
        rules: {
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.warehouse = response.data;
        });
      }else{
        this.warehouse = Object.assign({},defaultWarehouse);
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
                update(this.$route.query.id, this.warehouse).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.warehouse).then(response => {
                  this.$refs [formName].resetFields();
                  this.warehouse = Object.assign({},defaultWarehouse);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
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
        this.warehouse = Object.assign({},defaultWarehouse);
      }
    }
  }
</script>
<style>
</style>


