<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="order" :rules="rules" ref="orderForm" label-width="150px">
      <el-form-item label="客户标识：" prop="customerId">
        <el-input type="number" v-model.number="order.customerId"></el-input>
      </el-form-item>
      <el-form-item label="支付类型：" prop="payType">
        <el-input type="number" v-model.number="order.payType"></el-input>
      </el-form-item>
      <el-form-item label="支付时间：" prop="payAt">
        <el-date-picker v-model="order.payAt" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="支付编号：" prop="tradeNo">
        <el-input v-model="order.tradeNo"></el-input>
      </el-form-item>
      <el-form-item label="送货方式：" prop="deliverType">
        <el-input type="number" v-model.number="order.deliverType"></el-input>
      </el-form-item>
      <el-form-item label="送货时间：" prop="deliverTime">
        <el-date-picker v-model="order.deliverTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="配送资费：" prop="deliverFee">
        <el-input v-model="order.deliverFee"></el-input>
      </el-form-item>
      <el-form-item label="订单总价：" prop="totalPrice">
        <el-input v-model="order.totalPrice"></el-input>
      </el-form-item>
      <el-form-item label="优惠券ID：" prop="couponId">
        <el-input type="number" v-model.number="order.couponId"></el-input>
      </el-form-item>
      <el-form-item label="实付金额：" prop="actualPrice">
        <el-input v-model="order.actualPrice"></el-input>
      </el-form-item>
      <el-form-item label="订单状态：" prop="state">
        <el-input type="number" v-model.number="order.state"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('orderForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('orderForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/order'

  const defaultOrder={
    tradeNo: '',
  };
  export default {
    name: 'OrderDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      order:Object.assign({}, defaultOrder),
        rules: {
            customerId: [
              {required: true, message: '请输入客户标识', trigger: 'blur'},
            ],
            payType: [
              {required: true, message: '请输入支付类型', trigger: 'blur'},
            ],
            payAt: [
            ],
            tradeNo: [
              {required: true, message: '请输入支付编号', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
            deliverType: [
              {required: true, message: '请输入送货方式', trigger: 'blur'},
            ],
            deliverTime: [
            ],
            deliverFee: [
            ],
            totalPrice: [
            ],
            couponId: [
            ],
            actualPrice: [
            ],
            state: [
              {required: true, message: '请输入订单状态，待支付、待出库、已出库、配送中、已签收、退款中、已取消、已结束', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.order = response.data;
        });
      }else{
        this.order = Object.assign({},defaultOrder);
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
                update(this.$route.query.id, this.order).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.order).then(response => {
                  this.$refs [formName].resetFields();
                  this.order = Object.assign({},defaultOrder);
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
        this.order = Object.assign({},defaultOrder);
      }
    }
  }
</script>
<style>
</style>


