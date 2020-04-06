<template>
  <div>
    <el-row class="search-box" >
      <el-button type="primary" size="small" round @click="onOpenCreateForm" >+创建角色</el-button>
      <el-input
        v-model="searchText"
        placeholder="请输入角色名称"
        class="input-with-select"
        style="width:500px;float:right"
        size="small"
        @keyup.enter.native="onInputEnter" >
        <el-button slot="append" icon="el-icon-search" @click="onBtnRoleSearchClick" />
      </el-input>
    </el-row>
    <el-row style="padding:5px">
      <el-table ref="roleTable" :data="tableData" :header-cell-style="changeHeaderStyle" style="width:100%" border fit size="small">
        <el-table-column label="序号" type="index" width="50" align="center"/>
        <el-table-column label="角色名称" align="center" prop="role_name" />
        <el-table-column label="用户数量" align="center" prop="staff_num" />
        <el-table-column label="角色描述" align="center" show-overflow-tooltip prop="role_desc" />
        <el-table-column label="操作" width="300" align="center" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onBtnEditRoleClick(scope.$index, scope.row)" >
              编辑
            </el-button>
            <el-button size="mini" type="success" @click="onBtnAuthorityClick(scope.$index, scope.row)" >
              权限设置
            </el-button>
            <el-button size="mini" type="danger" @click="onBtnDeleteRoleClick(scope.$index, scope.row)" >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px" >
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          @pagination="getRolesList"
        />
      </el-row>
    </el-row>
    <el-dialog :visible.sync="createFormVisible" :title="editForm.title" width="50%" >
      <el-form ref="createForm" :rules="rules" :model="editForm" label-width="100px" >
        <el-form-item label="角色名称" prop="role_name" >
          <el-input v-model="editForm.role_name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="角色描述" prop="desc" >
          <el-input v-model="editForm.role_desc" auto-complete="off" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onCancelRoleClick">取 消</el-button>
        <el-button :disabled="editForm.role_name ===''" type="primary" @click="onBtnOKClick('createForm')" >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="createAuthorityVisible" title="权限设置" width="45%" >
      <el-tree
        ref="tree"
        :data="JSON.parse(JSON.stringify(fullAuth))"
        :default-checked-keys="visitAuthArray"
        show-checkbox
        node-key="id"
        @check ="onTreeCheckChange"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node" >
          <span>{{ node.label }}</span>
          <el-checkbox-group v-model="editAuthArray" size="mini" @change="onCheckboxChange">
            <el-checkbox
              v-for="item in data.edit"
              :label="item.id"
              :key="item.id"
              :disabled ="noAuthEditArray.includes(item.id)"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer" >
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSaveRolesAuth">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getRolesList, rolesAdd, rolesEdit, deleteRoles, getRolesAuth, saveRolesAuth, getRolesNames, getAuthByRoleId } from '@/api/role'
export default {
  components: { Pagination },
  props: {
    auth: {
      type: Object,
      required: false,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      rules: {
        role_name: [
          {
            type: 'string',
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ]
      },
      searchText: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      tableData: [],
      createFormVisible: false,
      createAuthorityVisible: false,
      editForm: {
        id: 'null',
        role_name: 'null',
        role_desc: 'null',
        checkedVisits: [],
        checkedEdits: [],
        checkAllVisit: false,
        checkAllEdit: false,
        isIndeterminateVisit: false,
        isIndeterminateEdit: false
      },
      visitOption: this.auth.visit,
      editOption: this.auth.edit,
      activeRow: { visit: [], edit: [] },
      fullAuth: [],
      editAuthArray: [],
      visitAuthArray: [],
      editAuthObjArray: [],
      visitAuthObjArray: [],
      fullAuthVisitArray: [],
      fullAuthEditArray: [],
      noAuthEditArray: [],
      fullAuthVisitObjArray: [],
      disabledValue: {},
      message: '',
      editRolesName: '',
      checkAuthArray: []
    }
  },
  mounted() {
    this.getRolesList()
  },
  methods: {
    getRolesList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        role_name: this.searchText
      }
      getRolesList(params).then(response => {
        if (response.code === 200) {
          console.log(response.data)
          this.tableData = response.data
          this.listQuery.total = response.cnt
        } else {
          this.$notify({
            title: '错误',
            message: '数据获取错误',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getAuthByRoleId(roleName) {
      getAuthByRoleId(roleName).then(response => {
        if (response.code === 200) {
          this.visitAuthObjArray = response.data.visit
          this.editAuthObjArray = response.data.edit
          this.visitAuthObjArray.forEach((visitAuthObj) => {
            if (visitAuthObj.status !== undefined && visitAuthObj.status !== -1) {
              this.visitAuthArray.push(visitAuthObj.id)
            }
            this.fullAuthVisitObjArray.forEach((fullAuthVisitObj) => {
              if (visitAuthObj.id === fullAuthVisitObj.id) {
                fullAuthVisitObj.checked = true
              }
            })
          })
          this.getRolesAuth()
        } else {
          this.$notify({
            title: '错误',
            message: '数据获取失败!',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getRolesNames(id, val) {
      this.message = ''
      getRolesNames().then(response => {
        if (response.code === 200) {
          this.rolesName = response.data
          if (val) {
            for (var i = 0; i < this.rolesName.length; i++) {
              if (id) {
                if (this.rolesName[i] === val && val !== this.editRolesName) {
                  this.message = '编辑失败,角色名称重复!'
                  this.$message({
                    message: this.message,
                    type: 'error',
                    duration: 5 * 1000
                  })
                }
              } else {
                if (this.rolesName[i] === val) {
                  this.message = '新增失败,角色名称重复!'
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
            id ? this.rolesEdit() : this.rolesAdd()
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
    onInputEnter() {
      this.getRolesList({ page: 1, limit: 10 })
    },
    onCancelRoleClick() {
      this.createFormVisible = false
      this.getRolesList()
    },
    onCancel() {
      this.createAuthorityVisible = false
      this.getRolesList()
    },
    onSaveRolesAuth() {
      const data = {
        auth: { visit: this.visitAuthObjArray,
          edit: this.editAuthObjArray
        }
      }
      saveRolesAuth(this.editForm.id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.createAuthorityVisible = false
          this.getRolesList()
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getRolesAuth() {
      this.noAuthEditArray = []
      this.fullAuthVisitArray = []
      this.fullAuthEditArray = []
      this.fullAuthVisitObjArray = []
      getRolesAuth().then(response => {
        if (response.code === 200) {
          this.fullAuth = response.data
          // 得到系统所有访问权限的ID
          for (var i = 0; i < this.fullAuth.length; i++) {
            this.fullAuth[i].checked = false
            this.fullAuthVisitObjArray.push({ id: this.fullAuth[i].id, label: this.fullAuth[i].label, name: this.fullAuth[i].name, checked: false })
            this.fullAuthVisitArray.push(this.fullAuth[i].id)
            if (this.fullAuth[i].edit !== undefined && this.fullAuth[i].edit.length > 0) {
              this.fullAuthEditArray.push(this.fullAuth[i].edit)
            }
            if (this.fullAuth[i].children !== undefined && this.fullAuth[i].children.length > 0) {
              for (var j = 0; j < this.fullAuth[i].children.length; j++) {
                this.fullAuth[i].children[j].checked = false
                this.fullAuthVisitObjArray.push({ id: this.fullAuth[i].children[j].id, label: this.fullAuth[i].children[j].label, name: this.fullAuth[i].children[j].name, checked: false })
                this.fullAuthVisitArray.push(this.fullAuth[i].children[j].id)
                if (this.fullAuth[i].children[j].edit !== undefined && this.fullAuth[i].children[j].edit.length > 0) {
                  this.fullAuthEditArray.push(this.fullAuth[i].children[j].edit)
                }

                if (this.fullAuth[i].children[j].children !== undefined && this.fullAuth[i].children[j].children.length > 0) {
                  for (var p = 0; p < this.fullAuth[i].children[j].children.length; p++) {
                    this.fullAuth[i].children[j].children[p].checked = false
                    this.fullAuthVisitObjArray.push({ id: this.fullAuth[i].children[j].children[p].id, label: this.fullAuth[i].children[j].children[p].label, name: this.fullAuth[i].children[j].children[p].name, checked: false })
                    this.fullAuthVisitArray.push(this.fullAuth[i].children[j].children[p].id)
                    if (this.fullAuth[i].children[j].children[p].edit !== undefined && this.fullAuth[i].children[j].children[p].edit.length > 0) {
                      this.fullAuthEditArray.push(this.fullAuth[i].children[j].children[p].edit)
                    }
                  }
                }
              }
            }
          }
          // 系统所有权限id里移除角色已经存在的访问权限id，得到角色没有的访问权限id
          for (var k = 0; k < this.visitAuthArray.length; k++) {
            this.fullAuthVisitArray.splice(this.fullAuthVisitArray.indexOf(this.visitAuthArray[k]), 1)
          }
          // 得到角色没有访问权限的操作权限id
          for (var q = 0; q < this.fullAuthVisitArray.length; q++) {
            for (var t = 0; t < this.fullAuth.length; t++) {
              if (this.fullAuthVisitArray[q] === this.fullAuth[t].id &&
              this.fullAuth[t].edit !== undefined && this.fullAuth[t].edit.length > 0) {
                for (var r = 0; r < this.fullAuth[t].edit.length; r++) {
                  this.noAuthEditArray.push(this.fullAuth[t].edit[r].id)
                  this.noAuthEditArray = [...new Set(this.noAuthEditArray)]
                  // this.editAuthArray.splice(this.editAuthArray.indexOf(this.noAuthEditArray[v].edit[h].id), 1)
                }
              }
              if (this.fullAuth[t].children !== undefined) {
                for (var l = 0; l < this.fullAuth[t].children.length; l++) {
                  if (this.fullAuthVisitArray[q] === this.fullAuth[t].children[l].id &&
                  this.fullAuth[t].children[l].edit !== undefined &&
                  this.fullAuth[t].children[l].edit.length > 0) {
                    for (var w = 0; w < this.fullAuth[t].children[l].edit.length; w++) {
                      this.noAuthEditArray.push(this.fullAuth[t].children[l].edit[w].id)
                      this.noAuthEditArray = [...new Set(this.noAuthEditArray)]
                    }
                  }
                }
              }
            }
          }
          for (var h = 0; h < this.noAuthEditArray.length; h++) {
            if (this.editAuthArray.indexOf(this.noAuthEditArray[h]) !== -1) {
              this.editAuthArray.splice(this.editAuthArray.indexOf(this.noAuthEditArray[h]), 1)
            }
          }
        } else {
          this.$notify({
            title: '错误',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    rolesAdd() {
      const data = {
        role_name: this.editForm.role_name,
        role_desc: this.editForm.role_desc
      }
      rolesAdd(data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.createFormVisible = false
          this.getRolesList({ page: 1, limit: 10 })
        } else {
          this.$notify({
            title: '错误',
            message: '新增失败!',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    rolesEdit() {
      const data = {
        role_name: this.editForm.role_name,
        role_desc: this.editForm.role_desc
      }
      rolesEdit(this.editForm.id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.createFormVisible = false
          this.getRolesList({ page: 1, limit: 10 })
        } else {
          this.$notify({
            title: '错误',
            message: '修改失败!',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    deleteRoles(val) {
      deleteRoles(val).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRolesList({ page: 1, limit: 10 })
        } else {
          this.$notify({
            title: '错误!',
            message: '删除失败!',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    onOpenCreateForm() {
      this.editForm = {
        id: '',
        title: '创建角色',
        role_name: '',
        role_desc: ''
      }
      this.createFormVisible = true
      this.$refs.createForm.resetFields()
    },
    onBtnOKClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getRolesNames(this.editForm.id, this.editForm.role_name)
        } else {
          return false
        }
      })
    },
    onBtnEditRoleClick(index, row) {
      this.editForm = {
        id: row.role_id,
        title: '编辑角色',
        role_name: row.role_name,
        role_desc: row.role_desc
      }
      this.editRolesName = row.role_name
      this.createFormVisible = true
      this.$refs.createForm.resetFields()
    },
    onBtnDeleteRoleClick(index, row) {
      if (row.staff_num === 0) {
        this.$confirm('删除操作不可逆，是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRoles(row.role_id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$alert('角色人数大于0时不可删除角色', '删除失败', {
          confirmButtonText: '确定',
          type: 'error'
        })
      }
    },
    onBtnAuthorityClick(index, row) {
      console.log(row.role_auth.edit)
      this.visitAuthArray = []
      this.editAuthArray = []
      this.createAuthorityVisible = true
      this.editForm.id = row.role_id
      this.editAuthArray = row.role_auth.edit
      this.getAuthByRoleId(row.role_name)
    },
    onBtnRoleSearchClick() {
      this.getRolesList()
    },
    onCheckboxChange(val) {
      this.editAuthObjArray = []
      if (val.length > 0) {
        val.forEach((editAuth, index) => {
          this.fullAuthEditArray.forEach((fullAuthEdit, index) => {
            fullAuthEdit.forEach((AuthEdit, index) => {
              if (editAuth === AuthEdit.id) {
                this.editAuthObjArray.push(AuthEdit)
              }
            })
          })
        })
      }
      this.editAuthObjArray = [...new Set(this.editAuthObjArray)]
    },
    onTreeCheckChange(visitAuthObj, data) {
      this.visitAuthObjArray = []
      if (visitAuthObj.edit !== undefined && visitAuthObj.edit.length > 0) {
        if (!visitAuthObj.checked) {
          visitAuthObj.edit.forEach((edit) => {
            this.noAuthEditArray.splice(this.noAuthEditArray.indexOf(edit.id), 1)
          })
        } else {
          visitAuthObj.edit.forEach((edit) => {
            this.noAuthEditArray.push(edit.id)
            this.noAuthEditArray = [...new Set(this.noAuthEditArray)]
          })
        }
      }
      // status: 1 表示选中的节点
      if (data.checkedNodes.length > 0) {
        data.checkedNodes.forEach((checkedNode) => {
          this.visitAuthObjArray.push({ id: checkedNode.id, label: checkedNode.label, name: checkedNode.name, status: 1 })
        })
      }
      // 父节点半选中 status: -1 表示半选中的节点
      if (data.halfCheckedNodes.length > 0) {
        data.halfCheckedNodes.forEach((halfCheckedNode) => {
          this.visitAuthObjArray.push({ id: halfCheckedNode.id, label: halfCheckedNode.label, name: halfCheckedNode.name, status: -1 })
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox,
.el-radio {
  margin: 0 5px;
  line-height: 15px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
