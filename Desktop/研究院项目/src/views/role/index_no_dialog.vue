<template>
  <div>
    <el-row
      class="search-container"
      style="padding: 5px"
    >
      <el-button
        type="primary"
        size="small"
        round
        @click="onBtnAddClick"
      >+创建角色</el-button>
      <el-input
        v-model="searchText"
        placeholder="请输入角色名称"
        class="input-with-select"
        style="width:500px;float:right"
        size="small"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onBtnRoleSearchClick"
        />
      </el-input>
    </el-row>
    <el-row
      :gutter="24"
      style="padding:5px"
    >
      <el-col :span="16">
        <el-table
          ref="roleTable"
          :data="tableData"
          :header-cell-style="changeHeaderStyle"
          style="width:100%"
          border
          fit
          size="small"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column
            label="角色名称"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <span
                v-if="!scope.row.inEdit"
                style="margin-left: 10px"
              >{{ scope.row.role_name }}</span>
              <el-input
                v-if="scope.row.inEdit"
                v-model="scope.row.role_name"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="用户数量"
            align="center"
            width="70"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.staff_num }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="角色描述"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                v-if="!scope.row.inEdit"
                style="margin-left: 10px"
              >{{ scope.row.role_desc }}</span>
              <el-input
                v-if="scope.row.inEdit"
                :rows="2"
                v-model="scope.row.desc"
                type="textarea"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="权限"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="onBtnShowAuthClick(scope.$index, scope.row)"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.inEdit"
                size="mini"
                type="primary"
                @click="onBtnEditRoleClick(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                v-if="!scope.row.inEdit"
                size="mini"
                type="danger"
                @click="onBtnDeleteRoleClick(scope.$index, scope.row)"
              >
                删除
              </el-button>
              <el-button
                v-if="scope.row.inEdit"
                size="mini"
                type="primary"
                @click="onBtnSaveEditClick(scope.$index, scope.row)"
              >
                保存
              </el-button>
              <el-button
                v-if="scope.row.inEdit"
                size="mini"
                @click="onBtnCancelEditClick(scope.$index, scope.row)"
              >
                取消
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          style="margin-top:5px"
        >
          <pagination
            :total="listQuery.total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            :page-sizes="listQuery.pageSizes"
            @pagination="getRolesList"
          />
        </el-row>
      </el-col>
      <el-col :span="2" />
      <el-col :span="20">
        <el-table
          :data="[{id:1}]"
          :header-cell-style="changeHeaderStyle"
          style="width:100%"
          border
          fit
          size="small"
        >
          <el-table-column :label="activeRow.role_name + '权限配置'"><template slot-scope="scope">
            <div>{{ scope.row.id }}</div>
            <el-tree
              :data="JSON.parse(JSON.stringify(fullAuth))"
              :expand-on-click-node="false"
              show-checkbox
              node-key="id"
              default-expand-all
            />
            <el-tree
              :data="JSON.parse(JSON.stringify(fullAuth))"
              show-checkbox
              node-key="id"
              default-expand-all
            >
              <span slot-scope="{ node, data }" class="custom-tree-node" >
                <span>{{ node.label }}</span>
                <el-checkbox-group v-model="editAuthArray" size="mini">
                  <el-checkbox v-for="item in data.edit" :label="item.id" :key="item.id">{{ item.label }}</el-checkbox>
                </el-checkbox-group>
                <span>{{ data.edit }}</span>
              </span>
            </el-tree>
            <span>{{ editAuth }}</span><span>{{ editAuthArray }}</span>
          </template></el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getRolesList, rolesAdd, rolesEdit, deleteRoles } from '@/api/role'
export default {
  components: { Pagination },
  props: {
    auth: {
      type: Object,
      required: false,
      default() {
        return {
          visit: ['个案估价', '批量估价', '问题反馈'],
          edit: ['删除用户', '发布消息']
        }
      }
    }
  },
  data() {
    return {
      editAuthArray: [],
      editAuth: {},
      searchText: null,
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      tableData: [],
      activeRow: {
        id: 1,
        role_name: '管理员',
        staffNum: 10,
        desc: '系统管理员角色。',
        auth: {
          visit: ['个案估价'],
          edit: [1, 2]
        },
        inEdit: false,
        new: false
      },
      data: [
        {
          label: '访问权限',
          children: [
            { label: '个案估价' },
            { label: '批量估价' },
            { label: '问题反馈' }
          ]
        },
        {
          label: '操作权限',
          children: [{ label: '删除用户' }, { label: '发布消息' }]
        }
      ],
      auth2: [
        {
          id: 2,
          label: '争议处理',
          edit: [
            {
              id: 2,
              lebel: '下载报告'
            },
            { id: 3, label: '办结' }
          ],
          children: [
            {
              id: 7,
              label: '价格复核'
            }
          ]
        },
        {
          id: 4,
          label: '数据管理'
        },
        {
          id: 1,
          label: '用户管理'
        }
      ],
      fullAuth: [
        {
          id: 4,
          label: '数据管理'
        },
        {
          id: 5,
          label: '争议处理',
          edit: [
            {
              id: 2,
              label: '下载报告'
            },
            {
              id: 3,
              label: '办结'
            }
          ],
          children: [
            {
              id: 7,
              label: '价格复核'
            }
          ]
        },
        {
          id: 6,
          label: '用户管理',
          edit: [
            {
              id: 1,
              label: '删除'
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.getRolesList()
  },
  methods: {
    getRolesList() {
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      getRolesList(params).then(response => {
        if (response.code === 200) {
          this.tableData = response.data
          this.listQuery.total = response.cnt
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
        dept_name: this.editForm.name,
        dept_desc: this.editForm.desc
      }
      rolesAdd(data).then(response => {
        if (response.code === 200) {
          console.log(response.data)
          // this.dept_id = response.data.id
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
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
    rolesEdit() {
      const data = {
        dept_name: this.editForm.name,
        dept_desc: this.editForm.desc
      }
      rolesEdit(this.editForm.id, data).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
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
    deleteRoles(val) {
      deleteRoles(val).then(response => {
        if (response.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRolesList()
        } else {
          this.$notify({
            title: '删除失败!',
            message: response.msg,
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
        title: '创建角色',
        role_name: '',
        desc: '',
        checkedEdits: [],
        checkedVisits: [],
        checkAllVisit: false,
        checkAllEdit: false,
        isIndeterminateVisit: false,
        isIndeterminateEdit: false
      }
      this.createFormVisible = true
    },
    onSizeChange() {},
    onCurrentChange() {},
    onBtnOKClick() {
      this.createFormVisible = false
    },
    onBtnSaveEditClick(index, row) {
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      row.inEdit = false
    },
    onBtnCancelEditClick(index, row) {
      if (row.new) {
        this.tableData.pop(row)
      }
      row.inEdit = false
    },
    onBtnEditRoleClick(index, row) {
      row.inEdit = true
    },
    onBtnDeleteRoleClick(index, row) {
      if (row.staffNum === 0) {
        this.$confirm('删除操作不可逆，是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
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
    onBtnRoleSearchClick() {},
    onCheckAllVisitChange(val) {
      this.editForm.checkedVisits = val ? this.auth.visit : []
      this.isIndeterminateVisit = false
    },
    onCheckedVisitChange(value) {
      const checkedCount = value.length
      this.editForm.checkAllVisit = checkedCount === this.visitOption.length
      this.isIndeterminateVisit =
        checkedCount > 0 && checkedCount < this.visitOption.length
    },
    onCheckAllEditChange(val) {
      this.editForm.checkedEdits = val ? this.auth.edit : []
      this.isIndeterminateEdit = false
    },
    onCheckedEditChange(value) {
      const checkedCount = value.length
      this.editForm.checkAllEdit = checkedCount === this.editOption.length
      this.isIndeterminateEdit =
        checkedCount > 0 && checkedCount < this.editOption.length
    },
    onBtnAddClick() {
      const newRow = {
        role_name: '',
        staffNum: 0,
        desc: '',
        auth: {
          visit: [],
          edit: []
        },
        inEdit: true,
        new: true
      }
      this.tableData.push(newRow)
      this.activeRow = newRow
    },
    onBtnShowAuthClick(index, row) {
      this.activeRow = row
    },
    getActiveAuthKey() {},
    renderContent() {
      return (
        <span class='custom-tree-node'>
          <span>{ this.node.label}</span>
          <span>
            <el-button
              size='mini'
              type='text'
            >
              Append
            </el-button>
            <el-button
              size='mini'
              type='text'
            >
              Delete
            </el-button>
          </span>
        </span>
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$confirm('当前页面仍有未保存的内容，是否确认离开？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        next()
      })
      .catch(() => {
        next(false)
      })
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox,
.el-radio {
  margin: 0 5px;
  line-height: 15px;
}
.tree-header {
  height: 40px;
  background-color: #3c3b3f;
  color: white;
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
