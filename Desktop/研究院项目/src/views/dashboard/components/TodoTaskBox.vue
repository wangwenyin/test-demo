<template>
  <div class="messagebox-container">
    <el-row :gutter="10" class="message">
      <el-col :span="16">
        <div v-for="item in messageList" :key="item.id" class="message-item">
          -&nbsp;<span :class="{'mread': item.status === '未读'}" @click="onMessageClick(item.id)">{{ item.title }}</span>
        </div>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <div v-for="item in messageList" :key="item.id" >
          <span>{{ item.publish_time }}
        </span></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUserMessages } from '@/api/message'
export default {
  data() {
    return {
      messageList: []
    }
  },
  mounted() {
    this.getUserMessages()
  },
  methods: {
    onMessageClick(val) {
      this.$router.push({ name: 'MessageDetail', query: { msgId: val }})
    },
    getUserMessages() {
      const params = {
        login_name: this.$store.state.user.login_name,
        status: '全部'
      }
      getUserMessages(params).then(response => {
        if (response.code === 200) {
          this.messageList = response.data
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
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.messagebox-container {
    .mread {
        position: relative;
        margin: 8px auto 0px auto;
        color: red;
        font-weight: bold;
    }
    .message {
      margin: 8px auto 0px auto;
      font-size: 14px;
      line-height: 24px;
      .message-item {
        cursor: pointer;
      }
    }
    .mread::before{
        content: " ";
        border: 3px solid red;/*设置红色*/
        border-radius:3px;/*设置圆角*/
        position: absolute;
        z-index: 1000;
        right: 0px;
        margin-right: -6px;
        margin-top: 5px;
    }
}

</style>
