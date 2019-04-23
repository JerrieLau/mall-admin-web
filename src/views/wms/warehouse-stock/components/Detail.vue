<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="warehouseStock" :rules="rules" ref="warehouseStockForm" label-width="150px">
      <el-form-item label="商品：" prop="productId">
        <el-select v-model="warehouseStock.productId">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :onchange="getSpecList()"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格：" prop="specId">
        <el-select v-model="warehouseStock.specId">
          <el-option
            v-for="item in specOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存：" prop="stock">
        <el-input type="number" v-model.number="warehouseStock.stock"></el-input>
      </el-form-item>
      <el-form-item label="最小库存：" prop="minStock">
        <el-input type="number" v-model.number="warehouseStock.minStock"></el-input>
      </el-form-item>
      <el-form-item label="销量：">
        <el-input type="number" v-model.number="warehouseStock.sale"></el-input>
      </el-form-item>
      <el-form-item label="单次补仓量：" prop="supply">
        <el-input type="number" v-model.number="warehouseStock.supply"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('warehouseStockForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('warehouseStockForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/warehouseStock'
  import {fetchList as fetchProductList} from '@/api/product'
  import {fetchList as fetchSpecList} from '@/api/specification'

  const defaultWarehouseStock={
  };
  export default {
    name: 'WarehouseStockDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        warehouseStock:Object.assign({}, defaultWarehouseStock),
        productOptions: [],
        specOptions: [],
        rules: {
            productId: [
              {required: true, message: '请输入商品标识', trigger: 'blur'},
            ],
            specId: [
              {required: true, message: '请输入规格标识', trigger: 'blur'},
            ],
            stock: [
              {required: true, message: '请输入库存', trigger: 'blur'},
            ],
            minStock: [
              {required: true, message: '请输入最小库存', trigger: 'blur'},
            ],
            sale: [
            ],
            supply: [
              {required: true, message: '请输入单次补仓量', trigger: 'blur'},
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.warehouseStock = response.data;
        });
      }else{
        this.warehouseStock = Object.assign({},defaultWarehouseStock);
      }
      this.getProductList();
    },
    methods: {
      getProductList() {
        fetchProductList({pageNum: 1, pageSize: 100}).then(response => {
          this.productOptions = [];
          let productList = response.data.list;
          for (let i = 0; i < productList.length; i++) {
            this.productOptions.push({label: productList[i].name, value: productList[i].id});
          }
        });
      },
      getSpecList() {
        fetchSpecList({productId: this.warehouseStock.productId, pageNum: 1, pageSize: 100}).then(response => {
          this.specOptions = [];
          let specList = response.data.list;
          for (let i = 0; i < specList.length; i++) {
            this.specOptions.push({label: specList[i].name, value: specList[i].id});
          }
        });
      },
      onSubmit(formName) {
        this.$refs [formName].validate((valid) => {
          if(valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                update(this.$route.query.id, this.warehouseStock).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.warehouseStock).then(response => {
                  this.$refs [formName].resetFields();
                  this.warehouseStock = Object.assign({},defaultWarehouseStock);
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
        this.warehouseStock = Object.assign({},defaultWarehouseStock);
      }
    }
  }
</script>
<style>
</style>


