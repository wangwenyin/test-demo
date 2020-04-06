<template>
  <div>
    <el-row class="search-box" >
      <el-button type="primary" size="small" round @click="onOpenCreateForm" >+创建部门</el-button>
      <el-input
        v-model="searchOption.text"
        placeholder="请输入部门名称"
        class="input-with-select"
        style="width:500px;float:right"
        size="small"
        @keyup.enter.native="onInputEnter" >
        <el-button slot="append" icon="el-icon-search" @click="onBtnDepartmentSearchClick" />
      </el-input>
    </el-row>
    <el-row style="padding:5px">
      <el-table ref="departmentTable" :data="tableData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small" >
        <el-table-column label="序号" type="index" width="50" align="center" />
        <el-table-column label="部门名称" align="center" prop="dept_name" />
        <el-table-column label="员工数量" align="center" prop="staff_num" />
        <el-table-column label="部门描述" align="center" prop="dept_desc" />
        <el-table-column label="操作" width="300" align="center" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onBtnEditClick(scope.$index, scope.row)" >编辑</el-button>
            <el-button size="mini" type="danger" @click="onBtnDeleteClick(scope.$index, scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px" >
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          @pagination="getDepartmentList" />
      </el-row>
    </el-row>
    <el-dialog ref="dialog" :visible.sync="createFormVisible" :title="editForm.title" width="50%" >
      <el-form ref="createForm" :rules="rules" :model="editForm" label-width="100px" >
        <el-form-item label="部门名称" prop="name" >
          <el-input v-model="editForm.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="部门描述" prop="desc" >
          <el-input v-model="editForm.desc" auto-complete="off" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="editForm.name ===''" type="primary" @click="onBtnOKClick('createForm')" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getDepartmentList, departmentAdd, departmentEdit, deleteDepartment, getDepartmentName } from '@/api/department'
export default {
  components: { Pagination },
  data() {
    return {
      searchOption: {
        clause: '登录名',
        text: null
      },
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      tableData: [],
      createFormVisible: false,
      editForm: {
        id: 'null',
        name: 'null',
        desc: 'null',
        auth: '1'
      },
      rules: {
        name: [
          { type: 'string', required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      message: '',
      departmentName: [],
      editDeptName: ''
    }
  },
  mounted() {
    this.getDepartmentList()
  },
  methods: {
    cancel() {
      this.createFormVisible = false
      this.getDepartmentList()
    },
    getDepartmentName(id, val) {
      this.message = ''
      getDepartmentName().then(response => {
        if (response.code === 200) {
          this.departmentName = response.data
          if (val) {
            for (var i = 0; i < this.departmentName.length; i++) {
              if (id) {
                if (this.departmentName[i] === val && val !== this.editDeptName) {
                  this.message = '编辑失败,部门名称重复!'
                  this.$message({
                    message: this.message,
                    type: 'error',
                    duration: 5 * 1000
                  })
                }
              } else {
                if (this.departmentName[i] === val) {
                  this.message = '新增失败,部门名称重复!'
                  this.$message({
                    message: this.message,
                    type: 'error',
                    duration: 5 * 1000
                  })
                }
              }
            }
          }
          if (!this.message) {
            id ? this.departmentEdit() : this.departmentAdd()
          }
        } else {
          this.$message({
            message: '数据获取出错!',
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.message = '网络出错!'
        this.$message({
          type: 'error',
          message: this.message,
          duration: 5 * 1000
        })
      })
    },
    getDepartmentList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        name: this.searchOption.text
      }
      getDepartmentList(params).then(response => {
        if (response.code === 200) {
          this.tableData = response.data
          this.listQuery.total = response.cnt
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    departmentAdd() {
      const data = {
        dept_name: this.editForm.name,
        dept_desc: this.editForm.desc
      }
      departmentAdd(data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.createFormVisible = false
          this.getDepartmentList({ page: 1, limit: 10 })
        } else {
          this.$message({
            type: 'error',
            message: '新增失败!',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '网络出错!',
          duration: 5 * 1000
        })
      })
    },
    departmentEdit() {
      const data = {
        dept_name: this.editForm.name,
        dept_desc: this.editForm.desc
      }
      departmentEdit(this.editForm.id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.createFormVisible = false
          this.getDepartmentList({ page: 1, limit: 10 })
        } else {
          this.$message({
            type: 'error',
            message: '修改失败!',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '网络出错!',
          duration: 5 * 1000
        })
      })
    },
    deleteDepartment(val) {
      deleteDepartment(val).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getDepartmentList({ page: 1, limit: 10 })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!',
            duration: 5 * 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '删除失败!',
          duration: 5 * 1000
        })
      })
    },
    onBtnDepartmentSearchClick() {
      this.getDepartmentList({ page: 1, limit: 10 })
    },
    onInputEnter() {
      this.getDepartmentList({ page: 1, limit: 10 })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    onOpenCreateForm() {
      this.editForm = {
        id: '',
        title: '创建部门',
        name: '',
        desc: ''
      }
      this.createFormVisible = true
      this.$refs.createForm.resetFields()
    },
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getDepartmentName(this.editForm.id, this.editForm.name)
        } else {
          return false
        }
      })
    },
    onBtnEditClick(index, row) {
      this.editForm = {
        id: row.dept_id,
        title: '编辑部门',
        name: row.dept_name,
        desc: row.dept_desc
      }
      this.editDeptName = row.dept_name
      this.createFormVisible = true
      this.$refs.createForm.resetFields()
      // if (this.editForm.name !== '') {
      //   this.rules = {}
      // }
    },
    onBtnDeleteClick(index, row) {
      if (row.staff_num === 0) {
        this.$confirm('删除操作不可逆，是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.deleteDepartment(row.dept_id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$alert('部门人数大于0时不可删除部门', '删除失败', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
