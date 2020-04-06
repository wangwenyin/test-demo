<template>
  <div class="chart-container" @mouseover="showArrow=true" @mouseout="showArrow=false">
    <div style="position:absolute;top:30px;left:200px;">
      <span style="font-weight:bold">{{ caseData.prj_name }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>{{ caseData.startDate }} 至 {{ caseData.endDate }}</span>
    </div>
    <transition name="fade">
      <div v-if="showArrow" class="arrow">
        <svg-icon icon-class="case_arrow_left" class="arrow-left" @click.native="onArrowClick(0)"/>
        <svg-icon icon-class="case_arrow_right" class="arrow-right" @click.native="onArrowClick(1)"/>
      </div>
    </transition>
    <chart v-if="caseData" :case-list="list" :date-range="dateRange" height="100%" width="100%"/>
  </div>
</template>

<script>
import Chart from './components/mixChart'
import { parseTime } from '@/utils/index'
import { getCasesList } from '@/api/case'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
    return {
      caseData: null,
      list: [],
      dateRange: [],
      showArrow: false,
      listQuery: {
        limit: 5,
        page: 1
      }
    }
  },
  watch: {
    caseData: {
      handler(val) {
        this.getData()
      },
      deep: true
    }
  },
  created() {
    this.caseData = JSON.parse(localStorage.getItem('caseDataClause'))
    // 日期范围
    this.dateRange = [this.caseData.startDate, this.caseData.endDate]
  },
  methods: {
    getData() {
      const params = {
        prj_no: this.caseData.prj_no,
        usage: this.caseData.usage,
        price_type: this.caseData.priceType,
        case_type: '交易',
        start_date: this.caseData.startDate,
        end_date: this.caseData.endDate,
        ...this.listQuery
      }

      getCasesList(params).then(res => {
        this.list = res.data
      })
    },
    // 点击左右箭头触发caseData变化
    onArrowClick(flag) {
      let startDate = this.caseData.startDate
      let endDate = this.caseData.endDate
      const now = parseTime(new Date(), '{y}-{m}-{d}')
      if (flag) {
        if (endDate !== now) {
          startDate = this.changeMonth(startDate)
          endDate = this.changeMonth(endDate)
        } else {
          return
        }
      } else {
        startDate = this.changeMonth(startDate, -6)
        // slice(0, 7)只传整月份：防止散点横向溢出
        endDate = this.changeMonth(endDate, -6).slice(0, 7)
      }
      this.caseData.startDate = startDate
      this.caseData.endDate = endDate
      this.dateRange = [startDate, endDate]
    },
    // 默认跳转半年
    changeMonth(date, num = 6) {
      let temp = null
      if (typeof date === 'string') {
        temp = new Date(date)
      } else {
        temp = date
      }
      temp.setMonth(temp.getMonth() + num)
      return parseTime(temp, '{y}-{m}-{d}')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 94px);
  .arrow {
    .svg-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      cursor: pointer;
      z-index: 1;
    }
    .arrow-left {
      left: 10px;
    }
    .arrow-right {
      right: 10px;
    }
  }
}

// arrow过渡效果
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

