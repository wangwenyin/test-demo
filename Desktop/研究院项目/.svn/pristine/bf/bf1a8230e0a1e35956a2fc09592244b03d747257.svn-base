<template>
  <div>
    <el-row class="search-box">
      <el-col :span="16">
        <el-button type="primary" size="small" round @click="onCreateRatioClick">+比率分析</el-button>
        <el-radio-group v-model="taskType" style="margin-left:10px" size="small" @change="onTaskTypeChange">
          <el-radio-button label="我的任务">我的任务</el-radio-button>
          <el-radio-button label="全部任务">全部任务</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="8">
        <el-input v-model="searchOption.text" placeholder="请输入查询内容" size="small" >
          <el-select slot="prepend" v-model="searchOption.clause" style="width:120px;" placeholder="请选择">
            <el-option label="任务名称" value="任务名称" />
            <el-option label="创建人员" value="创建人员" />
            <el-option label="物业用途" value="物业用途" />
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
        <el-table-column prop="name" width="300" label="任务名称" />
        <el-table-column label="创建人员" width="150">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.creator }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.create_date| formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="property_type" label="物业类型" />
        <el-table-column prop="property_usage" label="物业用途" />
        <el-table-column prop="state" label="任务状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">参数设定</span>
            <span v-if="scope.row.state === 2">比率分析</span>
            <span v-if="scope.row.state === 3">审核完毕</span>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="审核结果" >
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1">待审核</span>
            <span v-if="scope.row.state === 2">待审核</span>
            <span v-if="scope.row.state === 3">通过</span>
            <span v-if="scope.row.state === 4">未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div> <!--  -->
              <el-button size="mini" @click="onDetailClick(scope.row)">详情</el-button>
              <el-button :disabled="scope.row.state === 3 || scope.row.creator !== name" type="primary" size="mini" @click="onWorkClick(scope.row)" >作业</el-button>
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
          @pagination="getRatioList" />
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
import { getRatioTaskList } from '@/api/ratio'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
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
      taskType: '我的任务',
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
    this.getRatioList()
  },
  methods: {
    onCreateRatioClick() {
      this.$router.push({ name: 'Paramset' })
    },
    getRatioList(val) {
      if (val) {
        this.listQuery.limit = val.limit
        this.listQuery.page = val.page
      }
      const params = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        name: (this.searchOption.clause === '任务名称' ? this.searchOption.text : null),
        creator: (this.searchOption.clause === '创建人员' ? this.searchOption.text : null),
        property_usage: (this.searchOption.clause === '物业用途' ? this.searchOption.text : null)
      }
      if (!params.creator) {
        if (this.taskType === '我的任务') {
          params.creator = this.name
        }
      }
      getRatioTaskList(params).then(response => {
        if (response.code === 200) {
          this.taskList = response.data
          this.listQuery.total = response.total_num
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
    onWorkClick(val) {
      if (val.state === 1) {
        const routerData = {
          name: 'Paramset',
          query: { id: val.id }
        }
        this.$router.push(routerData)
      } else if (val.state === 2) {
        const routerData = {
          name: 'Rateanal',
          query: { id: val.id }
        }
        this.$router.push(routerData)
      }
    },
    onTaskTypeChange(val) {
      this.searchOption.clause = '请选择'
      this.searchOption.text = ''
      this.getRatioList({ page: 1, limit: 10 })
    },
    onSearchTaskClick() {
      this.getRatioList({ page: 1, limit: 10 })
    },
    onDetailClick(val) {
      const routerData = {
        name: 'RatioDetail',
        query: { id: val.id }
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
