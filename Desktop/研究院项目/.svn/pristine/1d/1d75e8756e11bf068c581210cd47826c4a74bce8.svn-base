<template>
  <div style="margin:10px;">
    <net-value ref="netValueForm" :form="form"/>
    <el-row >
      <el-col :span="20" :offset="2">
        <el-button v-if="editEnabled" size="small" class="btn_l" style="margin-right:7.5%" @click="onCancelClick">取消</el-button>
        <el-button v-if="editEnabled" size="small" class="btn_l" @click="onNextStepClick(false)">保存</el-button>
        <el-button v-if="editEnabled" size="small" class="btn_l" type="primary" @click="onNextStepClick(true)">提交</el-button>
        <el-button v-if="editEnabled" size="small" class="btn_l" type="primary" @click="onPreviousStepClick">上一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTaskInfo } from '@/api/singleapp'
import { getNetWorth, saveNetWorth } from '@/api/netvalue'
import NetValue from '@/views/tools/NetValue'
export default {
  components: { NetValue },
  data() {
    return {
      editEnabled: true,
      taskId: '',
      form: {}
    }
  },
  mounted() {
    this.init()
    this.getTaskInfo()
  },
  methods: {
    init() {
      this.taskId = this.$route.query.taskId
      getNetWorth(this.taskId).then(response => {
        if (response.code === 200) {
          this.form = response.data
          // 将不是住宅的转换为非住宅
          this.form.house_usage = (this.form.house_usage === '住宅' || this.form.house_usage === '') ? '住宅' : '非住宅'
          // this.form.full_two_year = response.data.full_two_year + ''
          // this.form.ordinary_house = response.data.ordinary_house + ''
        } else {
          alert(response.msg)
        }
      })
    },
    getTaskInfo() {
      getTaskInfo(this.taskId).then(response => {
        if (response.code === 200) {
          this.taskInfo = response.data
          if (this.taskInfo.status === '任务完成') {
            this.editEnabled = false
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
    onPreviousStepClick() {
      this.$router.push({ name: 'SingleappAdjustment', query: { taskId: this.taskId }})
    },
    onCancelClick() {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    },
    onNextStepClick(type) {
      const data = this.$refs.netValueForm.getFormData()
      data.house_no = this.form.house_no
      data.submit = type
      saveNetWorth(this.taskId, data).then(response => {
        if (response.code === 200) {
          if (type) {
            this.$message({ message: '提交成功', type: 'success' })
          } else {
            this.$message({ message: '保存成功', type: 'success' })
          }

          if (response.status === '净值测算') {
            const routerData = {
              name: 'SingleappNetValue',
              query: { taskId: this.taskId, status: '净值测算' }
            }
            this.$router.push(routerData)
          }
          if (response.status === '报告撰写') {
            const routerData = {
              name: 'SingleappReport',
              query: { taskId: this.taskId, status: '报告撰写' }
            }
            this.$router.push(routerData)
          }
        } else {
          alert(response.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn_l{
  float: right;
  margin-right:2%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
