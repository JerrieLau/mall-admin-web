<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="admin" :rules="rules" ref="adminForm" label-width="150px">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="admin.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model.password="admin.password"></el-input>
      </el-form-item>
      <el-form-item label="头像：" prop="icon">
        <el-input v-model="admin.icon"></el-input>
      </el-form-item>
      <el-form-item label="邮件：" prop="email">
        <el-input type="email" v-model.email="admin.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input v-model="admin.nickName"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="note">
        <el-input v-model="admin.note"></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间：" prop="loginTime">
        <el-input type="datetime-local" v-model="admin.loginTime"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('adminForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adminForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/admin'

  const defaultAdmin={
    username: '',
    password: '',
    icon: '',
    email: '',
    nickName: '',
    note: '',
  };
  export default {
    name: 'AdminDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      admin:Object.assign({}, defaultAdmin),
        rules: {
            username: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 1, max: 35, message: '长度在 1 到 35 个字符', trigger: 'blur'}
            ],
            password: [
            ],
            icon: [
            ],
            email: [
            ],
            nickName: [
            ],
            note: [
            ],
            loginTime: [
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.admin = response.data;
        });
      }else{
        this.admin = Object.assign({},defaultAdmin);
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
                update(this.$route.query.id, this.admin).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.admin).then(response => {
                  this.$refs [formName].resetFields();
                  this.admin = Object.assign({},defaultAdmin);
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
        this.admin = Object.assign({},defaultAdmin);
      }
    }
  }
</script>
<style>
</style>


