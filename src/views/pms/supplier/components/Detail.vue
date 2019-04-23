<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="supplier" :rules="rules" ref="supplierForm" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="supplier.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <el-input v-model="supplier.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="tel">
        <el-input type="tel" v-model.tel="supplier.tel"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input type="email" v-model.email="supplier.email"></el-input>
      </el-form-item>
      <el-form-item label="对公账户户名：" prop="bankAccountName">
        <el-input v-model="supplier.bankAccountName"></el-input>
      </el-form-item>
      <el-form-item label="对公账户账号：" prop="bankAccountNo">
        <el-input v-model="supplier.bankAccountNo"></el-input>
      </el-form-item>
      <el-form-item label="对公账户开户行：" prop="bankDeposit">
        <el-input v-model="supplier.bankDeposit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('supplierForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('supplierForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/supplier'

  const defaultSupplier={
    name: '',
    contact: '',
    tel: '',
    email: '',
    bankAccountName: '',
    bankAccountNo: '',
    bankDeposit: '',
  };
  export default {
    name: 'SupplierDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      supplier:Object.assign({}, defaultSupplier),
        rules: {
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            contact: [
              {required: true, message: '请输入联系人', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            tel: [
              {required: true, message: '请输入联系电话', trigger: 'blur'},
              {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
            ],
            email: [
            ],
            bankAccountName: [
              {required: true, message: '请输入对公账户户名', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            bankAccountNo: [
              {required: true, message: '请输入对公账户账号', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            bankDeposit: [
              {required: true, message: '请输入对公账户开户行', trigger: 'blur'},
              {min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur'}
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.supplier = response.data;
        });
      }else{
        this.supplier = Object.assign({},defaultSupplier);
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
                update(this.$route.query.id, this.supplier).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.supplier).then(response => {
                  this.$refs [formName].resetFields();
                  this.supplier = Object.assign({},defaultSupplier);
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
        this.supplier = Object.assign({},defaultSupplier);
      }
    }
  }
</script>
<style>
</style>


