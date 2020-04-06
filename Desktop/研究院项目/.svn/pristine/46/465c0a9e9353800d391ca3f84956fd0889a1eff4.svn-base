<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <!-- <el-row :gutter="10" class="user-panel">
      <div style="float:left;margin-left:100px;">
        <img class="user-avatar" src="http://211.154.135.29:88/public/user.png" >
      </div>
      <div style="float:left;margin-left:20px">
        <div style="line-height:40px;font-size:30px;font-weight:bold;">{{ name }}</div>
        <div style="line-height:30px;font-size:20px;margin-top:20px;color:#707070">评估部</div>
      </div>
    </el-row> -->
    <el-row :gutter="10" style="margin-bottom:10px;">
      <el-col :xs="24" :sm="24" :lg="12" :xl="12">
        <el-card style=" width: 100%;">
          <div slot="header" class="clearfix">
            <span class="card-title">待办任务</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onShowMessageCenter">查看更多</el-button>
          </div>
          <div style="height:200px;width:100%">
            <todo-task-box/>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="12">
        <el-card style=" width: 100%;">
          <div slot="header" class="clearfix">
            <span class="card-title">消息中心</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="onShowMessageCenter">查看更多</el-button>
          </div>
          <div style="height:200px;width:100%">
            <message-box/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="12" :xl="12">
        <el-card style=" width: 100%;">
          <div slot="header" class="clearfix">
            <span class="card-title">按区域统计估价对象数量</span>
          </div>
          <div class="chart-wrapper" >
            <!-- <bar-chart :data1="firstHandData_size" :data2="secondHandData_size"/> -->
            <bar-chart />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" :xl="12">
        <el-card style=" width: 100%;">
          <div slot="header" class="clearfix">
            <span class="card-title">按用途统计估价对象数量</span>
          </div>
          <div class="chart-wrapper" >
            <usage-chart />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
import UsageChart from './components/UsageChart'
import MessageBox from './components/MessageBox'
import TodoTaskBox from './components/TodoTaskBox'
export default {
  name: 'Dashboard',
  components: { BarChart, UsageChart, MessageBox, TodoTaskBox },
  data() {
    return {
      messagesList: null,
      noticesList: null,
      rolesNames: '',
      roleName: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'permission_routers'
    ])
  },
  mounted() {
  },
  methods: {
    onShowMessageCenter() {
      this.$router.push({ name: 'MessageManage' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.user-panel{
  background: white;
  margin: 0 0 10px 0;
  padding: 10px;
}
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
