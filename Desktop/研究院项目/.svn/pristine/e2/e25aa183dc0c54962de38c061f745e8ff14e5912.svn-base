<template>
  <div>
    <span class="sub-title">复核估价摘要信息</span>
    <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
    <el-form ref="reviewForm" size="small" label-width="150px">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-form-item label="房地产名称：">
            <el-input :value="data.report.property_name" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产权证号：">
            <el-input :value="data.report.cert_no" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="调整前单价：">
            <el-input :value="data.report.each_price_pre" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调整后单价：">
            <el-input :value="data.report.each_price_rev" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          <el-form-item label="调整前总价">
            <el-input :value="data.report.total_price_pre" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="调整后总价：">
            <el-input :value="data.report.total_price_rev" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="24">
          <el-form-item label="调整原因">
            <el-input :rows="5" v-model="data.node_info.reason" :readonly="node!==cur_node" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span class="sub-title" >流程信息</span>
    <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="12">
        <el-button size="small" type="info" icon="el-icon-download" @click="downloadReport">下载估价报告</el-button>
        <el-button v-if="data.node_status==='退回'" size="small" type="warning">调整个案估价</el-button>
      </el-col>
      <el-col :span="12" style="text-align:right">
        <el-select v-model="data.node_info.final_reviewer" placeholder="选择终审人员" size="small">
          <el-option
            v-for="(item, index) in final_reviewers"
            :key="index"
            :value="item.real_name"/>
        </el-select>
        <el-button :disabled="node!==cur_node || username !== operator" size="small" type="primary" @click="onSubmitFinalReviewClick">提交终审</el-button>
      </el-col>
    </el-row>
    <div v-if="data.back_reason" class="back-reason">退回原因：{{ data.back_reason }}</div>
  </div>
</template>
<script>
import { getAppraisalDetail, updateAppraisal, getUsers } from '@/api/dispute/pricereview'

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
    }
  },
  data() {
    return {
      node: '复核估价',
      final_reviewers: [],
      data: {
        node_status: '',
        back_reason: '',
        report: {
          property_name: '',
          cert_no: '',
          each_price_pre: '',
          each_price_rev: '',
          total_price_rev: '',
          built_area: '',
          download_url: ''
        },
        node_info: {
          final_reviewer: '',
          reason: ''
        }
      },
      listQuery: {
        role: 'final_reviewer',
        limit: 10,
        page: 1
      },
      downloadUrl: 'http://test.daoheit.com/static/singlereport/2018-108.pdf'
    }
  },
  created() {
    this.getFinalReviewers()
    this.getAppraisalDetail()
  },
  methods: {
    // 获取评估详情
    getAppraisalDetail() {
      const params = {
        id: this.taskId,
        node: this.node
      }
      getAppraisalDetail(params).then(res => {
        // 防止报错（由于后台无report和node_info）
        if (!res.data.report) {
          res.data.report = {}
          res.data.node_info = { final_reviewer: '', reason: '' }
        }
        this.data = res.data
      })
    },
    // 获取终审人员列表
    getFinalReviewers() {
      getUsers(this.listQuery).then(res => {
        this.final_reviewers = res.data
      })
    },
    // 提交终审
    onSubmitFinalReviewClick() {
      if (!this.data.node_info.final_reviewer) {
        this.$message({
          message: '请选择终审人员!',
          type: 'warning'
        })
        return
      } else if (!this.data.node_info.reason) {
        this.$message({
          message: '请输入理由!',
          type: 'warning'
        })
        return
      }
      const data = {
        node: this.node,
        ...this.data.node_info
      }
      updateAppraisal(this.taskId, data).then(res => {
        this.$message({
          message: '提交成功!',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ name: 'DisputeTask' })
        }, 1000)
      })
    },
    downloadReport() {
      // 新窗口打开
      window.open(this.downloadUrl)
    }
  }
}
</script>
<style lang="scss" scoped>
.back-reason {
  margin-top: 10px;
  font-size: 14px;
  color: red
}
</style>
