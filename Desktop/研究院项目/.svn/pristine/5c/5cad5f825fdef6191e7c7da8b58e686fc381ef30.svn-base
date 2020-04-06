<template>
  <div class="feedback">
    <div class="feedback__title">
      {{ title }}
    </div>
    <el-row :gutter="10" class="feedback__desc">
      <el-col :span="6" :offset="2">
        <span>反馈人：{{ user }}</span>
      </el-col>
      <el-col :span="6">
        <span>发布日期：{{ time }}</span>
      </el-col>
      <el-col :span="6">
        <span>问题类型：{{ type }}</span>
      </el-col>
    </el-row>
    <hr style="border:1 dashed #E8E8E8" color="#E8E8E8" size="1">
    <el-row class="feedback__content">
      <div v-html="content"/>
    </el-row>
  </div>
</template>
<script>
import { getFeedBacksById } from '@/api/feedback'
export default {
  data() {
    return {
      fd_id: '',
      title: '',
      content: '',
      user: '',
      time: '',
      type: ''
    }
  },
  mounted() {
    this.getFeedBackDetail()
  },
  methods: {
    getFeedBackDetail() {
      this.fd_id = this.$route.query.fd_id
      if (this.fd_id) {
        getFeedBacksById(this.fd_id).then(response => {
          if (response.code === 200) {
            const data = response.data
            this.time = data.time
            this.title = data.title
            this.content = data.content
            this.user = data.user
            this.type = data.type
          } else {
            this.$notify({
              title: '获取消息失败',
              message: response.msg,
              type: 'error',
              duration: 2000
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.feedback {
    margin: 20px;
    .feedback__title {
        font-size: 30px;
        line-height: 30px;
        text-align: center;
    }
    .feedback__desc  {
        color: grey;
        text-align: center;
        font-size: 15px;
        line-height: 18px;
        margin: 20px auto 10px auto;
    }
    .feedback__content {
        font-size:18px;
        margin: 0px 30px 0 30px;
        text-indent:2em;
        line-height: 30px;
    }
}
</style>
