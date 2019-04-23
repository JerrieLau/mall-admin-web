<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="role" :rules="rules" ref="roleForm" label-width="150px">
      <el-form-item label="角色名：" prop="name">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item label="管理帐户数目：" prop="adminCount">
        <el-input type="number" v-model.number="role.adminCount"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input type="number" v-model.number="role.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('roleForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('roleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/role'

  const defaultRole={
    name: '',
    description: '',
  };
  export default {
    name: 'RoleDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      role:Object.assign({}, defaultRole),
        rules: {
            name: [
            ],
            description: [
            ],
            adminCount: [
            ],
            sort: [
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.role = response.data;
        });
      }else{
        this.role = Object.assign({},defaultRole);
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
                update(this.$route.query.id, this.role).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.role).then(response => {
                  this.$refs [formName].resetFields();
                  this.role = Object.assign({},defaultRole);
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
        this.role = Object.assign({},defaultRole);
      }
    }
  }
</script>
<style>
</style>


