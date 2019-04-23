<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="adminRoleRelation" :rules="rules" ref="adminRoleRelationForm" label-width="150px">
      <el-form-item label="：" prop="adminId">
        <el-input type="number" v-model.number="adminRoleRelation.adminId"></el-input>
      </el-form-item>
      <el-form-item label="：" prop="roleId">
        <el-input type="number" v-model.number="adminRoleRelation.roleId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('adminRoleRelationForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adminRoleRelationForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/adminRoleRelation'

  const defaultAdminRoleRelation={
  };
  export default {
    name: 'AdminRoleRelationDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      adminRoleRelation:Object.assign({}, defaultAdminRoleRelation),
        rules: {
            adminId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
            roleId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.adminRoleRelation = response.data;
        });
      }else{
        this.adminRoleRelation = Object.assign({},defaultAdminRoleRelation);
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
                update(this.$route.query.id, this.adminRoleRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.adminRoleRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.adminRoleRelation = Object.assign({},defaultAdminRoleRelation);
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
        this.adminRoleRelation = Object.assign({},defaultAdminRoleRelation);
      }
    }
  }
</script>
<style>
</style>


