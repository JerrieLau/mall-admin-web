<template> 
  <el-card class="form-container" shadow="never">
    <div class="table-container">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>规格列表</span>
        <el-button
          class="btn-add"
          @click="add()"
          size="mini">
          添加
        </el-button>
      </el-card>
      <el-table ref="listTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column label="编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="名称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="规格"
      :visible.sync="dialogVisible"
      width="520px"
      :before-close="handleClose">
      <el-form :model="spec" :rules="rules" ref="specForm" label-width="150px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="spec.name"></el-input>
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input v-model="spec.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('specForm')">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm('specForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script>
  import {create, deleteById, fetchList, update} from '@/api/specification'

  const defaultListQuery = {
    keyword: null
  };
  const defaultSpec = {
    productId: 0,
    name: '',
  };
  export default {
    name: 'specification',
    data() {
      return {
        isEdit: false,
        spec:Object.assign({}, defaultSpec),
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 45, message: '长度在 1 到 45 个字符', trigger: 'blur'}
          ],
          price: [
          ],
          productId: [
            {required: true, message: '请输入商品编号', trigger: 'blur'},
          ],
        },

        listQuery: {
          productId: 0,
          pageNum: 1,
          pageSize: 10
        },
        dialogVisible: false,
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: []
      }
    },
    created() {
      this.listQuery.productId = this.$route.query.id;
      defaultSpec.productId = this.$route.query.id;
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.isEdit = true;
        this.spec = Object.assign({}, row);
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      searchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      add() {
        this.isEdit = false;
        this.dialogVisible = true;
      },
      handleClose() {
        this.isEdit = false;
        this.dialogVisible = false;
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
                update(this.$route.query.id, this.specification).then(response => {
                  this.$refs [formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.spec = Object.assign({},defaultSpec);
                  this.isEdit = false;
                  this.dialogVisible = false;
                  this.getList();
                });
              } else {
                create(this.spec).then(response => {
                  this.$refs [formName].resetFields();
                  this.spec = Object.assign({},defaultSpec);
                  this.isEdit = false;
                  this.dialogVisible = false;
                  this.getList();
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
        this.spec = Object.assign({},defaultSpec);
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


