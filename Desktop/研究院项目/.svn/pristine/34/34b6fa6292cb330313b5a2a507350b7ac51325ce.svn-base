<template>
  <div>
    <el-row class="search-container" style="padding: 5px">
      <el-col :span="16">
        <el-radio-group v-model="taskType" style="margin-left:10px" size="small" @change="handleTaskTypeChange">
          <el-radio-button label="我的任务">我的任务</el-radio-button>
          <el-radio-button label="全部任务">全部任务</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="8">
        <el-input v-model.trim="query" placeholder="请输入内容……" size="small" @change="inputChange" @keyup.enter.native="onSearchTaskClick">
          <el-select slot="prepend" v-model="searchOption.clause" style="width:120px;" placeholder="请选择">
            <el-option label="房产名称" value="房产名称"/>
            <el-option label="产权证号" value="产权证号"/>
            <el-option label="复核人员" value="复核人员"/>
            <el-option label="申请人员" value="申请人员"/>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSearchTaskClick"/>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="padding:5px">
      <el-table
        :data="currentPageTasks"
        :header-cell-style="changeHeaderStyle"
        style="width:100%"
        border
        size="small" >
        <el-table-column label="序号" type="index" width="50"/>
        <el-table-column label="房产名称" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.property_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产权证号" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cert_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.start_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="业主类型" prop="yzlx" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.owner_type }}</span>
          </template>
        </el-table-column>
        <el-table-column :filters="taskNode" :filter-method="filterHandler" prop="node" label="当前节点">
          <template slot-scope="scope">
            <el-tag :type="(scope.row.cur_node === '结果终审'&&scope.row.node_status === '已完成' || scope.row.cur_node === '信息审核'&&scope.row.node_status === '退回') ? 'success' : 'info'" style="margin-left: 10px">
              {{ (scope.row.cur_node === '结果终审'&&scope.row.node_status === '已完成' || scope.row.cur_node === '信息审核'&&scope.row.node_status === '退回') ? '流程结束' : scope.row.cur_node }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="完成时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.end_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button v-if="taskType === '我的任务'" :disabled="(name !==scope.row.operator || scope.row.cur_node === '结果终审'&&scope.row.node_status === '已完成' || scope.row.cur_node === '信息审核'&&scope.row.node_status === '退回')" size="mini" type="primary" @click="handleOperation(scope.$index, scope.row)">
              处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px">
        <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { getReviewTasks } from '@/api/dispute/pricereview'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentPageTasks: [],
      taskNode: [
        { text: '信息审核', value: '信息审核' },
        { text: '现场查勘', value: '现场查勘' },
        { text: '复核估价', value: '复核估价' },
        { text: '结果终审', value: '结果终审' }
      ],
      property_usages: [],
      creators: [],
      query: '',
      taskType: '我的任务',
      listQuery: {
        page: 1,
        limit: 10
      },
      searchOption: {
        clause: '房产名称',
        text: null
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getReviewTasks()
    console.log(this.name)
  },
  methods: {
    getReviewTasks(isSearch) {
      if (!isSearch) {
        this.taskType === '我的任务' ? this.listQuery.participant = this.name : delete this.listQuery.participant
      }
      getReviewTasks(this.listQuery).then(res => {
        console.log(res)
        this.currentPageTasks = res.data
        this.total = res.total_num
      })
    },
    onSearchTaskClick() {
      if (!this.query) {
        this.$message({
          message: '请输入搜索词!',
          type: 'warning'
        })
        return
      }
      this.listQuery = { page: 1, limit: 10 }
      switch (this.searchOption.clause) {
        case '房产名称': this.listQuery.property_name = this.query; break
        case '产权证号': this.listQuery.cert_no = this.query; break
        case '复核人员': this.listQuery.participant = this.query; break
        case '申请人员': this.listQuery.applicant = this.query; break
      }
      this.getReviewTasks(true)
    },
    // 重置task
    inputChange(query) {
      if (!query) {
        this.listQuery = { page: 1, limit: 10 }
        this.getReviewTasks()
      }
    },
    handleTaskTypeChange() {
      this.getReviewTasks()
    },
    handleDetail(index, row) {
      this.$router.push({ name: 'DisputeDetail', params: { taskId: row.taskid, cur_node: row.cur_node, status: row.node_status, username: this.name, operator: row.operator }})
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleOperation(index, row) {
      this.$router.push({ name: 'DisputeDetail', params: { taskId: row.taskid, cur_node: row.cur_node, status: row.node_status, byHandle: true }})
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getReviewTasks()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getReviewTasks()
    },
    changeHeaderStyle() {
      return { backgroundColor: '#304156', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
