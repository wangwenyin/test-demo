<template>
  <div>
    <el-row class="search-container" style="padding: 5px" >
      <el-button type="primary" size="small" round style="float:left;margin-left:10px;" @click="onBtnPublishClick" >添加问答</el-button>
      <el-input v-model="searchOption.text" placeholder="请输入查询内容" size="small" style="float:right;margin-right:10px;width:400px" @keyup.enter.native="onInputEnter">
        <el-select slot="prepend" v-model="searchOption.clause" style="width:120px;" placeholder="请选择" >
          <el-option label="问题" value="问题" />
          <el-option label="答案" value="答案" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="onSearchFaqsClick" />
      </el-input>
    </el-row>
    <div style="margin:10px;">
      <el-table :data="list" :header-cell-style="changeHeaderStyle" style="width: 100%;" border fit size="small" >
        <el-table-column label="序号" type="index" width="50" align="center" />
        <el-table-column prop="question" label="问题" min-width="250" show-overflow-tooltip align="center" />
        <el-table-column prop="answer" label="答案" min-width="300" show-overflow-tooltip align="center" />
        <el-table-column prop="hit" label="热度" width="200px" sortable align="center" />
        <el-table-column align="center" prop="state" width="100px" label="状态" />
        <el-table-column prop="op" label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.state === '已删除'" size="mini" type="primary" @click="onBtnEditClick(scope.$index, scope.row)" >编辑</el-button>
            <el-button v-if="scope.row.state !== '已删除'" size="mini" type="warning" @click="onUpdateState(scope.row,'已删除','删除')" >
              删除
            </el-button>
            <el-button v-if="scope.row.state === '已删除'" size="mini" @click="onUpdateState(scope.row,'普通','恢复')" >
              恢复
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
          @pagination="getFaqs" />
      </el-row>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getFaqs, updateFaqs } from '@/api/publicservice/faqs'
export default {
  components: { Pagination },
  data() {
    return {
      searchOption: {
        clause: '问题',
        text: null
      },
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      list: []
    }
  },
  mounted() {
    this.getFaqs()
  },
  methods: {
    onInputEnter() {
      this.getFaqs({ page: 1, limit: 10 })
    },
    getFaqs(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        question:
          this.searchOption.clause === '问题' ? (this.searchOption.text === '' ? null : this.searchOption.text) : null,
        answer:
          this.searchOption.clause === '答案' ? (this.searchOption.text === '' ? null : this.searchOption.text) : null
      }
      getFaqs(params).then(response => {
        if (response.code === 200) {
          this.list = response.data
          this.listQuery.total = response.cnt
        } else {
          this.$message({
            type: 'error',
            message: '数据获取出错!',
            duration: 5 * 1000
          })
        }
      })
    },
    onUpdateState(row, state, val) {
      const data = {
        state: state
      }
      this.$confirm('此操作将' + val + '该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateFaqs(row.faq_id, data).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: val + '成功!'
            })
            row.state = state
          } else {
            this.$message({
              type: 'info',
              message: val + '失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    },
    onBtnPublishClick() {
      this.$router.push({ name: 'FAQPublish' })
    },
    onBtnEditClick(index, row) {
      this.$router.push({ name: 'FAQModify', query: { faq_id: row.faq_id }})
    },
    onSearchFaqsClick() {
      this.getFaqs({ page: 1, limit: 10 })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 200px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

