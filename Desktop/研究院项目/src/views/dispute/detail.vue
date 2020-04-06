<template>
  <div class="appeal-container">
    <div class="step-container">
      <el-steps :active="active" finish-status="success" simple >
        <el-step v-for="item in steps" :key="item.index" :title="item.title" @click.native="onStepClick(item)"/>
      </el-steps>
    </div>
    <div style="margin:10px;">
      <el-row>
        <el-col :span="20" :offset="2">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="currentMode" :has-padding="false" :task-id="taskId" :cur_node="cur_node" :username="username" :operator="operator" :status="status" />
            </keep-alive>
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Review from './components/Review'
import FieldSurvey from './components/FieldSurvey'
import Appraisal from './components/Appraisal'
import FinalReview from './components/FinalReview'

export default {
  components: { Review, FieldSurvey, Appraisal, FinalReview },
  data() {
    return {
      taskId: '',
      cur_node: '',
      username: '',
      operator: '',
      status: '',
      active: 0,
      currentMode: 'review',
      steps: [
        { title: '信息审核', index: 0 },
        { title: '现场查勘', index: 1 },
        { title: '复核估价', index: 2 },
        { title: '结果终审', index: 3 }
      ]
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      const params = this.$route.params
      this.taskId = params.taskId
      this.cur_node = params.cur_node
      this.username = params.username
      this.operator = params.operator
      this.status = params.status
      if (params.byHandle) {
        switch (params.cur_node) {
          case '信息审核': this.currentMode = 'review'; break
          case '现场查勘': this.currentMode = 'field-survey'; break
          case '复核估价': this.currentMode = 'appraisal'; break
          case '结果终审': this.currentMode = 'final-review'; break
        }
      }
      if (params.cur_node === '结果终审' && params.status === '已完成') {
        params.cur_node = '流程结束'
      }
      switch (params.cur_node) {
        case '信息审核': this.active = 0; break
        case '现场查勘': this.active = 1; break
        case '复核估价': this.active = 2; break
        case '结果终审': this.active = 3; break
        case '流程结束': this.active = 4; break
      }
    },
    onStepClick(item) {
      if (item.index > this.active) {
        return
      }
      switch (item.title) {
        case '信息审核': this.currentMode = 'review'; break
        case '现场查勘': this.currentMode = 'field-survey'; break
        case '复核估价': this.currentMode = 'appraisal'; break
        case '结果终审': this.currentMode = 'final-review'; break
      }
    }
  }
}
</script>
<style lang="scss">
.appeal-container {
    .el-collapse-item__header {
        font-size: 16px;
        font-weight: bold;
    }
    .el-step {
      &:hover {
        .el-step__head .el-step__icon, .el-step__main {
          transition: transform 0.3s ease;
          transform: scale(1.1);
          transform-origin: left;
        }
      }
      .el-step__head .el-step__icon, .el-step__main {
        cursor: pointer;
        transition: transform 0.3s ease;
        transform-origin: left;
      }
    }
}
</style>
