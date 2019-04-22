<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="productParam" :rules="rules" ref="productForm" label-width="150px">
      <el-form-item label="类目：" prop="categoryId">
        <el-cascader
          v-model="selectCategoryValue"
          :options="categoryOptions">
        </el-cascader>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="productParam.name"></el-input>
      </el-form-item>
      <el-form-item label="主图：">
        <single-upload v-model="productParam.pic"></single-upload>
      </el-form-item>
      <el-form-item label="源产地：" prop="origin">
        <el-input v-model="productParam.origin"></el-input>
      </el-form-item>
      <el-form-item label="特色：" prop="feature">
        <el-input v-model="productParam.feature"></el-input>
      </el-form-item>
      <el-form-item label="详情：" prop="detail">
        <el-input v-model="productParam.detail"></el-input>
      </el-form-item>
      <el-form-item label="供应商：" prop="supplierId">
        <el-select v-model="productParam.supplierId">
          <el-option
            v-for="item in supplierOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计价单位：" prop="measureUnitId">
        <el-select v-model="productParam.measureUnitId">
          <el-option
            v-for="item in measureUnitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图册：" prop="albumPics">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>
      <el-form-item label="详情页面：">
        <tinymce :width="650" :height="300" v-model="productParam.detailHtml"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('productForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('productForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {fetchTree as fetchListWithChildren} from '@/api/category'
  import {create, get, update} from '@/api/product';
  import {fetchList as fetchSupplierList} from '@/api/supplier'
  import {fetchList as fetchMeasureUnitList} from '@/api/measureUnit'
  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'

  const defaultProductParam={
    name: '',
    pic: '',
    origin: '',
    feature: '',
    detail: '',
    albumPics: '',
    detailHtml: '',
  };
  export default {
    name: 'ProductDetail',
    components: {SingleUpload, MultiUpload, Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        productParam: Object.assign({}, defaultProductParam),
        hasEditCreated:false,
        //选中商品分类的值
        selectCategoryValue: [],
        categoryOptions: [],
        supplierOptions: [],
        measureUnitOptions: [],
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
          ],
          pic: [
          ],
          origin: [
            {required: true, message: '请输入源产地', trigger: 'blur'},
            {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
          ],
          feature: [
            {required: true, message: '请输入特色', trigger: 'blur'},
            {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
          ],
          detail: [
          ],
          supplierId: [
            {required: true, message: '请输入供应商编号', trigger: 'blur'},
          ],
          measureUnitId: [
            {required: true, message: '请输入计价单位', trigger: 'blur'},
          ],
          categoryId: [
            {required: true, message: '请输入类目编号', trigger: 'blur'},
          ],
          albumPics: [
          ],
          detailHtml: [
          ],
        },

      }
    },
    computed: {
      //是否有商品属性图片
      hasAttrPic() {
        if (this.selectProductAttrPics.length < 1) {
          return false;
        }
        return true;
      },
      //商品画册图片
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.productParam.albumPics===undefined||this.productParam.albumPics==null||this.productParam.albumPics===''){
            return pics;
          }
          let albumPics = this.productParam.albumPics.split(',');
          for(let i=0;i<albumPics.length;i++){
            pics.push(albumPics[i]);
          }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.productParam.albumPics = null;
          } else {
            this.productParam.albumPics = '';
            if (newValue.length > 1) {
              for (let i = 0; i < newValue.length; i++) {
                this.productParam.albumPics += newValue[i];
                if (i !== newValue.length - 1) {
                  this.productParam.albumPics += ',';
                }
              }
            }
          }
        }
      }
    },
    created(){
      if(this.isEdit){
        get(this.$route.query.id).then(response=>{
          this.productParam=response.data;
        });
      }
      this.getCategoryList();
      this.getSupplierList();
      this.getMeasureUnitList();
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectCategoryValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.productParam.categoryId = newValue[1];
          this.productParam.categoryName= this.getCateNameById(this.productParam.categoryId);
        } else {
          this.productParam.categoryId = null;
          this.productParam.categoryName=null;
        }
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.productParam.categoryId!=null){
          this.selectCategoryValue.push(this.productParam.cateParentId);
          this.selectCategoryValue.push(this.productParam.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      getCategoryList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.categoryOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.categoryOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      getSupplierList() {
        fetchSupplierList({pageNum: 1, pageSize: 100}).then(response => {
          this.supplierOptions = [];
          let supplierList = response.data.list;
          for (let i = 0; i < supplierList.length; i++) {
            this.supplierOptions.push({label: supplierList[i].name, value: supplierList[i].id});
          }
        });
      },
      getMeasureUnitList() {
        fetchMeasureUnitList({pageNum: 1, pageSize: 100}).then(response => {
          this.measureUnitOptions = [];
          let measureUnitList = response.data.list;
          for (let i = 0; i < measureUnitList.length; i++) {
            this.measureUnitOptions.push({label: measureUnitList[i].name, value: measureUnitList[i].id});
          }
        });
      },
      getCateNameById(id){
        let name=null;
        for(let i=0; i<this.categoryOptions.length; i++){
          for(let j=0; i<this.categoryOptions[i].children.length; j++){
            if(this.categoryOptions[i].children[j].value===id){
              name=this.categoryOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
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
                update(this.$route.query.id, this.productParam).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                create(this.productParam).then(response => {
                  this.$refs [formName].resetFields();
                  this.productParam = Object.assign({},defaultProductParam);
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
        this.specification = Object.assign({},defaultProductParam);
      }
    }
  }
</script>
<style>
  .form-container {
    width: 900px;
  }
</style>


