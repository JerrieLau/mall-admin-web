<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="adminPermissionRelation" :rules="rules" ref="adminPermissionRelationForm" label-width="150px">
      <el-form-item label="：" prop="adminId">
        <el-input type="number" v-model.number="adminPermissionRelation.adminId"></el-input>
      </el-form-item>
      <el-form-item label="：" prop="permissionId">
        <el-input type="number" v-model.number="adminPermissionRelation.permissionId"></el-input>
      </el-form-item>
      <el-form-item label="：" prop="type">
        <el-input type="number" v-model.number="adminPermissionRelation.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('adminPermissionRelationForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adminPermissionRelationForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/adminPermissionRelation'

  const defaultAdminPermissionRelation={
  };
  export default {
    name: 'AdminPermissionRelationDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      adminPermissionRelation:Object.assign({}, defaultAdminPermissionRelation),
        rules: {
            adminId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
            permissionId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
            type: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.adminPermissionRelation = response.data;
        });
      }else{
        this.adminPermissionRelation = Object.assign({},defaultAdminPermissionRelation);
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
                update(this.$route.query.id, this.adminPermissionRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.adminPermissionRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.adminPermissionRelation = Object.assign({},defaultAdminPermissionRelation);
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
        this.adminPermissionRelation = Object.assign({},defaultAdminPermissionRelation);
      }
    }
  }
</script>
<style>
</style>


