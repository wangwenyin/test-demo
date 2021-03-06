<template>
  <div>
    <el-row class="search-box">
      <el-col :span="16">
        <el-button type="primary" size="small" round @click="onCreateTaskClick">+新增查勘</el-button>
        <el-radio-group v-model="taskType" style="margin-left:10px" size="small" @change="onTaskTypeChange">
          <el-radio-button label="进行中">进行中</el-radio-button>
          <el-radio-button label="已完成">已完成</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="8">
        <el-input v-model="searchOption.text" placeholder="请输入查询内容" size="small" >
          <el-select slot="prepend" v-model="searchOption.clause" style="width:120px;" placeholder="请选择">
            <el-option label="任务编号" value="任务编号" />
            <el-option label="物业名称" value="物业名称" />
            <el-option label="查勘人" value="查勘人" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSearchTaskClick"/>
        </el-input>
      </el-col>
    </el-row>
    <el-row style="padding:5px">
      <el-table ref="taskTable" :data="taskList" :header-cell-style="changeHeaderStyle" style="width:100%" border fit stripe size="small" >
        <el-table-column prop="id" label="序号" width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="task_id" width="100" label="任务编号" />
        <el-table-column prop="source_task_id" width="100" label="来源任务编号" />
        <el-table-column prop="task_type" label="任务类型" width="100" />
        <el-table-column prop="survey_type" label="查勘类型" width="120" />
        <el-table-column prop="property_name" label="物业名称" min-width="150" />
        <el-table-column prop="surveyor" label="查勘人" width="100" />
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column prop="status" label="状态" width="100" >
          <template slot-scope="scope">
            <el-tag :type="setTagTypeByState(scope.row.status)" size="mini" >
              <span v-if="scope.row.status === 1">待查勘</span>
              <span v-if="scope.row.status === 2">查勘中</span>
              <span v-if="scope.row.status === 3">待审核</span>
              <span v-if="scope.row.status === 4">重勘中</span>
              <span v-if="scope.row.status === 5">已完成</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finish_date" label="预计完成时间" width="100" >
          <template slot-scope="scope">
            <span >{{ getParseTime(scope.row.finish_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="onDetailClick(scope.row)">详情</el-button>
              <el-button :disabled="scope.row.status === 2 || scope.row.status === 3 || scope.row.status === 5||scope.row.creator !== name" size="mini" type="primary" @click="onEditClick(scope.row)">编辑</el-button>
              <el-button :disabled="scope.row.status === 2 || scope.row.status === 3 || scope.row.status === 5||scope.row.creator !== name" size="mini" type="danger" @click="onDeleteClick(scope.row)" >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px">
        <pagination
          :total="listQuery.total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="listQuery.pageSizes"
          @pagination="getTaskList" />
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
import { parseTime } from '@/utils/index'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { getSurveyTaskList, deleteSurveyTask } from '@/api/survey'
export default {
  components: { Pagination },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatYear(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy')
    }
  },
  data() {
    return {
      taskType: '进行中',
      listQuery: {
        page: 1,
        limit: 10,
        total: 0,
        pageSizes: [10, 20, 30, 50]
      },
      searchOption: {
        clause: '请选择',
        text: ''
      },
      taskList: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.getTaskList()
  },
  methods: {
    setTagTypeByState(state) {
      if (state === 1) {
        return ''
      } else if (state === 2) {
        return 'info'
      } else if (state === 3) {
        return 'warning'
      } else if (state === 4) {
        return 'danger'
      } else {
        return 'success'
      }
    },
    onTaskTypeChange() {
      this.getTaskList({ page: 1, limit: 10 })
    },
    onEditClick(val) {
      this.$router.push({ name: 'EditSurvey', query: { task_id: val.task_id }})
    },

    onDeleteClick(val) {
      this.$confirm('删除操作不可逆，是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSurveyTask(val.task_id, { survey_type: val.survey_type }).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.getTaskList({ page: 1, limit: 10 })
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除！'
            })
          }
        })
      })
    },
    onCreateTaskClick() {
      this.$router.push({ name: 'AddSurvey', query: { source_task_id: '2018-22' }})
    },
    getTaskList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        task_id: (this.searchOption.clause === '任务编号' ? this.searchOption.text : null),
        property_name: (this.searchOption.clause === '物业名称' ? this.searchOption.text : null),
        surveyor: (this.searchOption.clause === '查勘人' ? this.searchOption.text : null)
      }
      if (this.taskType === '进行中') {
        params.status = '1,2,3,4'
      } else {
        params.status = '5'
      }
      getSurveyTaskList(params).then(response => {
        if (response.code === 200) {
          this.taskList = response.data
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
    getParseTime(date) {
      return parseTime(new Date(date), '{y}-{m}-{d}')
    },
    onSearchTaskClick() {
      this.getTaskList({ page: 1, limit: 10 })
    },
    onDetailClick(val) {
      const routerData = {
        name: 'SurveyDetail',
        query: { task_id: val.task_id }
      }
      this.$router.push(routerData)
    },
    changeHeaderStyle() {
      return { backgroundColor: '#3C3B3F', width: '100%', color: '#FFFFFF' }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
