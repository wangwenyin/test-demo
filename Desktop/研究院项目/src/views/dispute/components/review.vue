<template>
  <div>
    <el-form ref="reviewForm" size="small" label-width="150px">
      <span class="sub-title">申请人信息</span>
      <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
      <el-row :gutter="2" style="margin-top:20px;">
        <el-col :span="8">
          <el-form-item label="申请人姓名：">
            <el-input v-model="data.apply_info.name" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码：">
            <el-input v-model="data.apply_info.id_no" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话：">
            <el-input v-model="data.apply_info.mobile" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="8">
          <el-form-item label="申请日期：">
            <el-input v-model="data.apply_info.apply_date" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证：">
            <el-popover
              placement="right"
              title="身份证扫描件："
              width="625"
              trigger="click">
              <img src="../../../assets/dis_default_images/id_photo.jpg">
              <el-button slot="reference" type="text" size="small">点击查看</el-button>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权委托书：">
            <el-popover
              placement="right"
              title="授权委托书扫描件："
              width="625"
              trigger="click">
              <img src="../../../assets/dis_default_images/auth_photo.jpg">
              <el-button slot="reference" type="text" size="small">点击查看</el-button>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="sub-title">权利人信息</span>
      <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
      <el-row :gutter="2" style="margin-top:20px;">
        <el-col :span="8">
          <el-form-item label="名称：">
            <el-input v-model="data.apply_info.owner_name" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码：">
            <el-input v-model="data.apply_info.owner_id_no" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型：">
            <el-input v-model="data.apply_info.owner_type" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="2">
        <el-col :span="8">
          <el-form-item label="证件：">
            <el-popover
              placement="right"
              title="权利人证件扫描件："
              width="625"
              trigger="click">
              <img src="../../../assets/dis_default_images/id_photo.jpg">
              <el-button slot="reference" type="text" size="small">点击查看</el-button>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="sub-title">产权信息</span>
      <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="8">
          <el-form-item label="产权证号：">
            <el-input v-model="data.apply_info.cert_no" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产权证书：">
            <el-popover
              placement="right"
              title="产权证扫描件："
              width="625"
              trigger="click">
              <img src="../../../assets/dis_default_images/cert_photo.jpg">
              <el-button slot="reference" type="text" size="small">点击查看</el-button>
            </el-popover>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        :data="data.property_info"
        style="width:100%"
        border
        fit
        stripe
        size="small">
        <el-table-column label="序号" type="index" width="50" align="center"/>
        <el-table-column label="楼盘" align="center" prop="prj_name"/>
        <el-table-column label="楼栋" align="center" prop="bldg_name"/>
        <el-table-column label="房号" align="center" prop="unit_no"/>
        <el-table-column label="面积" align="center" prop="property_area"/>
      </el-table>
      <span class="sub-title" style="margin-top:20px;display:inline-block">其他信息</span>
      <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="24">
          <el-form-item label="理由陈述：">
            <el-input :rows="3" v-model="data.apply_info.reason" readonly type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <span class="sub-title">审核结果</span>
      <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="6">
          <el-form-item label="">
            <el-radio v-model="data.node_info.flag" :label="1">通过</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配估价师：">
            <el-select v-model="data.node_info.appraiser" placeholder="请选择" size="small">
              <el-option
                v-for="(item, index) in appraisers"
                :key="index"
                :value="item.real_name"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="">
            <el-button :disabled="node!==cur_node || username !== operator || status === '退回'" type="primary" @click="onSubmitClick">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="">
            <el-radio v-model="data.node_info.flag" :label="0">不通过</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="不通过理由：">
            <el-input :rows="3" :disabled="node!==cur_node || username !== operator || status === '退回'" v-model="data.node_info.reason" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="">
            <el-button :disabled="node!==cur_node || username !== operator || status === '退回'" type="primary" @click="onSendBackClick">退回申请人</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getReviewDetail, updateReivew, getUsers } from '@/api/dispute/pricereview'

export default {
  name: 'AppealReview',
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
      node: '信息审核',
      data: {
        apply_info: {
          owner_name: '',
          owner_type: '',
          name: '',
          owner_id_no: '',
          cert_no: '',
          mobile: '',
          apply_date: '',
          usage: '',
          reason: '',
          id_photo: '',
          cert_photo: '',
          auth_photo: ''
        },
        node_info: {
          flag: 1,
          appraiser: '',
          reason: ''
        },
        property_info: []
      },
      appraisers: [],
      listQuery: {
        role: 'appraiser',
        limit: 10,
        page: 1
      }
    }
  },
  computed: {
    // 获取图片的baseUrl
    baseUrl() {
      const baseURL = process.env.BASE_API
      const baseUrl = baseURL.slice(0, baseURL.length - 2)
      return baseUrl
    }
  },
  created() {
    this.getAppraiser()
    this.getReviewDetail()
  },
  methods: {
    // 获取信息审核详情
    getReviewDetail() {
      const params = {
        id: this.taskId,
        node: this.node
      }
      getReviewDetail(params).then(res => {
        this.data = res.data
      })
    },
    // 获取评估人员列表
    getAppraiser() {
      getUsers(this.listQuery).then(res => {
        this.appraisers = res.data
      })
    },
    // 提交到下一步
    onSubmitClick() {
      const data = { node: this.node, ...this.data.node_info }
      delete data.reason
      if (data.flag) {
        if (data.appraiser) {
          this.loading = true
          updateReivew(this.taskId, data).then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$message({
                message: '提交成功!',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({ name: 'DisputeTask' })
              }, 1000)
            } else {
              this.$message({
                message: '未知原因,请重新提交!',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请分配估价师!',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择通过!',
          type: 'warning'
        })
      }
    },
    // 处理回退事务
    onSendBackClick() {
      const data = { node: this.node, ...this.data.node_info }
      delete data.appraiser
      if (!data.flag) {
        if (data.reason) {
          this.loading = true
          updateReivew(this.taskId, data).then(res => {
            this.loading = false
            if (res.code === 200) {
              this.$message({
                message: '已退回申请人!',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({ name: 'DisputeTask' })
              }, 1000)
            } else {
              this.$message({
                message: '未知原因,请重新提交!',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '请填写不通过的原因!',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请选择不通过!',
          type: 'warning'
        })
      }
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
.sub-title {
    font-size: 16px;
    color: grey;
    line-height: 20px;
    font-weight: 600;
}
.el-popover img {
  width: 100%;
  height: 400px;
}
</style>
