<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="measureUnit" :rules="rules" ref="measureUnitForm" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="measureUnit.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('measureUnitForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('measureUnitForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {create, get, update} from '@/api/measureUnit'

  const defaultMeasureUnit={
    name: '',
  };
  export default {
    name: 'MeasureUnitDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      measureUnit:Object.assign({}, defaultMeasureUnit),
        rules: {
            name: [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
            ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        get(this.$route.query.id).then(response => {
          this.measureUnit = response.data;
        });
      }else{
        this.measureUnit = Object.assign({},defaultMeasureUnit);
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
                update(this.$route.query.id, this.measureUnit).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.measureUnit).then(response => {
                  this.$refs [formName].resetFields();
                  this.measureUnit = Object.assign({},defaultMeasureUnit);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
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
        this.measureUnit = Object.assign({},defaultMeasureUnit);
      }
    }
  }
</script>
<style>
</style>


