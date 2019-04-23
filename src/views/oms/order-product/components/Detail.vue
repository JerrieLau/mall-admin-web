<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="orderProduct" :rules="rules" ref="orderProductForm" label-width="150px">
      <el-form-item label="订单标识：" prop="orderId">
        <el-input type="number" v-model.number="orderProduct.orderId"></el-input>
      </el-form-item>
      <el-form-item label="商品标识：" prop="productId">
        <el-input type="number" v-model.number="orderProduct.productId"></el-input>
      </el-form-item>
      <el-form-item label="规格标识：" prop="specId">
        <el-input type="number" v-model.number="orderProduct.specId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称：" prop="productName">
        <el-input v-model="orderProduct.productName"></el-input>
      </el-form-item>
      <el-form-item label="规格名称：" prop="specName">
        <el-input v-model="orderProduct.specName"></el-input>
      </el-form-item>
      <el-form-item label="商品个数：" prop="productCount">
        <el-input type="number" v-model.number="orderProduct.productCount"></el-input>
      </el-form-item>
      <el-form-item label="商品价格：" prop="productPrice">
        <el-input v-model="orderProduct.productPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('orderProductForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('orderProductForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/orderProduct'

  const defaultOrderProduct={
    productName: '',
    specName: '',
  };
  export default {
    name: 'OrderProductDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      orderProduct:Object.assign({}, defaultOrderProduct),
        rules: {
            orderId: [
              {required: true, message: '请输入订单标识', trigger: 'blur'},
            ],
            productId: [
              {required: true, message: '请输入商品标识', trigger: 'blur'},
            ],
            specId: [
              {required: true, message: '请输入规格标识', trigger: 'blur'},
            ],
            productName: [
              {required: true, message: '请输入商品名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            specName: [
              {required: true, message: '请输入规格名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            productCount: [
              {required: true, message: '请输入商品个数', trigger: 'blur'},
            ],
            productPrice: [
              {required: true, message: '请输入商品价格', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.orderProduct = response.data;
        });
      }else{
        this.orderProduct = Object.assign({},defaultOrderProduct);
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
                update(this.$route.query.id, this.orderProduct).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.orderProduct).then(response => {
                  this.$refs [formName].resetFields();
                  this.orderProduct = Object.assign({},defaultOrderProduct);
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
        this.orderProduct = Object.assign({},defaultOrderProduct);
      }
    }
  }
</script>
<style>
</style>


