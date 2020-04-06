<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row style="margin:20px 0 10px 10px;">
          <div style="font-size:20px;">{{ taskInfo.name }}</div>
        </el-row>
        <el-row style="border-bottom: 1px solid #d8dce5;margin-bottom:20px;">
          <el-col :span="4">
            <div class="row-container" style="font-size:20px;font-weight:bold;margin-top:10px">任务信息</div>
          </el-col>
          <el-col :span="20">
            <div v-if="buttonShow" class="row-container" style="float:right">
              <el-button :disabled="!checkCanOperate" type="primary" size="medium" @click="onOperationClick">作业</el-button>
              <el-button :disabled="!checkCanDelete" type="danger" size="medium" @click="onDeleteTaskClick">删除</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">任务编号：</div>
            <div class="col-item-label">委托人：</div>
            <div class="col-item-label">估价方法：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ taskInfo.id }}</div>
            <div class="col-item-value">{{ taskInfo.client }}</div>
            <div class="col-item-value">{{ taskInfo.method }}</div>
          </el-col>
          <el-col :span="3" class="row-container">
            <div class="col-item-label">负责人：</div>
            <div class="col-item-label">参与人员：</div>
            <div class="col-item-label">估价目的：</div>
          </el-col>
          <el-col :span="5" class="row-container">
            <div class="col-item-value">{{ taskInfo.creator }}</div>
            <el-tooltip placement="top">
              <div slot="content">{{ taskInfo.members }}</div>
              <div class="col-item-value">{{ taskInfo.members }}</div>
            </el-tooltip>
            <div class="col-item-value">{{ taskInfo.purpose }}</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-label">创建时间：</div>
            <div class="col-item-label">预计完成时间：</div>
            <div class="col-item-label">价值时点：</div>
          </el-col>
          <el-col :span="4" class="row-container">
            <div class="col-item-value">{{ taskInfo.create_time }}</div>
            <div class="col-item-value">{{ taskInfo.plan_time }}</div>
            <div class="col-item-value">{{ taskInfo.value_date }}</div>
          </el-col>
        </el-row>
        <el-row style="top:-20px">
          <el-col :span="3" class="row-container">
            <div class="col-item-label">备  注：</div>
          </el-col>
          <el-col :span="21" class="row-container">
            <div class="col-item-value">{{ taskInfo.note }}</div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <div class="row-container" style="margin-bottom:20px;font-size:20px;font-weight:bold;margin-top:10px;border-bottom: 1px solid #d8dce5;">
              任务进度
              <span style="font-size:12px;color:grey;float:right">注：点击任务节点可进入相应页面</span>
            </div>
          </el-col>
        </el-row>
        <appraisal-progress :step="step" :task-id="taskId" :method="method" disabled @onStepClick="onStepClick"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTaskInfo, deleteTask, getProperty } from '@/api/singleapp'
import AppraisalProgress from './components/AppraisalProgress'
export default {
  components: { AppraisalProgress },
  data() {
    return {
      taskInfo: {},
      taskId: '',
      step: 0,
      buttonShow: false,
      propertyInfo: {},
      method: ''
    }
  },
  computed: {
    checkCanDelete() {
      if (this.$store.state.user.name === this.taskInfo.creator) {
        return true
      } else {
        return false
      }
    },
    checkCanOperate() {
      if (this.taskInfo.members.indexOf(this.$store.state.user.name) < 0) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.setStep()
    this.method = this.$route.query.method
  },
  mounted() {
    this.GetTaskInfo()
    // this.GetcompareList()
  },
  methods: {
    onStepClick(val) {
      // 如果不是参与人员，阻止点击
      if (!this.checkCanOperate) {
        return
      }
      // 如果为当前状态，则进入作业页面，否则进入详情页面
      if (val.text === this.taskInfo.status) {
        this.onOperationClick()
      } else
      if (val.text === '实例选取') {
        if (this.taskInfo.status !== '任务完成') {
          getProperty({ task_id: this.taskId }).then(response => {
            if (response.code === 200) {
              this.propertyInfo = response.data
              val.query.prj_no = response.data.prj_no
              this.$router.push({ name: val.goto, query: val.query })
            } else {
              this.$notify({
                title: '失败',
                message: response.msg,
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      } else {
        this.$router.push({ name: val.goto, query: val.query })
      }
    },
    setStep() {
      if (this.$route.query.method === '比较法') {
        switch (this.$route.query.status) {
          case '选取方法': this.step = 0; break
          case '实例选取': this.step = 1; break
          case '价格评估': this.step = 2; break
          case '报告撰写': this.step = 3; break
          case '价格复核': this.step = 4; break
          case '任务完成': this.step = 5; break
        }
      }
      if (this.$route.query.method === '成本法') {
        switch (this.$route.query.status) {
          case '选取方法': this.step = 0; break
          case '成本测算': this.step = 1; break
          case '报告撰写': this.step = 3; break
          case '价格复核': this.step = 4; break
          case '任务完成': this.step = 5; break
        }
      }
      if (this.$route.query.method === '收益法') {
        switch (this.$route.query.status) {
          case '选取方法': this.step = 0; break
          case '实例选取': this.step = 1; break
          case '租金评估': this.step = 2; break
          case '收益测算': this.step = 3; break
          case '报告撰写': this.step = 5; break
          case '价格复核': this.step = 6; break
          case '任务完成': this.step = 7; break
        }
      }
    },
    GetTaskInfo() {
      this.taskId = this.$route.query.taskId
      getTaskInfo(this.taskId).then(response => {
        this.taskInfo = response.data
        this.buttonShow = true
        // this.setStep()
      })
    },
    onOperationClick() {
      switch (this.taskInfo.status) {
        case '租金评估':
        case '价格评估': this.$router.push({ name: 'SingleappAdjustment', query: { taskId: this.taskId, method: this.taskInfo.method }}); break
        case '实例选取': getProperty({ task_id: this.taskId }).then(response => {
          this.$router.push({ name: 'CaseSearch', query: { caller: 'singleapp', prj_no: response.data.prj_no, taskId: this.taskId, method: this.taskInfo.method }})
        }); break
        case '收益测算': this.$router.push({ name: 'SingleappAppraisedRent', query: { taskId: this.taskId }}); break
        case '报告撰写': this.$router.push({ name: 'SingleappReport', query: { taskId: this.taskId }}); break
      }
    },
    onDeleteTaskClick() {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask(this.taskId).then(response => {
          const result = response
          if (result.code === 200) {
            this.$notify({
              title: '成功',
              message: '删除任务成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'SingleappTasks' })
          } else {
            this.$notify({
              title: '失败',
              message: '删除任务失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.row-container{
    padding: 10px;
    /* margin-top: 10px; */
}
.col-item-label {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    text-align: left;
}
.col-item-value {
    /* margin-top: 10px; */
    margin-bottom: 20px;
    color: grey;
    text-align: left;
     overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
}
.task-detail .el-step {
  &:hover {
    .el-step__head .el-step__icon, .el-step__main {
      transition: transform 0.3s ease;
      transform: scale(1.1);
      transform-origin: center;
    }
  }
  .el-step__head .el-step__icon, .el-step__main {
    cursor: pointer;
    transition: transform 0.3s ease;
    transform-origin: center;
  }
}
</style>
