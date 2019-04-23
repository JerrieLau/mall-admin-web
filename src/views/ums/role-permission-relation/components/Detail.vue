<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="rolePermissionRelation" :rules="rules" ref="rolePermissionRelationForm" label-width="150px">
      <el-form-item label="：" prop="roleId">
        <el-input type="number" v-model.number="rolePermissionRelation.roleId"></el-input>
      </el-form-item>
      <el-form-item label="：" prop="permissionId">
        <el-input type="number" v-model.number="rolePermissionRelation.permissionId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('rolePermissionRelationForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('rolePermissionRelationForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/rolePermissionRelation'

  const defaultRolePermissionRelation={
  };
  export default {
    name: 'RolePermissionRelationDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      rolePermissionRelation:Object.assign({}, defaultRolePermissionRelation),
        rules: {
            roleId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
            permissionId: [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.rolePermissionRelation = response.data;
        });
      }else{
        this.rolePermissionRelation = Object.assign({},defaultRolePermissionRelation);
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
                update(this.$route.query.id, this.rolePermissionRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.rolePermissionRelation).then(response => {
                  this.$refs [formName].resetFields();
                  this.rolePermissionRelation = Object.assign({},defaultRolePermissionRelation);
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
        this.rolePermissionRelation = Object.assign({},defaultRolePermissionRelation);
      }
    }
  }
</script>
<style>
</style>


