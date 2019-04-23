<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="adminLoginLog" :rules="rules" ref="adminLoginLogForm" label-width="150px">
      <el-form-item label="用户标识：" prop="adminId">
        <el-input type="number" v-model.number="adminLoginLog.adminId"></el-input>
      </el-form-item>
      <el-form-item label="登录IP：" prop="ip">
        <el-input v-model="adminLoginLog.ip"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="adminLoginLog.address"></el-input>
      </el-form-item>
      <el-form-item label="登录浏览器：" prop="userAgent">
        <el-input v-model="adminLoginLog.userAgent"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('adminLoginLogForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adminLoginLogForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/adminLoginLog'

  const defaultAdminLoginLog={
    ip: '',
    address: '',
    userAgent: '',
  };
  export default {
    name: 'AdminLoginLogDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      adminLoginLog:Object.assign({}, defaultAdminLoginLog),
        rules: {
            adminId: [
              {required: true, message: '请输入用户标识', trigger: 'blur'},
            ],
            ip: [
            ],
            address: [
            ],
            userAgent: [
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.adminLoginLog = response.data;
        });
      }else{
        this.adminLoginLog = Object.assign({},defaultAdminLoginLog);
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
                update(this.$route.query.id, this.adminLoginLog).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.adminLoginLog).then(response => {
                  this.$refs [formName].resetFields();
                  this.adminLoginLog = Object.assign({},defaultAdminLoginLog);
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
        this.adminLoginLog = Object.assign({},defaultAdminLoginLog);
      }
    }
  }
</script>
<style>
</style>


