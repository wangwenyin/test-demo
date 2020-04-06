<template>
  <div>
    <span class="sub-title">审核结果</span>
    <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="24">
        <el-radio-group v-model="isPass">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">不通过</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row v-if="isPass === 1" :gutter="20" style="margin-top:40px;">
      <!-- <el-col :span="6" >
        <el-checkbox >价格上线</el-checkbox>
      </el-col> -->
      <el-col :span="6">
        <el-button :disabled="(cur_node === '结果终审' && status === '已完成') || username !== operator" type="primary" @click="onProcessEndClick">提交并结束流程</el-button>
      </el-col>
    </el-row>
    <el-row v-else :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <el-input v-model="reason" :rows="5" :readonly="node!==cur_node" type="textarea" placeholder="请说明不通过审核的理由"/>
      </el-col>
      <el-col :span="6">
        <el-button :disabled="(cur_node === '结果终审' && status === '已完成') || username !== operator" type="primary" @click="onSendBackClick">退回估价师</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getFinalReivewDetail, updateFinalReivew } from '@/api/dispute/pricereview'

export default {
  props: {
    taskId: {
      type: String,
      default: ''
    },
    cur_node: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    operator: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      node: '结果终审',
      isPass: 1,
      reason: ''
    }
  },
  created() {
    if (this.cur_node === '结果终审' && this.status === '已完成') {
      this.getFinalReivewDetail()
    }
  },
  methods: {
    // 获取终审详情
    getFinalReivewDetail() {
      const params = {
        id: this.taskId,
        node: this.node
      }
      getFinalReivewDetail(params).then(res => {
        this.isPass = res.data.node_info.flag
        this.reason = res.data.node_info.reason
      })
    },
    // 点击结束流程
    onProcessEndClick() {
      const data = {
        node: this.node,
        is_pass: this.isPass
      }
      updateFinalReivew(this.taskId, data).then(res => {
        this.$message({
          message: '提交成功!',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ name: 'DisputeTask' })
        }, 1000)
      })
    },
    // 退回估价师
    onSendBackClick() {
      const data = {
        node: this.node,
        is_pass: this.isPass,
        reason: this.reason
      }
      updateFinalReivew(this.taskId, data).then(res => {
        this.$message({
          message: '已退回估价师!',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ name: 'DisputeTask' })
        }, 1000)
      })
    },
    changeTaskStatus(node, status, i) {
      this.$store.commit('changeTaskStatus', { node, status, i })
      setTimeout(() => {
        this.$router.push({ name: 'DisputeTask' })
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
